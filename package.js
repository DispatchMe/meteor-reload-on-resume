Package.describe({
  name: "dispatch:reload-on-resume",
  summary: "Wait until a cordova application is resumed before hot-reloading. Show the splashscreen during the reload.",
  version: "0.0.1-wip",
  git: "https://github.com/DispatchMe/meteor-reload-on-resume.git"
});

Package.on_use(function (api) {
  api.versionsFrom("1.0");
  api.use(['reload'], 'web');
  api.imply(['reload'], 'web');

  api.add_files("reload_on_resume.js", 'web.cordova');
});
