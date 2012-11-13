/**
 * Game controller
 */
var SnakeGame = (function(){
  return function(elm, conf) {
    var gameStart = new Date().getTime();

    var defaultConfig = {
      fieldWidth : 20,
      fieldHeight : 20,
      pointSize: 20,
      deflection: 1,
      canvasColor : "white",
      snakeColor : "lightgreen",
      foodColor: "lightpink",
      defaultCalories: 4,
      gameSpeed: 150
    };
    var resources = {
      'img': {
        'food0': 'img/strawberry.gif',
        'snake_head_right': 'img/s_head_right.png',
        'snake_head_left': 'img/s_head_left.png',
        'snake_head_down': 'img/s_head_down.png',
        'snake_head_up': 'img/s_head_up.png',
        'snake_body_right': 'img/s_body_right.png',
        'snake_body_left': 'img/s_body_left.png',
        'snake_body_up': 'img/s_body_up.png',
        'snake_body_down': 'img/s_body_down.png',
        'snake_tail_right': 'img/s_tail_right.png',
        'snake_tail_left': 'img/s_tail_left.png',
        'snake_tail_up': 'img/s_tail_up.png',
        'snake_tail_down': 'img/s_tail_down.png'
      }
    };

    var config = conf || {};
    config = Utilities.objectMerge(defaultConfig, config); //merge config
    var images = Utilities.preloadImages(resources.img, function() {
      console.log("All images has been preloaded. Game may be started!");
      initialize();//initialize game
    }); //preload all game images

    var rafId = null; //request animation frame ID
    var canvas, //canvas object
        keyboard, //keyboard
        snakeModel,
        foodModel,
        snakeView,
        foodView,
        direction,
        gameStatus = false;

    var initialize = function() {
      canvas = new Canvas(
        elm,
        config.fieldWidth * config.pointSize,
        config.fieldHeight * config.pointSize,
        config.canvasColor,
        "canvas0"
      );

      //game scene borders
      var border = new Coord(config.fieldWidth, config.fieldWidth);
      snakeModel = new SnakeModel(border); //create snakeModel object
      snakeModel.born();

      /**
       * snakeview vars
       */
      var viewVars = {
        'snake_head_right': images[resources.img.snake_head_right],
        'snake_head_left': images[resources.img.snake_head_left],
        'snake_head_down': images[resources.img.snake_head_down],
        'snake_head_up': images[resources.img.snake_head_up],
        'snake_body_right': images[resources.img.snake_body_right],
        'snake_body_left': images[resources.img.snake_body_left],
        'snake_body_down': images[resources.img.snake_body_down],
        'snake_body_up': images[resources.img.snake_body_up],
        'snake_tail_left': images[resources.img.snake_tail_left],
        'snake_tail_right': images[resources.img.snake_tail_right],
        'snake_tail_down': images[resources.img.snake_tail_down],
        'snake_tail_up': images[resources.img.snake_tail_up],
        'snakeColor': config.snakeColor,
        'pointSize': config.pointSize,
        'deflection': config.deflection
      };
      snakeView = new SnakeView(canvas, viewVars); //initiate SnakeView

      foodModel = new FoodModel(border); //create foodModel object
      foodModel.calories = config.defaultCalories;
      foodModel.produce(snakeModel.coords);

      /**
       * foodView vars
       */
      viewVars = {
        'pointSize': config.pointSize
      };
      foodView = new FoodView(canvas, viewVars); //initiate FoodView

      keyboard = new KeyboardControls(startGame); //initiate keyboard controls
      keyboard.setDirection(snakeModel.coords[0].getDirection()); //set initial direction
      keyboard.bindArrowKeys();

      drawScene(); //draw scene
    };

    /**
     * startGame action
     */
    var startGame = function() {
      if (! gameStatus) {
        requestAnimationFrame(animateScene);
        gameStatus = true;
      }
    };

    var animateScene = function() {
      rafId = requestAnimationFrame(animateScene);
      var now = new Date().getTime();
      var dt = gameStart - now;

      //if diff between start and end date <= config.gameSpeed proceed animation
      if (dt <= - config.gameSpeed) {
        gameStart = now;
        direction = keyboard.getDirection();
        var foodFound = snakeModel.eat(foodModel, direction);
        snakeModel.move(direction);
        if(foodFound) {
          foodModel.produce(snakeModel.coords);
        }
        if (! snakeModel.isDead) {
          drawScene();
        } else {
          gameOver();
        }
      }
    };
    /**
     * Scene render goes here
     */
    var drawScene = function() {
      canvas.clear();

      //assign view vars
      foodView.setVar('coords', foodModel.coords);
      foodView.setVar('image', images[resources.img.food0]);
      snakeView.setVar('coords', snakeModel.coords);

      //render scene
      foodView.render();
      snakeView.render();
    };
    /**
     * gameOver action
     */
    var gameOver = function() {
      cancelAnimationFrame(rafId); //cancel main game timer
      // wrapper for snakeView.blink
      var snakeViewBlink = function() {
        snakeView.blink();
      };
      var restart = function() {
         //reborn snake and produce new food
        snakeModel.born();
        foodModel.produce(snakeModel.coords);
        gameStatus = false; //ready to rocknroll again

        drawScene();
      };
      snakeModel.blink(100, 1000, snakeViewBlink, restart);
    };
  };
}());
