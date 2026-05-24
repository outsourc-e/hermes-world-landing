import {
  supabase,
  getCurrentProfile,
  getDestination,
  signOut,
} from '/assets/hermesworld/auth/supabase-client.js?v=20260524b';

const SIGNIN_URL = '/signin/';
const ACCOUNT_URL = '/account';
const RESERVE_URL = '/auth/callback/';

const feedback = document.querySelector('[data-auth-feedback]');

function setFeedback(message, tone = 'muted') {
  if (!feedback) return;
  feedback.textContent = message;
  feedback.dataset.tone = tone;
}

// ─── Account menu (rendered into every [data-google-signin] anchor) ─────────
// The same anchor used to be the "Sign in / Sign up" CTA. When signed in, we
// turn it into a small avatar/initial button that opens a popover with
// "Account" + "Sign out". When signed out, it stays a plain CTA.

const STYLE_ID = 'hw-account-menu-style';
function ensureStyles() {
  if (document.getElementById(STYLE_ID)) return;
  const style = document.createElement('style');
  style.id = STYLE_ID;
  style.textContent = `
    .hw-account {
      position: relative;
      display: inline-flex;
      align-items: center;
      gap: 10px;
      padding: 6px 10px 6px 6px !important;
      border-radius: 999px !important;
      background: rgba(244, 198, 109, 0.12) !important;
      border: 1px solid rgba(244, 198, 109, 0.45) !important;
      color: var(--gold, #f4c66d) !important;
      text-decoration: none !important;
      font-size: 13px !important;
      font-weight: 700 !important;
      letter-spacing: .02em !important;
      cursor: pointer;
      min-height: 36px;
    }
    .hw-account:hover { background: rgba(244, 198, 109, 0.18) !important; }
    .hw-account-avatar {
      width: 26px; height: 26px; border-radius: 50%;
      background: linear-gradient(135deg,#ffe6a4,#a95d18);
      color:#160f07; font-weight:900; font-size:12px;
      display:inline-flex; align-items:center; justify-content:center;
      overflow: hidden;
    }
    .hw-account-avatar img { width:100%; height:100%; object-fit:cover; display:block; }
    .hw-account-label { max-width:140px; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; }
    .hw-account-caret { opacity:.7; font-size:10px; margin-left:2px; }
    .hw-account-menu {
      position: absolute; top: calc(100% + 6px); right: 0; z-index: 9999;
      min-width: 220px;
      background: #0a1620;
      color: #fff4dc;
      border: 1px solid rgba(244,198,109,.35);
      border-radius: 14px;
      padding: 8px;
      box-shadow: 0 22px 60px rgba(0,0,0,.55);
      display: none;
      font-family: Inter, ui-sans-serif, system-ui, sans-serif;
    }
    .hw-account-menu[data-open="1"] { display: block; }
    .hw-account-menu .hw-menu-item {
      display: flex; align-items: center; gap: 10px;
      width: 100%; box-sizing: border-box;
      padding: 10px 12px;
      border-radius: 10px;
      background: transparent;
      border: 0; cursor: pointer;
      color: #fff4dc;
      text-decoration: none;
      font-size: 13px; font-weight: 600;
      text-align: left;
    }
    .hw-account-menu .hw-menu-item:hover { background: rgba(244,198,109,.10); color: var(--gold,#f4c66d); }
    .hw-account-menu .hw-menu-item.danger:hover { background: rgba(255,141,115,.12); color: #ff8d73; }
    .hw-account-menu .hw-menu-sub {
      padding: 6px 12px 10px;
      font-size: 11px;
      color: #9bb0a9;
      border-bottom: 1px solid rgba(255,255,255,.06);
      margin-bottom: 6px;
      word-break: break-all;
    }
  `;
  document.head.appendChild(style);
}

function initialFor(text) {
  if (!text) return '?';
  const trimmed = String(text).trim();
  if (!trimmed) return '?';
  return trimmed[0].toUpperCase();
}

// Track which anchors we've converted into account menus so we can revert them
// to plain CTAs on sign-out without losing their original layout.
const anchorState = new WeakMap();

function captureAnchorState(anchor) {
  if (anchorState.has(anchor)) return anchorState.get(anchor);
  const state = {
    originalHTML: anchor.innerHTML,
    originalHref: anchor.getAttribute('href') || SIGNIN_URL,
    originalClasses: anchor.className,
  };
  anchorState.set(anchor, state);
  return state;
}

function restoreAnchorToCta(anchor) {
  const state = anchorState.get(anchor);
  if (!state) return;
  anchor.className = state.originalClasses;
  anchor.innerHTML = state.originalHTML;
  anchor.removeAttribute('aria-haspopup');
  anchor.removeAttribute('aria-expanded');
  anchor.onclick = null;
  // Remove any account-menu siblings we appended
  const sibling = anchor.parentElement?.querySelector(`[data-hw-account-menu-for="${anchor.dataset.hwAccountId || ''}"]`);
  if (sibling) sibling.remove();
}

