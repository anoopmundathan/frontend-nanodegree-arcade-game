// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
   this.x = this.x + this.speed;

    if (this.x > 505) {
         this.x = 0;
         this.y = Math.floor(Math.random() * 200);
    }
};

Enemy.prototype.collision = function () {

    /* If player collided with any of the enemy, reset player position 
    to starting position and reduce the score if needed */
    if ((this.x + 75 > player.x) && (this.y + 70 > player.y ) &&
        (this.x < player.x + 50) && (this.y < player.y + 50)) {

        player.reset();
    }

}
// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

var Player = function () {
    this.x = 200;
    this.y = 400;
    this.sprite ='images/char-boy.png';
};

var score = 0;
Player.prototype.update = function (dt) {

    if (this.y < -10) {
        console.log(this.y);
        this.x = 200;
        this.y = 400;
        score = score + 100;
        console.log (score);
    }
};

Player.prototype.render = function (dt) {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    ctx.clearRect(300,10,400,30);
    ctx.font = "20px Arial";
    ctx.fillText("SCORE : " + score  , 310, 30);
};

Player.prototype.reset = function () {

    player.x = 200;
    player.y = 400;

    if (score > 0) {
        score =score - 100;
    }
}


// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var allEnemies = [];
var player;

var enemyBug01 = new Enemy(0,70,2);
var enemyBug02 = new Enemy(0,120,3);
var enemyBug03 = new Enemy(0,240,2);

allEnemies.push(enemyBug01);
allEnemies.push(enemyBug02);
allEnemies.push(enemyBug03);

player = new Player();


Player.prototype.handleInput = function(key) {
    if (key == 'up') {
        // Allow all 'up' movements, as a win will be
        // anything in the water at the top of the board
        this.y = this.y - 20;

    } else if (key == 'left') {
        // Ensure player will still be on the board
        if (this.x > 0) {
            this.x = this.x - 20;
        }
    } else if (key == 'right') {
        // Ensure player will still be on the board
        
            this.x = this.x + 20;

    } else if (key == 'down') {
        // Ensure player will still be on the board
        
            this.y = this.y + 20;
    }
};

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
