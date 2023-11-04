class MovableObject extends DrawableObject {
    startLevel = false;
    speed = 0.05;
    otherDirection = false;
    speedY = 0;
    acceleration = 2;
    lastHit = 0;
    ammonition = 0;
    coins = 0;


    /**
     * Apply gravity to the object's vertical position over time.
     */
    applyGravity() {
        setInterval(() => {
            if (this.isOverGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
    }


    /**
     * Check if the object is above the ground.
     * @returns {boolean} True if the object is above the ground, otherwise false.
     */
    isOverGround() {
        if (this instanceof ThrowableObject) {
            return true;
        } else {
            return this.y < 170;
        }
    }


    /**
     * Play an animation using the provided images.
     * @param {string} image - An array of image paths for the animation.
     */
    playAnimation(image) {
        let i = this.currentImage % image.length;
        let path = image[i];
        this.img = this.imageChache[path];
        this.currentImage++;
    }


    /**
     * Move the object to the left continuously at a constant speed.
     */
    moveLeft() {
        setInterval(() => {
            this.x -= this.speed;
        }, 1000 / 60);
    }


    /**
     * Move the main character to the right.
     */
    mainCharacterMoveRight() {
        this.x += this.speed;
        this.otherDirection = false;
        this.isMoving = true;
        this.snoring_sound.pause();
        world.characterFlipped = false;
    }


    /**
     * Move the main character to the left.
     */
    mainCharacterMoveLeft() {
        this.x -= this.speed;
        this.otherDirection = true;
        this.isMoving = true;
        this.snoring_sound.pause();
        world.characterFlipped = true;
    }


    /**
     * Flip the throw direction in the game world based on the character's orientation.
     */
    flipThrowDirection() {
        if (!world.characterFlipped) {
            setTimeout(() => {
                world.throwDirection = false;
            }, 500);
        } else {
            setTimeout(() => {
                world.throwDirection = true;
            }, 500);
        }
    }


    /**
     * Make the object jump by adjusting its vertical speed and waking it up.
     */
    jump() {
        this.speedY = 23;
        this.sleepTime = false;
        this.snoring_sound.pause();
    }


    /**
     * Checks if the current object is colliding with another object, considering offsets.
     * @param {GameObject} mo - The object to check for collision.
     * @returns {boolean} True if a collision is detected, otherwise false.
     */
    isColliding(mo) {
        return (this.x + this.width - this.offsetRight) >= (mo.x + mo.offsetLeft) &&
            (this.x - this.offsetLeft) <= (mo.x + mo.width - mo.offsetRight) &&
            (this.y + this.height - this.offsetBottom) >= (mo.y + mo.offsetTop) &&
            (this.y + this.offsetTop) <= (mo.y + mo.height - mo.offsetBottom);
    }


    /**
     * Reduce the object's energy by 5. If energy goes below 0, set it to 0. Update the last hit timestamp.
     */
    hit() {
        this.energy -= 5;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }


    /**
     * Collect an item and update the corresponding counter on the webpage.
     * @param {string} item - The item to collect, either 'bottle' or other.
     */
    collect(item) {
        if (item === 'bottle') {
            this.ammonition += 1;
            document.getElementById('ammoCounter').innerHTML = this.ammonition;
        } else {
            this.coins += 1;
            document.getElementById('coinCounter').innerHTML = this.coins;
        }
    }


    /**
     * Check if the object is in a hurt state within the last second.
     * @returns {boolean} True if the object is in a hurt state within the last second, otherwise false.
     */
    isHurt() {
        let timePassed = new Date().getTime() - this.lastHit;
        timePassed = timePassed / 1000;
        return timePassed < 1;
    }


    /**
     * Check if the object is dead (has zero energy).
     * @returns {boolean} True if the object is dead (has zero energy), otherwise false.
     */
    isDead() {
        return this.energy === 0;
    }
}