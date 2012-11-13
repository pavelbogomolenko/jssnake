/**
 * Module that provides a lot of helper functions
 */
var Utilities =  {
  /**
   * simplifies class prototyping
   */
  classExtend: function(cls, superCls) {
    var F = function() {};
    F.prototype = superCls.prototype;
    cls.prototype = new F();
    cls.prototype.constructor = cls;
    cls.superclass = cls.prototype;
  },
  /**
   * Merge 2 objects
   */
  objectMerge: function(first, second){
    var result = {};
    for (k in first) {
      if (typeof second[k] === "undefined") {
        result[k] = first[k];
      } else {
        result[k] = second[k];
      }
    }
    return result;
  },
  /**
   * Preload images
   */
  preloadImages: function(imgList, callbackFn) {
    var th = this;
    var images = {};
    var loadedCounter = 0;
    var loadImg = function(imgSrc) {
      images[imgSrc] = new Image();
      images[imgSrc].src = imgSrc;
      images[imgSrc].onload = function() {
        loadedCounter++;
        if(loadedCounter == th.objectSize(imgList)) {
          callbackFn();
        }
      };
    };
    for(img in imgList) {
      loadImg(imgList[img]);
    }
    return images;
  },
  /**
   * Dynamically load JS files
   */
  preloadJsFiles: function(jsfiles, callbackFn){
    var fileObj = [];
    var i = 0;
    for(jsfile in jsfiles) {
      fileObj[i] = document.createElement('script');
      fileObj[i].setAttribute('type', 'text/javascript');
      fileObj[i].setAttribute('src', jsfiles[jsfile]);
      document.getElementsByTagName('head')[0].appendChild(fileObj[i]); //append file to head
    }
    var th = this;
    var loaded = {};
    var loadedCounter = 0;
    var waitJsIsloaded = function() {
      for(jsfile in jsfiles) {
        try {
          f = eval(jsfile);
          if (loaded[jsfile] !== undefined) {
            clearTimeout(loaded[jsfile]);
          }
          loadedCounter++;
          if (loadedCounter == th.objectSize(jsfiles)) {
            callbackFn();
            return true;
          } else if (loadedCounter > th.objectSize(jsfiles)) {
            return false;
          }
        } catch(err) {
          if (loaded.jsfile === undefined) {
            t = setTimeout(waitJsIsloaded, 100);
            loaded[jsfile] = t;
          }
        }
      }
    };
    waitJsIsloaded();
  },
  hasValue: function(value, obj) {
    for (o in obj) {
      if (obj[o] === value) {
        return true;
      }
    }
    return false;
  },
  objectSize: function(obj) {
    var size = 0;
    var key;
    for (key in obj) {
      if (obj.hasOwnProperty(key)) size++;
    }
    return size;
  }
};
