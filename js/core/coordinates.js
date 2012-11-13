/**
 *  Basic 2D coordinate class
 */
var Coord = (function(){
  return function(x, y) {
    this.x = x;
    this.y = y;
    var direction = null;
    /**
     * Move coordinates
     */
    this.move = function(direction) {
      switch (direction) {
        case directions.LEFT:
          this.x -= 1;
          break;
        case directions.RIGHT:
          this.x += 1;
          break;
        case directions.UP:
          this.y -= 1;
          break;
        case directions.DOWN:
          this.y += 1;
          break;
      }
    };
    /**
     * Return direction
     */
    this.getDirection = function() {
      return direction;
    };
    /**
     * Set direction
     */
    this.setDirection = function(newDirection) {
      direction = newDirection;
    };
    /**
     * Compare 2 coords
     */
    this.eq = function(coord) {
      if (coord instanceof Coord) {
        if (this.x == coord.x && y == coord.y) {
          return true;
        }
      } else {
        throw new Error("coord should be an instance of Coord");
      }
      return false;
    };
    /**
     * Produce rand number
     */
    this.assignRandCoord = function(min, max) {
      this.x = Math.floor(Math.random() * (max - 1)) + min;
      this.y = Math.floor(Math.random() * (max- 1)) + min;
    };
  };
}());
