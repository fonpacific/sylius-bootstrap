## 1. Creating a new theme based on BootstrapTheme

### Add wip repository

In ``composer.json`` add:

``` yaml
    "repositories": [
        // ...
        {
            "type": "vcs",
            "url": "https://github.com/fonpacific/sylius-bootstrap.git"
        },
        {
            "type": "vcs",
            "url": "https://github.com/fonpacific/BootstrapTheme.git"
        }
        // ...
    ]
```

then issue

``` bash
    composer require sylius/bootstrap-theme:dev-wip
    composer require unite/sylius-bootstrap-bundle:dev-wip
```
In the ``config/packages/_sylius.yaml`` file, add the path to the installed package

``` yaml
sylius_theme:
    sources:
        filesystem:
            directories:
                // ...
                - "%kernel.project_dir%/vendor/sylius/bootstrap-theme"
                // ...

```
Create your custom theme based on BootstrapTheme. In the ``themes`` directory, create a new folder - name it as you like, e.g. ``BootstrapChildTheme`` and create ``composer.json`` with basic information

``` yaml
{
    "name": "fonpacific/bootstrap-child-theme",
    "description": "Bootstrap child theme",
    "license": "MIT",
    "authors": [
        {
            "name": "Gabriele Fontana",
            "email": "gabriele.f2@gmail.com"
        }
    ],
    "extra": {
        "sylius-theme": {
            "title": "Bootstrap child theme",
            "parents": [ "sylius/bootstrap-theme" ]
        }
    }
}
```

Now you can go to the channel settings in the admin panel and select the created theme as default.

## 2. Webpack Encore configuration
You need to prepare a new theme for working with webpack and include it in the build process.

Install missing BootstrapTheme dependencies

``` bash
yarn add sass-loader@^13.0.0 node-sass lodash.throttle -D
yarn add bootstrap bootstrap.native glightbox axios form-serialize @fortawesome/fontawesome-svg-core @fortawesome/free-brands-svg-icons @fortawesome/free-regular-svg-icons @fortawesome/free-solid-svg-icons
```

in ``theme/BootstrapChildTheme/assets`` create 2 files: ``entry.js`` and ``scss/index.scss``
``entry.js`` is the main file for your theme. All files used in the theme will be imported here. First, add the files used in the BootstrapTheme and your newly created scss file

```js
import '../../../vendor/sylius/bootstrap-theme/assets/js/index';
import './scss/index.scss';
import '../../../vendor/sylius/bootstrap-theme/assets/media/sylius-logo.png';
import '../../../vendor/sylius/bootstrap-theme/assets/js/fontawesome';
```

``index.scss`` is the main file for styles, import styles used in the BootstrapTheme


```scss
@import '../../../../vendor/sylius/bootstrap-theme/assets/scss/index';
```

In the ``webpack.config.js`` file, add configurations for the new theme
```js
Encore.reset();
Encore
  .setOutputPath('public/bootstrap-theme')
  .setPublicPath('/bootstrap-theme')
  .addEntry('app', './themes/BootstrapChildTheme/assets/entry.js')
  .disableSingleRuntimeChunk()
  .cleanupOutputBeforeBuild()
  .enableSassLoader()
  .enableSourceMaps(!Encore.isProduction())
  .enableVersioning(Encore.isProduction());

const bootstrapThemeConfig = Encore.getWebpackConfig();
bootstrapThemeConfig.name = 'bootstrapTheme';
```

Also add ``bootstrapThemeConfig`` to export at the end of the file.

```js
module.exports = [/* ... */, bootstrapThemeConfig];
```
In the app config, add paths where the compiled files will be located:

In the ``config/packages/assets.yaml`` add:
```yaml
framework:
    assets:
        packages:
            bootstrapTheme:
                json_manifest_path: '%kernel.project_dir%/public/bootstrap-theme/manifest.json'
```
and in the ```config/packages/webpack_encore.yaml``` add:
```yaml
webpack_encore:
    output_path: '%kernel.project_dir%/public/build/default'
    builds:
        bootstrapTheme: '%kernel.project_dir%/public/bootstrap-theme'
```

Now you can use one of the commands ``yarn encore dev``, ``yarn encore production`` or ``yarn encore dev-server`` to compile all assets.

## 3. Customization
<!-- Copy the folder ``vendor/unite/sylius-bootstrap-bundle/Resources/views/bundles/SyliusShopBundle`` inside ``templates/bundles/SyliusShopBundle``

Search and replace  -->