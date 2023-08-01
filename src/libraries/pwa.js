function showInstallPromotion() {
  console.log('SHOW BUTTON FOR INSTALL');
}

function hideInstallPromotion() {
  console.log('HIDE BUTTON FOR INSTALL');
}

function getPWADisplayMode() {
  const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
  if (document.referrer.startsWith('android-app://')) {
    return 'twa';
  } else if (navigator.standalone || isStandalone) {
    return 'standalone';
  }
  return 'browser';
}

window.matchMedia('(display-mode: standalone)').addEventListener((evt) => {
  let displayMode = 'browser';
  if (evt.matches) {
    displayMode = 'standalone';
  }
  // Log display mode change to analytics
  console.log('DISPLAY_MODE_CHANGED', displayMode);
});

window.addEventListener('beforeinstallprompt', (event) => {
  console.log('👍', 'beforeinstallprompt', event);
  // Stash the event so it can be triggered later.
  window.deferredPrompt = event;
  // Remove the 'hidden' class from the install button container
  // divInstall.classList.toggle('hidden', false);
  showInstallPromotion();
});


window.addEventListener('appinstalled', (event) => {
  console.log('👍', 'appinstalled', event);
  hideInstallPromotion();
  // Clear the deferredPrompt so it can be garbage collected
  window.deferredPrompt = null;
});


// buttonInstall.addEventListener('click', async () => {
//   // Hide the app provided install promotion
//   // Show the install prompt
//   const promptEvent = window.deferredPrompt;
//   if (!promptEvent) {
//     // The deferred prompt isn't available.
//     return;
//   }
//   hideInstallPromotion();
//   // Show the install prompt.
//   promptEvent.prompt();
//   // Wait for the user to respond to the prompt
//   const { outcome } = await promptEvent.userChoice;
//   // Optionally, send analytics event with outcome of user choice
//   console.log(`User response to the install prompt: ${outcome}`);
//   // We've used the prompt, and can't use it again, throw it away
//   window.deferredPrompt = null;
// });

