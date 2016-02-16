# Asset Pipeline - Imagemin

This is a wrapper for imagemin that will eventually become a plugin for a larger project to manage the whole build process.

It can be used however on it's own.  To install run:

```bash
npm install @djforth/ap_imagemin
```


Now add the configuration details to your package.json like so:

```json
"assets": {
    "images": {
      "input": "app/assets_uncompiled/images",
      "output": "app/assets/images",
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