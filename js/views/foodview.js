var FoodView = (function(){
  return function(newCanvas, newVars) {
    //call parent constructor
    BaseView.call(this, newCanvas, newVars);
  };
}());
if (typeof BaseView === "function") { // ensure BaseModel has been loaded
  //extend BaseView
  Utilities.classExtend(FoodView, BaseView);
}
FoodView.prototype = {
  render: function() {
    this.canvas.context.drawImage(
        this.vars.image,
        this.vars.coords[0].x * this.vars.pointSize,
        this.vars.coords[0].y * this.vars.pointSize
    );
  }
};
