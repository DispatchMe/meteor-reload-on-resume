Package.describe({
  name: 'dispatch:reload-on-resume',
  summary: 'Reload after the cordova app is resumed and show a splashscreen during the reload.',
  version: '0.0.2',
  git: 'https://github.com/DispatchMe/meteor-reload-on-resume.git'
});

Package.on_use(function (api) {
  api.versionsFrom('1.0');

  api.use(['reactive-var', 'reload'], 'web');
  api.imply('reload', 'web');

  api.add_files('reload_on_resume.js', 'web.cordova');
});
