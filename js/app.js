
//constant DECLARATION
var CANVAS_WIDTH  = 505;  //canvas width
var CANVAS_HEIGHT = 606;  //canvas height

//PLAYER
var PLAYER_LIVES   = 3;   //starting number of lives
var PLAYER_START_X = 200; //starting x cordinate position
var PLAYER_START_Y = 400; //starting y cordinate position
var PLAYER_STEP    = 20;  //player movement speed
var PLAYER_POINTS  = 100; //how much player can earn once reached water

var gameFlag = "start"; // this variable controls game start, pause and end

/**
* @description Enemy class
* @param {number} x - X-coordinate of an enemy
* @param {number} y - X-coordinate of an enemy
* @param {number} speed - initial speed of an enemy
* @param {string} sprite - The image of an enemy
*/
var Enemy = function(x, y, speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.sprite = 'images/enemy-bug.png';
};

/**
* @description - Update the enemy's position,
* @parm {number} dt -  time delta between ticks
*/
Enemy.prototype.update = function(dt) {

   this.x = this.x + this.speed;

   //if bug has crossed canvas width, reset to starting position again
    if (this.x > CANVAS_WIDTH ) {
         this.x = 0;
         this.y = Math.floor(Math.random() * 280);
    }
};

/**
* @description - check collision with player
*/
Enemy.prototype.collision = function () {

    /* If player collided with any of the enemy, reset player position 
    to starting position and reduce the score if needed */
    if ((this.x + 75 > player.x) && (this.y + 70 > player.y ) &&
        (this.x < player.x + 50) && (this.y < player.y + 50)) {

        //reset player if collision is detected
        player.reset();
    }

};

/**
* @description - Draw the enemy on the screen
*/
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


/**
* @description Player class
* @param {string} sprite - The image of a player
*/
var Player = function (sprite) {
    this.x = PLAYER_START_X;
    this.y = PLAYER_START_Y;
    this.life = PLAYER_LIVES;
    this.score = 0;
    this.sprite = sprite;
};

/**
* @description - Update the player position and score
* @parm {number} dt -  time delta between ticks
*/
Player.prototype.update = function (dt) {

    /*If player has reached water, place player in starting position again and 
    increase the score as well.*/
    if (this.y < -10) {
        this.x = PLAYER_START_X;
        this.y = PLAYER_START_Y;
        this.score = this.score + PLAYER_POINTS;

        //Add a new gem into the array
        if (this.score == 100) {
            gems.push(new Gem(gemArray[Math.floor(Math.random() * 3)]));
        }
        
    }
};

/**
* @descrition - Draw player, life and score on the screen
* @parm {number} dt -  time delta between ticks
*/
Player.prototype.render = function (dt) {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    ctx.clearRect(0,10,400,30);
    ctx.font = "20px Arial";
    ctx.fillStyle = "black";
    ctx.fillText("LIFE : " + this.life ,1,40);
    ctx.fillText("SCORE : " + this.score  , 310, 40);
};

/**
* @description - reset player position, change life
* once collision has been detected
*/
Player.prototype.reset = function () {

    //place player in starting position
    this.x = PLAYER_START_X;
    this.y = PLAYER_START_Y;

    //player life has to be reduced
    this.life -= 1;

    //if there is no life left end the game
    if (this.life=== 0) 
        gameFlag = "end";
};

/**
* @description Gem class
* @param {number} x - X-coordinate of a gem
* @param {number} y - X-coordinate of a gem
* @param {string} sprite - The image of a gem
*/
var Gem = function (sprite) {

    this.x = Math.floor(Math.random() * 200); 
    this.y = Math.floor(Math.random() * 200);
    this.sprite = sprite;
};

/**
* @description - Draw Gem on to the screen
*/
Gem.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite),this.x,this.y);
};

/**
* @description - this function checks if player collected any gems
* add benefit according to gem
*/
Gem.prototype.collectGems = function () {

    //If player collected gems
    if ((this.x + 70 > player.x) && (this.y + 100 > player.y ) &&
        (this.x < player.x + 70) && (this.y < player.y + 70)) {

        //Add one life to player if green gem is collected
        if (this.sprite == "images/gem-green.png")
            player.life += 1;
        //Increase the score if blue gem is collected
        else if (this.sprite == "images/gem-blue.png")
            player.score += 200;
        //Increase the score if orange gem is collected
        else if (this.sprite == "images/gem-orange.png")
            player.score += 50;
    
        //Remove Gem object from gems array
        gems.splice(0,1);  

        //Add a new random Gem object into gems array
        gems.push(new Gem (gemArray[Math.floor(Math.random() * 3)]));
    }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var allEnemies = [];
var player;

//gem array to store Gem objects
var gems = [];
var gemArray = ['images/gem-green.png','images/gem-blue.png','images/gem-orange.png'];

//Create Enemy bug Objects 
var enemyBug01 = new Enemy(0,(Math.floor(Math.random() * 280)),2);
var enemyBug02 = new Enemy(0,(Math.floor(Math.random() * 280)),3.1);
var enemyBug03 = new Enemy(0,(Math.floor(Math.random() * 280)),1.8);

//Add all created enemy bug objects to an allEnemies Array
allEnemies.push(enemyBug01);
allEnemies.push(enemyBug02);
allEnemies.push(enemyBug03);

//Create Player object
player = new Player();

/**
* @description - to handle keyboard events
*/
Player.prototype.handleInput = function(key) {
    if (key == 'up') {
        // Allow all 'up' movements, as a win will be
        // anything in the water at the top of the board
        this.y = this.y - PLAYER_STEP;

    } else if ((key == 'left') && (this.x > 0)) {
        // Ensure player will still be on the board
            this.x = this.x - PLAYER_STEP;

    } else if ((key == 'right') && ((this.x -70) < 330)) {
        // Ensure player will still be on the board
            this.x = this.x + PLAYER_STEP;

    } else if ((key == 'down') && (this.y + 70 < 500)) {
        // Ensure player will still be on the board
            this.y = this.y + PLAYER_STEP;

    } else if (key == 'space') {
        //If space key is pressed Pause the game
        if (gameFlag === "paused") {
            gameFlag ="started";
        } else {
            gameFlag = "paused";
        }

    }
};

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        32: 'space',
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});
