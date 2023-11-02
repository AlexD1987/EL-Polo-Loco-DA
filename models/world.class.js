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
    loopMusic = false;
    isBottleThrowing = false;
    characterFlipped = false;
    hitEnemy = false;
    bottleHitEnemy = false;
    bottleHitBoss = false;
    endBossDead = false;
    enemyDead = false;
    wonGame = false;
    lostGame = false;

    background_music = new Audio('audio/background_music.mp3');
    collect_sound = new Audio('audio/collect.mp3');
    tumble_sound = new Audio('audio/tumbleweed.mp3');


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
        this.checkJumpOnEnemy();
        this.startBackgroundMusic();
        this.checkGameStatus();
    }


    /**
     * Periodically checks the game's status, such as whether the player has won or lost.
     */
    checkGameStatus() {
        setInterval(() => {
            if (world.character.energy === 0) {
                this.lostGame = true;
            }
            if (world.endboss.energy === 0) {
                this.wonGame = true;
            }
        }, 100);
    }


    /**
     * Periodically check various game status and interactions:
     * - Check object sounds (e.g., collision sounds).
     * - Check for character collision with objects/enemies.
     * - Check for boss collision with the character.
     * - Collect ammunition items.
     * - Collect coins.
     * - Check if the boss is defeated.
     */
    checkStatus() {
        setInterval(() => {
            this.checkObjectSounds();
            this.checkCharacterCollision();
            this.checkBossCollision();
            this.collectAmmonition();
            this.collectCoins();
            this.checkBossDead();
        }, 200);
    }


    /**
     * Start playing background music and set it to repeat after a specific duration.
     * - Starts playing the background music.
     * - Sets a timeout to restart the background music after a specified duration (40.2 seconds).
     */
    startBackgroundMusic() {
        this.background_music.play();
        setTimeout(() => {
            this.startBackgroundMusic();
        }, 40200); // Restarts the music after 40.2 seconds
    }


    /**
     * Check for collisions between the character and certain objects and trigger sounds.
     * - Iterates through moving background objects in the level.
     * - If the character collides with a Tumble object, plays a specific sound (e.g., tumble sound).
     */
    checkObjectSounds() {
        this.level.movingBackground.forEach((tumble) => {
            if (tumble instanceof Tumble && this.character.isColliding(tumble)) {
                this.tumble_sound.play();
            }
        });
    }


    /**
     * Check if the end boss is defeated.
     * - Calls the 'setBossDead' method of the 'endboss' object.
     * - Sets 'endBossDead' to 'true' if the end boss is defeated, 'false' otherwise.
     */
    checkBossDead() {
        this.endBossDead = this.endboss.setBossDead() === true;
    }


    /**
     * Check if a bottle is ready to be thrown and initiate the bottle throwing process.
     * - Sets an interval to continuously check if the character is ready to throw a bottle.
     * - Calls the 'checkThrowObject' method if the character is not currently throwing a bottle.
     */
    checkThrowBottle() {
        setInterval(() => {
            if (!this.isBottleThrowing) {
                this.checkThrowObject();
            }
        }, 100);
    }


    /**
     * Check for collisions between the character and enemies, and the character and the end boss.
     * - Iterates through the list of enemies and checks for collisions with the character.
     * - Calls the 'hit' method of the character and updates the health bar if a collision occurs.
     * - Also checks for collisions with the end boss and updates the health bar accordingly.
     */
    checkCharacterCollision() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy) && !this.hitEnemy && !this.enemyDead && !this.character.isOverGround()) {
                this.character.hit();
                this.healthBar.setPercentage(this.character.energy);
            }
        });
        if (this.character.isColliding(this.endboss) && !this.endBossDead) {
            this.character.hit();
            this.healthBar.setPercentage(this.character.energy);
        }
    }


    /**
     * Check for collisions between the end boss and throwable objects (bottles).
     * - Iterates through the list of throwable objects (bottles) and checks for collisions with the end boss.
     * - Calls the 'hit' method of the end boss and updates the boss life bar if a collision occurs.
     */
    checkBossCollision() {
        world.throwableObject.forEach((bottle) => {
            if (this.endboss.isColliding(bottle)) {
                this.endboss.hit();
                this.bossLife.setBossPercentage(this.endboss.energy);
            }
        });
    }


    /**
     * Check if the player is throwing a bottle and handle bottle throwing mechanics.
     * - Checks if the 'D' key is pressed and if the player has ammunition.
     * - Determines the throw direction and reduces ammunition.
     * - Sets a flag 'isBottleThrowing' to true and resets it after a delay.
     */
    checkThrowObject() {
        if (this.keyboard.D && this.character.ammonition > 0) {
            this.checkThrowDirection();
            this.character.ammonition -= 1;
            document.getElementById('ammoCounter').innerHTML = this.character.ammonition;
            this.isBottleThrowing = true;
            setTimeout(() => {
                this.isBottleThrowing = false;
            }, 1500);
        }
    }


    /**
     * Check the throw direction of the character and perform the corresponding throw action.
     * - If the character is facing right, execute 'throwRight'.
     * - If the character is facing left, execute 'throwLeft'.
     */
    checkThrowDirection() {
        if (!this.characterFlipped) {
            this.throwRight();
        } else {
            this.throwLeft();
        }
    }


    /**
     * Performs a right-facing throw action.
     *
     * This function creates a new throwable object (bottle) at the character's position,
     * adds it to the list of throwable objects, and checks for collisions with enemies and the boss.
     * If the bottle hits an enemy, it will be removed from the list after a specified delay.
     */
    throwRight() {
        let bottle = new ThrowableObject(this.character.x + 60, this.character.y + 100);
        this.throwableObject.push(bottle);
        this.checkEnemyBottleHit();
        this.checkBossHit();
        setTimeout(() => {
            if (this.bottleHitEnemy) {
                const bottleIndex = this.throwableObject.indexOf(bottle);
                if (bottleIndex !== -1) {
                    this.throwableObject.splice(bottleIndex, 1);
                }
            }
        }, 50);
    }


    /**
     * Performs a left-facing throw action.
     *
     * This function creates a new throwable object (bottle) at the character's position,
     * adds it to the list of throwable objects, and checks for collisions with enemies and the boss.
     * If the bottle hits an enemy, it will be removed from the list after a specified delay.
     */
    throwLeft() {
        let bottle = new ThrowableObject(this.character.x, this.character.y + 100);
        this.throwableObject.push(bottle);
        this.checkEnemyBottleHit();
        this.checkBossHit();
        setTimeout(() => {
            if (this.bottleHitEnemy) {
                const bottleIndex = this.throwableObject.indexOf(bottle);
                if (bottleIndex !== -1) {
                    this.throwableObject.splice(bottleIndex, 1);
                }
            }
        }, 50);
    }


    /**
     * Checks for collisions between throwable objects and the boss.
     *
     * This function iterates through the list of throwable objects and checks if any of them
     * collide with the boss. If a collision is detected, the `bottleHitBoss` flag is set to true,
     * and the bottle is removed from the list after a specified delay.
     */
    checkBossHit() {
        setInterval(() => {
            this.throwableObject.forEach((bottle) => {
                if (bottle.isColliding(this.endboss)) {
                    this.bottleHitBoss = true;
                    setTimeout(() => {
                        this.bottleHitBoss = false;
                        const bottleIndex = this.throwableObject.indexOf(bottle);
                        if (bottleIndex !== -1) {
                            this.throwableObject.splice(bottleIndex, 1);
                        }
                    }, 300);
                }
            });
        }, 200);
    }


    /**
     * Periodically checks for collisions between bottles and enemies to trigger enemy hits.
     * If a collision is detected, it marks the enemy as hit, sets a timeout to reset the hit status,
     * and clears the collision check interval.
     */
    checkEnemyBottleHit() {
        const intervalId = setInterval(() => {
            world.level.enemies.forEach((enemy, index) => {
                this.throwableObject.forEach((bottle) => {
                    if (bottle.isColliding(enemy)) {
                        enemy.hitChicken(enemy, index);
                        this.bottleHitEnemy = true;
                        this.enemyDead = enemy.setEnemyDead();
                        setTimeout(() => {
                            this.bottleHitEnemy = false;
                            this.enemyDead = false;
                        }, 1000);
                        clearInterval(intervalId);
                    }
                });
            });
        }, 300);
    }


    /**
     * Periodically checks if the character is colliding with an enemy while in mid-air and over ground.
     * If a collision is detected, it triggers an enemy hit, character jump, and sets a timeout to reset the hit status.
     */
    checkJumpOnEnemy() {
        setInterval(() => {
            this.level.enemies.forEach((enemy, index) => {
                if (this.character.isColliding(enemy) && this.character.isOverGround() && !this.enemyDead && this.character.speedY < 0) {
                    this.enemyDead = true;
                    this.hitEnemy = true;
                    enemy.hitChicken(enemy, index);
                    this.character.jump();
                    setTimeout(() => {
                        this.hitEnemy = false;
                        this.enemyDead = false;
                    }, 1000);
                    this.character.y = 170;
                }
            });
        }, 100);
    }


    /**
     * Checks the type of an enemy and performs actions based on the enemy type.
     * If the enemy is an instance of the Enemy class, it marks that a bottle has hit the enemy,
     * removes the enemy from the world, and resets the bottle hit status after a delay.
     *
     * @param {Enemy} enemy - The enemy to check.
     * @param {number} index - The index of the enemy in the enemy list.
     */
    checkEnemyType(enemy, index) {
        if (enemy instanceof Enemy) {
            this.bottleHitEnemy = true;
            setTimeout(() => {
                world.level.enemies.splice(index, 1);
                this.bottleHitEnemy = false;
            }, 1000);
        }
    }


    /**
     * Checks for collisions between the character and ammunition bottles in the game level.
     * If a collision is detected, the character collects the ammunition bottle, removes it from the level,
     * and plays a collection sound.
     */
    collectAmmonition() {
        this.level.bottles.forEach((bottle, index) => {
            if (this.character.isColliding(bottle)) {
                this.character.collect('bottle');
                this.level.bottles.splice(index, 1);
                this.collect_sound.play();
            }
        });
    }


    /**
     * Checks for collisions between the character and coins in the game level.
     * If a collision is detected, the character collects the coin, removes it from the level,
     * and plays a collection sound.
     */
    collectCoins() {
        this.level.coins.forEach((coin, index) => {
            if (this.character.isColliding(coin)) {
                this.character.collect('coin');
                this.level.coins.splice(index, 1);
                this.collect_sound.play();
            }
        });
    }


    /**
     * Clear the canvas, adjust the camera position, and draw the game world, HUD, and objects.
     * The function utilizes the requestAnimationFrame for continuous rendering.
     */
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


    /**
     * Draw the background objects and moving background elements onto the game canvas.
     * These elements contribute to the visual representation of the game world.
     */
    drawWorld() {
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.movingBackground);
    }


    /**
     * Draw the Heads-Up Display (HUD) elements, such as the health bar, ammo bar, and coin bar, on the game canvas.
     * Additionally, if the character's position reaches a certain point, it adds the boss life bar to the display.
     */
    drawHud() {
        this.addToMap(this.healthBar);
        this.addToMap(this.ammoBar);
        this.addToMap(this.coinBar);
        if (this.characterPosition >= 5000) {
            this.addToMap(this.bossLife);
        }
    }


    /**
     * Draw various game objects on the canvas, including the character, enemies, end boss, ammunition bottles,
     * coins, and throwable objects.
     */
    drawObjects() {
        this.addToMap(this.character);
        this.addObjectsToMap(this.level.enemies);
        this.addToMap(this.endboss);
        this.addObjectsToMap(this.level.bottles);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.throwableObject);
    }


    /**
     * Sets the reference to the world for the character, allowing the character to interact with and be aware of the game world.
     */
    setWorld() {
        this.character.world = this;
    }


    /**
     * Add an array of game objects to the rendering map for display on the canvas.
     *
     * @param {Array} object - An array of game objects to be added to the rendering map.
     */
    addObjectsToMap(object) {
        object.forEach(o => {
            this.addToMap(o);
        });
    }


    /**
     * Adds a game object to the map.
     * @param {GameObject} mo - The game object to add.
     */
    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }
        mo.draw(this.ctx);

        if (mo.otherDirection) {
            this.flipBack(mo);
        }
    }


    /**
     * Flips the image horizontally.
     * @param {GameObject} mo - The game object to flip.
     */
    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }


    /**
     * Reverts the horizontal flip of an image.
     * @param {GameObject} mo - The game object to revert.
     */
    flipBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }


    /**
     * Checks if the current object is colliding with another object.
     * @param {GameObject} obj - The object to check for collision.
     * @returns {boolean} True if a collision is detected, otherwise false.
     */
    isColliding(obj) {
        return this.x + this.width > obj.x &&
            this.y + this.height > obj.y &&
            this.x < obj.x + obj.width &&
            this.y < obj.y + obj.height;
    }


    /**
     * Periodically updates the character's position property at a fixed interval of 100 milliseconds.
     */
    checkCharacterPosition() {
        setInterval(() => {
            this.characterPosition = this.character.position;
        }, 100);
    }
}