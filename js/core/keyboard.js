/**
 * KeyboarControls class. Wrapper for input interface
 */
var KeyboardControls = (function() {
  return function(callbackFn) {
    var direction = null;
    /**
     * Set current direction
     */
    this.setDirection = function(newDirection) {
      direction = newDirection;
    };
    /**
     * Return current direction
     */
    this.getDirection = function() {
      return direction;
    };
    /**
     * Assign event listener for arrow controls
     */
    this.bindArrowKeys = function() {
      window.addEventListener("keydown", handleArrowKeyDown, true);
    };
    /**
     * arrow key event handling
     */
    var handleArrowKeyDown = function(e) {
      e.preventDefault();
      switch (e.keyCode) {
        case 37: //left
          if (direction != directions.RIGHT) { //prevent opposite directions
            direction = directions.LEFT;
          }
          break;
        case 39: //right
          if (direction != directions.LEFT) { //prevent opposite directions
            direction = directions.RIGHT;
          }
          break;
        case 38: //up
          if (direction != directions.DOWN) {//prevent opposite directions
            direction = directions.UP;
          }
          break;
        case 40: //down
          if (direction != directions.UP) {
            direction = directions.DOWN;
          }
          break;
      }
      callbackFn();
    };
  };
}());
