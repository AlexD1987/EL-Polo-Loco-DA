class World {
    character = new Character();
    statusBar = new StatusBar();
    throwableObject = [];
    level = level1;

    canvas;
    keyboard;
    ctx;
    camera_x = 0;
    characterPosition;
    isBottleThrowing = false;
    characterFlipped = false;
    hitEnemy = false;

    collect_sound = new Audio('audio/collect.mp3');


    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.checkStatus();
        this.checkThrowBottle();
        this.collectAmmonition();
        this.collectCoins();
        this.checkCharacterPosition();
    }


    checkStatus() {
        setInterval(() => {
            this.checkCollision();
            this.collectAmmonition();
            this.collectCoins();
        }, 200);
    }


    checkThrowBottle () {
        setInterval(() => {
            if (!this.isBottleThrowing) {
                this.checkThrowObject();
            }
        }, 100);
    }


    checkCollision() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy)) {
                this.character.hit();
                console.log('lost energy', this.character.energy);
                this.statusBar.setPercentage(this.character.energy);
            }
        });
    }


    checkThrowObject() {
        if (this.keyboard.D  && this.character.ammonition > 0) {
            this.checkThrowDirection();
            this.character.ammonition -= 1;
            console.log('ammo', this.character.ammonition);
            this.isBottleThrowing = true; 
            setTimeout(() => {
                this.isBottleThrowing = false;
            }, 1000);
            setTimeout
        }
    }


    checkThrowDirection() {
        if (!this.characterFlipped) {
            let bottle = new ThrowableObject(this.character.x + 60, this.character.y + 100);
            this.throwableObject.push(bottle);
            this.checkEnemyHit();
            setInterval(() => {
                if (this.hitEnemy) {
                    this.throwableObject.splice(bottle);
                }
            }, 1800);
        } else {
            let bottle = new ThrowableObject(this.character.x, this.character.y + 100);
            this.throwableObject.push(bottle);
            this.checkEnemyHit();
        }
    }


    checkEnemyHit() {
        setInterval(() => {
            world.level.enemies.forEach((enemy) => {
                this.throwableObject.forEach((bottle) => {
                    if (bottle.isColliding(enemy)) {
                        this.hitEnemy = true;
                        console.log('hit');
                        setTimeout(() => {
                            this.hitEnemy = false;
                        }, 500);
                    }
                });
            });
        }, 700);
    }
    

    collectAmmonition() {
        this.level.bottles.forEach((bottle, index) => {
            if (this.character.isColliding(bottle)) {
                this.character.collect('bottle');
                console.log('collect bottle', this.character.ammonition);
                this.level.bottles.splice(index, 1);
                this.collect_sound.play();
            }
        });
    }


    collectCoins() {
        this.level.coins.forEach((coin, index) => {
            if (this.character.isColliding(coin)) {
                this.character.collect('coin');
                this.level.coins.splice(index, 1)
                this.collect_sound.play();
            }
        });
    }


    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x, 0);

        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);

        this.ctx.translate(-this.camera_x, 0);
        this.addToMap(this.statusBar);
        this.ctx.translate(this.camera_x, 0);

        this.addToMap(this.character);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.bottles);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.throwableObject);

        this.ctx.translate(-this.camera_x, 0);

        // Draw wird immer wieder aufgerufen
        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }


    setWorld() {
        this.character.world = this;
    }

    
    addObjectsToMap(object) {
        object.forEach(o => {
            this.addToMap(o);
        });
    }


    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }
        mo.draw(this.ctx);
        mo.drawFrame(this.ctx);

        if (mo.otherDirection) {
            this.flipBack(mo);
        }
    }


    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }


    flipBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }


    isColliding(obj) {
        return this.x + this.width > obj.x &&
            this.y + this.height > obj.y &&
            this.x < obj.x &&
            this.y < obj.y + obj.height
    }


    checkCharacterPosition() {
        setInterval(() => {
            this.characterPosition = this.character.position;
        }, 100);
    }
}