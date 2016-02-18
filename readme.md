# Asset Pipeline - Imagemin

This is a wrapper for imagemin that will eventually become a plugin for a larger project to manage the whole build process.

It can be used however on it's own.  To install run:

```bash
npm install @djforth/ap_imagemin -g
```


Now add the configuration details to your package.json like so (N.B. These are the defaults):

```json
"assets": {
    "images": {
      "input": "app/assets_uncompiled/images",
      "output": "public/assets",
      "ext": [
        "*.png",
        "*.gif",
        "*.jpg",
        "*.jpeg",
        "*.svg"
      ],
      "plugins": [
        [
          "imagemin-gifsicle",
          {
            "interlaced": true
          }
        ],
        [
          "imagemin-jpegtran",
          {
            "progressive": true
          }
        ],
        [
          "imagemin-optipng",
          {
            "optimizationLevel": 3
          }
        ],
        "imagemin-svgo"
      ]
    }
  }

```

These options are:

* input - where it will look for your images
* output - where it will place your compressed images (should not be the same as input)
* extensions - What file extensions you wish to process
* plugins and optimisation options see https://www.npmjs.com/browse/keyword/imageminplugin for all available plugins

## CLI

To run with defaults or config:

```bash
asset-pipeline-imagemin
```

Options are:

```bash
asset-pipeline-imagemin -h

  Usage: asset-pipeline-imagemin [options]

  Options:

    -h, --help             output usage information
    -V, --version          output the version number
    -e, --ext <list>       exts to process
    -i, --input <folder>   input folder
    -o, --output <folder>  output folder
    -w, --watch            Watch scripts
```