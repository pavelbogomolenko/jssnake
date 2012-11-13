var SnakeView = (function(){
  return function(newCanvas, newVars) {
    this.isBlink = false;
    //call parent constructor
    BaseView.call(this, newCanvas, newVars);
  };
}());
if (typeof BaseView === "function") { // ensure BaseModel has been loaded
  //extend BaseView
  Utilities.classExtend(SnakeView, BaseView);
}
SnakeView.prototype = {
  render: function() {
    var img;
    for (var i = 0; i < this.vars.coords.length; i++) {
      if (i === 0) {//head
        switch (this.vars.coords[i].getDirection()) {
          case directions.LEFT:
            img = this.vars.snake_head_left;
            break;
          case directions.DOWN:
            img = this.vars.snake_head_down;
            break;
          case directions.UP:
            img = this.vars.snake_head_up;
            break;
          case directions.RIGHT:
            img = this.vars.snake_head_right;
        }
      } else if (i == this.vars.coords.length - 1) { //tail
        switch (this.vars.coords[i].getDirection()) {
          case directions.LEFT:
            img = this.vars.snake_tail_left;
            break;
          case directions.DOWN:
            img = this.vars.snake_tail_down;
            break;
          case directions.UP:
            img = this.vars.snake_tail_up;
            break;
          case directions.RIGHT:
            img = this.vars.snake_tail_right;
        }
      } else { //body
         switch (this.vars.coords[i].getDirection()) {
          case directions.LEFT:
            img = this.vars.snake_body_left;
            break;
          case directions.DOWN:
            img = this.vars.snake_body_down;
            break;
          case directions.UP:
            img = this.vars.snake_body_up;
            break;
          case directions.RIGHT:
            img = this.vars.snake_body_right;
        }
      }
      this.canvas.context.drawImage(
        img,
        this.vars.coords[i].x * this.vars.pointSize,
        this.vars.coords[i].y * this.vars.pointSize
      );
    }
  },
  /**
   * Blinking effect
   */
  blink: function() {
    if (! this.isBlink) {
      this.isBlink = true;
      this.canvas.context.fillStyle = 'white';
      for (var i = 0; i < this.vars.coords.length; i++) {
        this.canvas.context.fillRect(
          this.vars.coords[i].x * this.vars.pointSize,
          this.vars.coords[i].y * this.vars.pointSize,
          this.vars.pointSize + this.vars.deflection * 2, //taking on account padding size
          this.vars.pointSize + this.vars.deflection * 2 //taking on account padding size
        );
      }
    } else {
      this.isBlink = false;
      this.render();
    }
  }
};