function renderAccountAnchor(anchor, { displayName, avatarUrl, email, profileUsername }) {
  captureAnchorState(anchor);
  const id = anchor.dataset.hwAccountId || `hw-acc-${Math.random().toString(36).slice(2, 8)}`;
  anchor.dataset.hwAccountId = id;
  anchor.className = 'hw-account';
  anchor.setAttribute('href', '#');
  anchor.setAttribute('aria-haspopup', 'menu');
  anchor.setAttribute('aria-expanded', 'false');

  const label = profileUsername || displayName || email || 'Account';
  const initials = initialFor(profileUsername || displayName || email);

  anchor.innerHTML = `
    <span class="hw-account-avatar">${
      avatarUrl
        ? `<img src="${avatarUrl}" alt="" referrerpolicy="no-referrer">`
        : initials
    }</span>
    <span class="hw-account-label">${escapeHtml(label)}</span>
    <span class="hw-account-caret">▼</span>
  `;

  // Build or refresh the dropdown menu placed next to the anchor.
  let menu = anchor.parentElement?.querySelector(`[data-hw-account-menu-for="${id}"]`);
  if (!menu) {
    menu = document.createElement('div');
    menu.className = 'hw-account-menu';
    menu.setAttribute('role', 'menu');
    menu.setAttribute('data-hw-account-menu-for', id);
    // Make sure parent can position absolutely
    if (anchor.parentElement && getComputedStyle(anchor.parentElement).position === 'static') {
      anchor.parentElement.style.position = 'relative';
    }
    anchor.parentElement?.appendChild(menu);
  }

  menu.innerHTML = `
    <div class="hw-menu-sub">${escapeHtml(email || displayName || 'Signed in')}</div>
    <a class="hw-menu-item" href="${ACCOUNT_URL}">Account</a>
    ${
      profileUsername
        ? ''
        : `<a class="hw-menu-item" href="${RESERVE_URL}">Reserve your name</a>`
    }
    <button class="hw-menu-item danger" type="button" data-hw-signout>Sign out</button>
  `;

  const close = () => {
    menu.removeAttribute('data-open');
    anchor.setAttribute('aria-expanded', 'false');
  };
  const open = () => {
    menu.setAttribute('data-open', '1');
    anchor.setAttribute('aria-expanded', 'true');
  };

  anchor.onclick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (menu.getAttribute('data-open') === '1') close(); else open();
  };

  // Close on outside click / Escape — installed once per page.
  if (!window.__hwAccountMenuClickInstalled) {
    window.__hwAccountMenuClickInstalled = true;
    document.addEventListener('click', (e) => {
      document.querySelectorAll('.hw-account-menu[data-open="1"]').forEach((m) => {
        if (!m.contains(e.target)) m.removeAttribute('data-open');
      });
      document.querySelectorAll('.hw-account[aria-expanded="true"]').forEach((a) => {
        a.setAttribute('aria-expanded', 'false');
      });
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        document.querySelectorAll('.hw-account-menu[data-open="1"]').forEach((m) =>
          m.removeAttribute('data-open'),
        );
        document.querySelectorAll('.hw-account[aria-expanded="true"]').forEach((a) =>
          a.setAttribute('aria-expanded', 'false'),
        );
      }
    });
  }

  menu.querySelector('[data-hw-signout]')?.addEventListener('click', async (e) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      await signOut();
    } catch (err) {
      console.warn('hw-account: signOut failed, clearing local session manually', err);
    }
    // Belt-and-suspenders: also nuke any lingering Supabase session keys.
    try {
      Object.keys(localStorage)
        .filter((k) => k.startsWith('sb-'))
        .forEach((k) => localStorage.removeItem(k));
    } catch (_) {}
    // Reload to landing so every consumer re-evaluates auth state.
    window.location.replace('/');
  });
}

function escapeHtml(input) {
  return String(input ?? '').replace(/[&<>"']/g, (c) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  }[c]));
}

function setCtaButtons(label, href) {
  document.querySelectorAll('[data-google-signin]').forEach((anchor) => {
    // Anchor might still be in account-menu mode from a prior render — restore.
    restoreAnchorToCta(anchor);
    anchor.querySelector('[data-google-label]')?.replaceChildren(document.createTextNode(label));
    if (href) anchor.setAttribute('href', href);
  });
}

function applyAccountState({ user, profile }) {
  ensureStyles();
  const meta = user.user_metadata || {};
  const params = {
    displayName: meta.full_name || meta.name || user.email || 'Account',
    avatarUrl: meta.avatar_url || null,
    email: user.email,
    profileUsername: profile?.username || null,
  };
  document.querySelectorAll('[data-google-signin]').forEach((anchor) => {
    renderAccountAnchor(anchor, params);
  });
}

async function routeSignedInUser() {
  try {
    const { user, profile } = await getCurrentProfile();
    if (!user) {
      setCtaButtons('Sign in / Sign up', SIGNIN_URL);
      setFeedback('');
      return false;
    }

    applyAccountState({ user, profile });

    if (profile?.username) {
      setFeedback(`Signed in as ${profile.username}.`, 'success');
    } else {
      setFeedback('Signed in. One more step: reserve your HermesWorld name.', 'success');
    }
    return true;
  } catch (error) {
    console.warn('landing-auth: routeSignedInUser fell back to logged-out', error);
    setCtaButtons('Sign in / Sign up', SIGNIN_URL);
    setFeedback('');
    return false;
  }
}

// Initial render.
setCtaButtons('Sign in / Sign up', SIGNIN_URL);
routeSignedInUser();

// React to cross-tab sign-in / sign-out / token refresh.
supabase.auth.onAuthStateChange(() => {
  routeSignedInUser();
});
