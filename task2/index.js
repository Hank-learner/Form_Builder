class Game {
    constructor(bufferwidth, bufferheight) {
        this.bufferwidth = bufferwidth;
        this.bufferheight = bufferheight;

        this.backgroundimg = new Backgroundimg(this);
        this.shooter = new Shooter(this);
        this.bullet = new Bullet(this.shooter, this);
        new InputHandler(this.shooter, this, this.bullet);
        // this.inputhandler = new InputHandler(this.shooter, this, this.bullet);

    }
    draw(buffer) {
        this.backgroundimg.draw(buffer);
        this.shooter.draw(buffer);

        // document.addEventListener("keydown", event => {
        //     switch (event.keyCode) {
        //         case 40:
        // if (event.keyCode == 40)
        this.bullet.draw(buffer);
        // console.log(1);
        //             break;
        //         default:
        //             break;
        //     }
        // });

    }
    update(deltatime) {
        this.shooter.update(deltatime);
        // this.inputhandler.update(deltatime);
        this.bullet.update(deltatime);
    }
}

class Backgroundimg {
    constructor(game) {
        this.game = game;
    }
    draw(buffer) {
        context.imageSmoothingEnabled = false;
        for (let i = map.length - 1; i > -1; --i) {
            let value = map[i];
            let tilex = (i % columns) * tilesize;
            let tiley = Math.floor(i / columns) * tilesize;
            buffer.drawImage(tilesheet, value * tilesize, 0, tilesize, tilesize, tilex, tiley, tilesize, tilesize);

        }
    }
}

class Shooter {
    constructor(game) {
        this.game = game;
        this.position = {
            x: 113,
            y: 181
        };
        this.speed = 0;
        this.maxSpeed = 2;
        this.size = 30;
        this.shooterimg = document.getElementById("shooterimg");
    }
    draw(buffer) {

        buffer.drawImage(this.shooterimg, this.position.x, this.position.y, this.size, this.size);
        context.imageSmoothingEnabled = false;
    }
    moveleft() {
        this.speed = -this.maxSpeed;

    }
    moveright() {
        this.speed = this.maxSpeed;
    }
    stop() {
        this.speed = 0;
    }
    update(deltatime) {

        this.position.x += this.speed;

        if (this.position.x < 0)
            this.position.x = 0;


        if (this.position.x + this.size > this.game.bufferwidth)
            this.position.x = this.game.bufferwidth - this.size;

    }

}

class Bullet {
    constructor(shooter, game) {
        this.shooter = shooter;
        this.game = game;
        this.position = {
            x: this.shooter.position.x + 15,
            y: this.shooter.position.y - 2

        };
        this.speed = -1;


    }
    draw(buffer) {
        buffer.beginPath();
        buffer.arc(this.position.x, this.position.y, 4, 0, 2 * Math.PI);
        buffer.fillStyle = 'yellow';
        buffer.fill();
        context.imageSmoothingEnabled = false;

    }
    update(deltatime) {
        this.position.y += this.speed;

        if (this.position.y < 0) {
            this.position.x = this.shooter.position.x + 15;
            this.position.y = this.shooter.position.y - 2;
        }
    }
}






class InputHandler {
    constructor(shooter, game, bullet) {
        this.shooter = shooter;
        this.game = game;
        this.bullet = bullet;
        document.addEventListener("keydown", event => {
            switch (event.keyCode) {
                case 65:
                case 37:
                    shooter.moveleft();
                    break;
                case 68:
                case 39:
                    shooter.moveright();
                    break;
                case 83:
                case 40:
                    // this.bullet = new Bullet(this.shooter, this.game);
                    // this.bullet.draw(buffer);


                    //     // bullets.push(new Bullet(this.shooter, this.game));
                    //     // this.bullet.draw(buffer);
                    //     // for (let ind = 0; ind < bullets.length; ind++) {
                    //     // let bullet = bullets[ind];
                    //     // this.bullet.draw(buffer);
                    //     // if (bullet.y < -4) bullets.splice(ind);
                    //     // }
                    //     // this.bullet.update(deltatime);

                    break;
                default:
                    break;
            }


        });
        document.addEventListener("keyup", event => {
            switch (event.keyCode) {
                case 65:
                case 37:
                    if (shooter.speed < 0) {
                        shooter.stop();
                    }
                    break;
                case 68:
                case 39:
                    if (shooter.speed > 0) {
                        shooter.stop();
                    }
                    break;
                // case 83:
                // case 40:
                //     bullet.shootstop();
                //     break;
                default:
                    break;


            }
        });
    }
    // update(deltatime) {
    //     this.bullet.update(deltatime);

    // }
}







var context = document.querySelector("canvas").getContext("2d");
var buffer = document.createElement("canvas").getContext("2d");

var bullets = new Array();


var columns = 16; var rows = 16; var tilesize = 16; var scale = 1;
var map = [1, 1, 0, 0, 1, 1, 0, 0, 0, 1, 0, 1, 1, 1, 0, 1,
    0, 1, 0, 0, 0, 1, 0, 0, 1, 1, 0, 1, 0, 1, 1, 0,
    0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1,
    1, 0, 1, 0, 0, 0, 0, 1, 1, 0, 1, 0, 0, 0, 0, 0,
    0, 0, 1, 1, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0,
    1, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0,
    1, 0, 0, 1, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 1,
    0, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0,
    0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0,
    1, 0, 0, 0, 1, 0, 0, 1, 1, 1, 0, 0, 0, 1, 0, 0,
    1, 0, 1, 0, 0, 0, 0, 1, 1, 0, 1, 0, 0, 0, 1, 0,
    0, 1, 0, 0, 0, 1, 0, 0, 1, 1, 0, 1, 0, 1, 1, 0,
    0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 1, 0, 0, 1, 0, 1,
    2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
    3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3,
    3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3];

buffer.canvas.width = tilesize * columns;
buffer.canvas.height = tilesize * rows;

let game = new Game(buffer.canvas.width, buffer.canvas.height);

let lasttime = 0;
var tilesheet = new Image();
tilesheet.src = "shoot.png";




function gameLoop(timestamp) {
    var height = document.documentElement.clientHeight - 16;
    var width = document.documentElement.clientWidth - 16;
    var minsize = height < width ? height : width;
    context.canvas.height = minsize;
    context.canvas.width = minsize;
    let deltatime = timestamp - lasttime;
    lasttime = timestamp;


    // for (let ind = bullets.length - 1; ind > -1; --ind) {
    //     let bullet = bullets[ind];
    //     console.log(1);
    //     if (bullet.y < -4) bullets.splice(ind);
    // }
    game.draw(buffer);
    game.update(deltatime);

    context.drawImage(buffer.canvas, 0, 0, buffer.canvas.width, buffer.canvas.height, 0, 0, context.canvas.width, context.canvas.height);

    window.requestAnimationFrame(gameLoop);
    context.imageSmoothingEnabled = false;
} window.requestAnimationFrame(gameLoop);







