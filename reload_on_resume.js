// Hook into the hot-reload to
// 1) wait until the application has resumed to reload the app
// 2) show the splashscreen while the app is reloading

var newVersionAvailable = new ReactiveVar(false);

var hasResumed = false;
var retryReloadFunc = null;

var retryReloadOnResume = function () {
  // Set hasResumed to true so _onMigrate performs the reload
  hasResumed = true;

  // Show the splashscreen during the reload
  // it will hide when the app starts
  if (navigator.splashscreen) {
    navigator.splashscreen.show();
  }

  // Re-run the onMigrate hooks
  retryReloadFunc();
};

Reload._onMigrate(function (retry) {
  newVersionAvailable.set(true);

  retryReloadFunc = retry;

  // Prevent duplicate listeners in case _onMigrate is called multiple times
  document.removeEventListener('resume', retryReloadOnResume, false);

  if (!hasResumed) {
    document.addEventListener('resume', retryReloadOnResume, false);
  }

  // Reload the app if we resumed
  return [hasResumed];
});

/**
 * @summary Reactive function that returns true when there is a new version of
 * the app downloaded, can be used to prompt the user to close and reopen the
 * app to get the new version.
 */
Reload.isWaitingForResume = function () {
  return newVersionAvailable.get();
};
