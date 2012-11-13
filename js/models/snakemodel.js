/**
 * Class SnakeModel
 */
var SnakeModel = (function(){
  return function(borderCoord){
    this.growSize = 0;
    this.initSize = 4;
    this.isDead = false;
    this.foodFound = false;
    BaseModel.call(this, borderCoord); //call parent constructor
  };
}());
if (typeof BaseModel === "function") { // ensure BaseModel has been loaded
  //extend SnakeModel with basemodel
  Utilities.classExtend(SnakeModel, BaseModel);
}
/**
 * Override existing methods and add additinal
 */
SnakeModel.prototype = {
  /**
   * Set initial coordinates. Assign with initSize random coordinates
   */
  born: function() {
    this.coords = []; //clear coordinates
    var coord0 = new Coord();
    while(true) {
      coord0.assignRandCoord(0, this.getBorder().x);
      if (coord0.x + this.initSize <= this.getBorder().x) {
        for(var i = 0; i < this.initSize; i++) {
          tmpCoord = new Coord(coord0.x + i, coord0.y);
          tmpCoord.setDirection(directions.LEFT);
          this.coords.push(tmpCoord);
        }
        break;
      } else if(coord0.y + this.initSize <= this.getBorder().y) {
        for(var i = 0; i < this.initSize; i++) {
          tmpCoord = new Coord(coord0.x, coord0.y + i);
          tmpCoord.setDirection(directions.UP);
          this.coords.push(tmpCoord);
        }
        break;
      }
    }
    this.isDead = false;
  },
  /**
   * check if snake found food
   */
  eat: function(food, direction) {
    var firstCoord = new Coord(this.coords[0].x, this.coords[0].y);
    firstCoord.move(direction);
    foodFound = firstCoord.eq(food.coords[0]);
    if (foodFound) {
      this.growSize += food.calories;
    }
    firstCoord = null;
    return foodFound;
  },
  /**
   * Move snake
   */
  move: function(direction) {
    var firstCoord = new Coord(this.coords[0].x, this.coords[0].y);
    var tmpCoords = []; //tmp array to store shifted coordinates
    if (! this.isCollission(direction)) { //check collision with board, itself etc
      firstCoord.move(direction);
      firstCoord.setDirection(direction); //set new direction
      tmpCoords[0] = firstCoord; //assign new head position
      if (this.growSize === 0) { //check if snake should grow
        //not growing. just shift all coordinates
        for(var i = 1; i < this.getLength(); i++) {
          tmpCoords[i] = this.coords[i - 1];
        }
      } else { //should grow
        //add new coordinates
        for(var i = 0; i < this.getLength(); i++) {
          tmpCoords[i + 1] = this.coords[i];
        }
        this.growSize -= 1;
      }
      //re-assign coordinates
      this.coords = tmpCoords;
      tmpCoords = null;
    } else { //collision found - kill snake
      this.isDead = true;
    }
    firstCoord = null;
  },
  /**
   * check if snake collids with smth (itself, board or etc)
   */
  isCollission: function(direction) {
    var firstCoord = new Coord(this.coords[0].x, this.coords[0].y);
    firstCoord.move(direction);
    //first check if snake head collids with board
    if (firstCoord.x == this.getBorder().x || firstCoord.y == this.getBorder().y ||
        firstCoord.x == -1 || firstCoord.y == -1) {
      console.log("Collision with wall:" + firstCoord.x + "," + firstCoord.y);
      firstCoord = null;
      return true;
    }
    //check if snake collids with itself
    for(var i = 1; i < this.getLength(); i++) {
      if (firstCoord.eq(this.coords[i])) {
        console.log("Collision with itself");
        firstCoord = null;
        return true;
      }
    }
    firstCoord = null;
    return false;
  },
  /**
   * Blink effect
   */
  blink: function(blinkSpeed, timeout, blinkViewAction, callbackAfterFn) {
    var rafBlink = null;
    var blinkStart = new Date().getTime();
    var tmpBlinkStart = new Date().getTime();
    var tmpStart = new Date().getTime();
    var blinkSnake = function() {
      rafBlink = requestAnimationFrame(blinkSnake);
      var now = new Date().getTime();
      var dt = tmpBlinkStart - now;

      if ((blinkStart - now) >= - timeout) {
        if (dt <= - blinkSpeed) {
          tmpBlinkStart = now;
          blinkViewAction();
        }
      } else {
        cancelAnimationFrame(rafBlink);
        callbackAfterFn();
      }
    };
    requestAnimationFrame(blinkSnake);
  }
};
