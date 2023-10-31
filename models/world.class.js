class World {
    character = new Character();
    endboss = new Endboss();
    healthBar = new StatusBar('health', 20, 0, 200, 50);
    ammoBar = new StatusBar('ammo', 5, 50, 70, 60);
    coinBar = new StatusBar('coin', 95, 50, 60, 60);
    bossLife = new StatusBar('boss', 500, 0, 200, 50);
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
    bottleHitEnemy = false;
    endBossDead = false;
    enemyDead = false;

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
            this.checkCharacterCollision();
            this.checkBossCollision();
            this.collectAmmonition();
            this.collectCoins();
            this.checkBossDead();
            this.checkJumpOnEnemy();
        }, 100);
    }


    checkBossDead() {
        this.endBossDead = this.endboss.setBossDead() === true;
    }


    checkThrowBottle() {
        setInterval(() => {
            if (!this.isBottleThrowing) {
                this.checkThrowObject();
            }
        }, 200);
    }


    checkCharacterCollision() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy) && !this.hitEnemy) {
                this.character.hit();
                this.healthBar.setPercentage(this.character.energy);
            }
        });
        if (this.character.isColliding(this.endboss) && !this.endBossDead) {
            this.character.hit();
            this.healthBar.setPercentage(this.character.energy);
        }
    }


    checkBossCollision() {
        world.throwableObject.forEach((bottle) => {
            if (this.endboss.isColliding(bottle)) {
                this.endboss.hit();
                this.bossLife.setBossPercentage(this.endboss.energy);
            }
        });
    }


    checkThrowObject() {
        if (this.keyboard.D && this.character.ammonition > 0) {
            this.checkThrowDirection();
            this.character.ammonition -= 1;
            document.getElementById('ammoCounter').innerHTML = this.character.ammonition;
            this.isBottleThrowing = true;
            setTimeout(() => {
                this.isBottleThrowing = false;
            }, 1500);
            setTimeout
        }
    }


    checkThrowDirection() {
        if (!this.characterFlipped) {
            this.throwRight();
        } else {
            this.throwLeft();
        }
    }


    throwRight() {
        let bottle = new ThrowableObject(this.character.x + 60, this.character.y + 100);
        this.throwableObject.push(bottle);
        this.checkEnemyHit();
        this.checkBossHit();
        setInterval(() => {
            if (this.hitEnemy) {
                setTimeout(() => {
                    this.throwableObject.splice(bottle);
                }, 200);
            }
        }, 1800);
    }


    throwLeft() {
        let bottle = new ThrowableObject(this.character.x, this.character.y + 100);
        this.throwableObject.push(bottle);
        this.checkEnemyHit();
        this.checkBossHit();
        setInterval(() => {
            if (this.hitEnemy) {
                setTimeout(() => {
                    this.throwableObject.splice(bottle);
                }, 200);
            }
        }, 1800);
    }


    checkBossHit() {
        setInterval(() => {
            this.throwableObject.forEach((bottle) => {
                if (bottle.isColliding(this.endboss)) {
                    this.hitEnemy = true;
                    setTimeout(() => {
                        this.hitEnemy = false;
                    }, 500);
                }
            });
        }, 400);
    }


    checkEnemyHit() {
        const intervalId = setInterval(() => {
            world.level.enemies.forEach((enemy, index) => {
                this.throwableObject.forEach((bottle) => {
                    if (bottle.isColliding(enemy)) {
                        enemy.hitChicken(enemy, index);
                        this.hitEnemy = true;
                        setTimeout(() => {
                            this.hitEnemy = false;
                        }, 500);
                        clearInterval(intervalId);
                    }
                });
            });
        }, 300);
    }


    checkJumpOnEnemy() {
        world.level.enemies.forEach((enemy, index) => {
            if (this.character.isColliding(enemy) && this.character.y > enemy.y) {
                enemy.hitChicken(enemy, index);
                this.hitEnemy = true;
                setTimeout(() => {
                    this.hitEnemy = false;
                }, 500);
            }
        })
    }


    checkEnemyType(enemy, index) {
        if (enemy instanceof Enemy) {
            this.bottleHitEnemy = true;
            setTimeout(() => {
                world.level.enemies.splice(index, 1);
                this.bottleHitEnemy = false;
            }, 1000);
        }
    }


    collectAmmonition() {
        this.level.bottles.forEach((bottle, index) => {
            if (this.character.isColliding(bottle)) {
                this.character.collect('bottle');
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
        this.drawWorld();
        this.ctx.translate(-this.camera_x, 0);
        this.drawHud();
        this.ctx.translate(this.camera_x, 0);
        this.drawObjects();
        this.ctx.translate(-this.camera_x, 0);

        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }


    drawWorld() {
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);
    }


    drawHud() {
        this.addToMap(this.healthBar);
        this.addToMap(this.ammoBar);
        this.addToMap(this.coinBar);
        if (this.characterPosition >= 5000) {
            this.addToMap(this.bossLife);
        }
    }


    drawObjects() {
        this.addToMap(this.character);
        this.addObjectsToMap(this.level.enemies);
        this.addToMap(this.endboss);
        this.addObjectsToMap(this.level.bottles);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.throwableObject);
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