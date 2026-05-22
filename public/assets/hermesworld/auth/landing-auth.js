import { supabase, getCurrentProfile, getDestination } from '/assets/hermesworld/auth/supabase-client.js';

const buttons = Array.from(document.querySelectorAll('[data-google-signin]'));
const feedback = document.querySelector('[data-auth-feedback]');

const SIGNIN_URL = '/signin/';

function setFeedback(message, tone = 'muted') {
  if (!feedback) return;
  feedback.textContent = message;
  feedback.dataset.tone = tone;
}

function setButtons(label, href) {
  buttons.forEach((button) => {
    button.querySelector('[data-google-label]')?.replaceChildren(document.createTextNode(label));
    if (href) button.setAttribute('href', href);
  });
}

// Default state: send everyone to /signin/ where they pick email or Google.
setButtons('Sign in / Sign up', SIGNIN_URL);

async function routeSignedInUser() {
  try {
    const { user, profile } = await getCurrentProfile();
    if (!user) {
      setButtons('Sign in / Sign up', SIGNIN_URL);
      return false;
    }

    if (profile?.username) {
      const destination = await getDestination();
      setButtons('Continue to portal →', destination);
      setFeedback(`Signed in as ${profile.username}. Continue to portal.`, 'success');
      return true;
    }

    setButtons('Finish reserving your name →', '/auth/callback/');
    setFeedback('Signed in. One more step: reserve your HermesWorld name.', 'success');
    return true;
  } catch (error) {
    // Silently degrade to logged-out state; do not throw on the landing page.
    console.warn('landing-auth: routeSignedInUser fell back to logged-out', error);
    setButtons('Sign in / Sign up', SIGNIN_URL);
    return false;
  }
}

// Initial paint.
routeSignedInUser();

// Re-render whenever auth state flips (sign-in in another tab, token refresh, signout, etc.)
supabase.auth.onAuthStateChange((_event, _session) => {
  routeSignedInUser();
});

