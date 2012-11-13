/**
 * Class FoodModel
 */
var FoodModel = (function(){
  return function(borderCoord) {
    this.calories = 1;
    BaseModel.call(this, borderCoord); //call parent constructor
  };
}());
if (typeof BaseModel === "function") { // ensure BaseModel has been loaded
  //extend basemodel
  Utilities.classExtend(FoodModel, BaseModel);
}
FoodModel.prototype = {
  produce: function(excludeCoords) {
    this.coords[0] = new Coord();
    var notValid;
    do {
      notValid = false;
      this.coords[0].assignRandCoord(0, this.getBorder().x); //make sure coor will be in border area
      for(var i = 0; i < excludeCoords.length; i++) { //make sure rand coord will not collid with engaged coords
        if (this.coords[0].x == excludeCoords[i].x && this.coords[0].y == excludeCoords[i].y) {
        //if (this.coords[0].eq(excludeCoords[i])) {
          notValid = true;
        }
      }
    } while (notValid);
  }
};
