/**
 * base view class
 */
var BaseView = (function(){
  return function(newCanvas, newVars) {
    this.canvas = newCanvas || null;
    this.vars = newVars || {};
    /**
     * Set view var
     */
    this.setVar = function(key, value) {
      this.vars[key] = value;
    };
  };
}());
BaseView.prototype = {
  /**
   * Main render method
   */
  render: function() {
    throw new Error("Render should be implemented");
  },
  /**
   * Clear view related objects
   */
  clear: function() {
    throw new Error("clear should be implemented");
  }
};
