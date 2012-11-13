/**
 * Canvas class for 2D context
 */
var Canvas = (function() {
  return function(parentElm, w, h, newColor, newId, newDeflection) {
    /**
     * private vars
     */
    var placeholderElm = parentElm || null;
    var width = w || 0;
    var height = h || 0;
    var color = newColor || 'white';
    var id = newId || "canvas";
    var deflection = newDeflection || 0;
    /**
     * Public vars
     *
     * canvas context object
     */
    this.context = null;
    /**
     * init canvas
     */
    this.init = function() {
      var obj = document.createElement("canvas");

      obj.setAttribute("id", id);
      obj.setAttribute("width", width);
      obj.setAttribute("height", height);
      placeholderElm.appendChild(obj); //add canvas to placeholderElm
      this.context = obj.getContext("2d"); // get canvas context
    };
    /**
     * Clear canvas
     */
    this.clear = function() {
      this.context.fillStyle = color;
      this.context.fillRect(
        0,
        0,
        width + deflection,
        height + deflection
      );
    };
    this.init();
  };
}());
