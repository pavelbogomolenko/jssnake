/**
 * base object for all game primitives
 */
var BaseModel = (function(){
  return function(borderCoord) {
    this.coords = [];
    var border = null;
    /**
     * BaseModel initialization
     */
    this.init = function(borderCoord){
      if (borderCoord instanceof Coord) {
        border = borderCoord;
      } else {
        throw new Error("borderCoord should be an instance of Coord");
      }
    };
    /**
     * Get border
     */
    this.getBorder = function() {
      return border;
    };
    /**
     * Get length of object (this.coords.length)
     */
    this.getLength = function() {
      return this.coords.length;
    };
    this.init(borderCoord); //call init upon object creation
  };
}());
BaseModel.prototype = {
 /**
  * Move object
  */
  move: function() {
    throw new Error("move method should be implemented in descendant");
  }
};
