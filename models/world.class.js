class World {
    character = new Character();
    statusBar = new StatusBar();
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
        this.checkCollision();
        this.checkCollection();
    }

    checkCollision() {
        setInterval(() => {
            this.level.enemies.forEach( (enemy) => {
                if ( this.character.isColliding(enemy) ) {
                    this.character.hit();
                    console.log('lost energy', this.character.energy);
                    this.statusBar.setPercentage(this.character.energy);
                }
            });
        }, 500);
    }


    checkCollection() {
        setInterval(() => {
            this.level.bottles.forEach( (bottle) => {
                if ( this.character.isColliding(bottle) ) {
                    this.character.collect();
                    console.log('collect bottle', this.character.ammonition);
                }
            });
        }, 500);
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