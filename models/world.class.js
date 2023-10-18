class World {
    character = new Character();
    statusBar = new StatusBar();
    throwableObject = [];
    level = level1;

    canvas;
    keyboard;
    ctx;
    camera_x = 0;

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
    }

    checkStatus() {
        setInterval(() => {
            this.checkCollision();
            this.collectAmmonition();
            this.collectCoins();
        }, 400);
    }

    checkThrowBottle () {
        setInterval(() => {
            this.checkThrowObject();
        }, 300);
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
            let bottle = new ThrowableObject(this.character.x + 60, this.character.y + 100);
            this.throwableObject.push(bottle);
            this.character.ammonition -= 1;
            console.log('ammo', this.character.ammonition);
        }
    }


    collectAmmonition() {
        this.level.bottles.forEach((bottle, index) => {
            if (this.character.isColliding(bottle)) {
                this.character.collect('bottle');
                console.log('collect bottle', this.character.ammonition);
                this.level.bottles.splice(index, 1);
            }
        });
    }


    collectCoins() {
        this.level.coins.forEach((coin, index) => {
            if (this.character.isColliding(coin)) {
                this.character.collect('coin');
                console.log('collect coin', this.character.coins);
                this.level.coins.splice(index, 1)
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
}