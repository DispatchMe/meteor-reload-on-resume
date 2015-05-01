// Hook into the hot-reload to
// 1) wait until the application has resumed to reload the app
// 2) show the splashscreen while the app is reloading

var hasResumed = false;
var retryReloadFunc = null;

var retryReloadOnResume = function () {
  // Set resumed to true so _onMigrate performs the reload
  hasResumed = true;

  // Show the splashscreen during the reload
  // it will be hidden when the app starts
  navigator.splashscreen.show();

  // Re-run the onMigrate hooks
  retryReloadFunc();
};

Reload._onMigrate(function (retryReload) {
  retryReloadFunc = retryReload;

  // Prevent duplicate listeners in case _onMigrate is called multiple times
  document.removeEventListener("resume", retryReloadOnResume, false);

  if (!hasResumed) {
    document.addEventListener("resume", retryReloadOnResume, false);
  }

  // Reload the app if we have resumed
  return [hasResumed];
});
