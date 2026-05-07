import { getCurrentProfile, getDestination, signInWithGoogle } from '/assets/hermesworld/auth/supabase-client.js';

const buttons = Array.from(document.querySelectorAll('[data-google-signin]'));
const feedback = document.querySelector('[data-auth-feedback]');

function setFeedback(message, tone = 'muted') {
  if (!feedback) return;
  feedback.textContent = message;
  feedback.dataset.tone = tone;
}

function setButtons(label, mode = 'signin') {
  buttons.forEach((button) => {
    button.dataset.mode = mode;
    button.querySelector('[data-google-label]')?.replaceChildren(document.createTextNode(label));
  });
}

async function routeSignedInUser() {
  const { user, profile } = await getCurrentProfile();
  if (!user) return false;

  if (profile?.username) {
    const destination = await getDestination();
    setButtons('Continue to portal →', 'continue');
    setFeedback(`Signed in as ${profile.username}. Continue to portal.`, 'success');
    buttons.forEach((button) => {
      button.setAttribute('href', destination);
    });
    return true;
  }

  setButtons('Finish reserving your name →', 'reserve');
  setFeedback('Signed in. One more step: reserve your HermesWorld name.', 'success');
  buttons.forEach((button) => {
    button.setAttribute('href', '/auth/callback');
  });
  return true;
}

async function handleButtonClick(event) {
  const button = event.currentTarget;
  const mode = button.dataset.mode || 'signin';
  if (mode === 'continue' || mode === 'reserve') return;

  event.preventDefault();
  setButtons('Redirecting to Google…', 'loading');
  setFeedback('Opening Google sign-in…', 'muted');

  const { error } = await signInWithGoogle();
  if (error) {
    console.error(error);
    setButtons('Sign in with Google', 'signin');
    setFeedback(error.message || 'Could not start Google sign-in.', 'error');
  }
}

buttons.forEach((button) => button.addEventListener('click', handleButtonClick));
routeSignedInUser().catch((error) => {
  console.error(error);
  setFeedback('Google sign-in is live, but we could not verify your current session.', 'error');
});
