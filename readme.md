# Foundation for Apps Template

[![devDependency Status](https://david-dm.org/zurb/foundation-apps-template/dev-status.svg)](https://david-dm.org/zurb/foundation-apps-template#info=devDependencies)


## Requirements

You'll need the following software installed to get started.

  - [Node.js](http://nodejs.org): Use the installer for your OS.
  - [Git](http://git-scm.com/downloads): Use the installer for your OS.
    - Windows users can also try [Git for Windows](http://git-for-windows.github.io/).
  - [Gulp](http://gulpjs.com/) and [Bower](http://bower.io): Run `npm install -g gulp bower`
    - Depending on how Node is configured on your machine, you may need to run `sudo npm install -g gulp bower` instead, if you get an error with the first command.
  - [Karma](https://www.npmjs.com/package/karma) and [PhantomsJS](https://www.npmjs.com/package/phantomjs): Run `npm install karma-cli phantomjs`

## Get Started


```bash
git clone https://github.com/he4amm/task200.git
```

Change into the directory.

```bash
cd task200
```

Install the dependencies. If you're running Mac OS or Linux, you may need to run `sudo npm install` instead, depending on how your machine is configured.

```bash
npm install
bower install
```

While you're working on your project, run:

```bash
npm start
```


To run unit tests for the app, run:

```bash
karma start karma.conf.js
```

# Directory Structure

```
├──  bower_components/ (Third-Party libs)
├──  build/ (After build location)
│
├──  client/
│   ├──  assets/
│   │   ├──  images/  --images folder
│   │   │
│   │   ├──  js/  --app js files
│   │   │   ├──  controllers/ 
│   │   │   │   ├──  about.controller.js 
│   │   │   │   ├──  home.controller.js 
│   │   │   │   ├──  main.controller.js 
│   │   │   │   ├──  userInfo.controller.js 
│   │   │   │   └──  users.controller.js 
│   │   │   ├──  services/ 
│   │   │   │   ├──  GitHub.factory.js 
│   │   │   │   └──  Page.factory.js 
│   │   │   │
│   │   │   ├──  app.js
│   │   │   ├──  config.js
│   │   │   └──  run.js
│   │   │
│   │   └──  scss/
│   │       ├──  _settings.scss
│   │       └──  app.scss
|   |   
│   ├──  templates/
│   │   ├──  about.html
│   │   ├──  home.html
│   │   ├──  userInfo.html
│   │   └──  users.html
│   │
│   └──  index.html
│
├──  nodes_modules/ (Node.js Modules)
│
├──  test/ (Node.js Modules)
│
├──  .bowerrc (Bower.js config /* Automatic generated, don't edit */)
├──  .editorconfig (Text-Editors config)
├──  .gitignore (Git Ignore file)
├──  bower.json (Bower.js Packages  /* Automatic generated, don't edit */)
├──  gulpfile.js (Gulp.js config /* Automatic generated, don't edit */)
├──  karma.conf.js (Karma-units config)
└──  package.json (Node.js Packages /* Automatic generated, don't edit */)
```
