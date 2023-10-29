class MovableObject extends DrawableObject {
    startLevel = false;
    speed = 0.05;
    otherDirection = false;
    speedY = 0;
    acceleration = 2;
    lastHit = 0;
    ammonition = 0;
    coins = 0;


    applyGravity() {
        setInterval(() => {
            if (this.isOverGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
    }


    isOverGround() {
        if (this instanceof ThrowableObject) {
            return true;
        } else {
            return this.y < 170;
        }
    }


    playAnimation(image) {
        let i = this.currentImage % image.length;
        let path = image[i];
        this.img = this.imageChache[path];
        this.currentImage++;
    }


    moveLeft() {
        setInterval(() => {
            this.x -= this.speed;
        }, 1000 / 60);
    }


    mainCharacterMoveRight() {
        this.x += this.speed;
        this.otherDirection = false;
        this.isMoving = true;
        this.snoring_sound.pause();
        world.characterFlipped = false;
        
    }


    mainCharacterMoveLeft() {
        this.x -= this.speed;
        this.otherDirection = true;
        this.isMoving = true;
        this.snoring_sound.pause();
        world.characterFlipped = true;
    }


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


    jump() {
        this.speedY = 23;
        this.sleepTime = false;
        this.snoring_sound.pause();
    }


    playAnimation(image) {
        let i = this.currentImage % image.length;
        let path = image[i];
        this.img = this.imageChache[path];
        this.currentImage++;
    }


    isColliding(enemy) {
        return this.x + this.width > enemy.x &&
            this.y + this.height > enemy.y &&
            this.x < enemy.x + enemy.width &&
            this.y < enemy.y + enemy.height;
    }


    hit() {
        this.energy -= 5;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }


    collect(item) {
        if (item == 'bottle') {
            this.ammonition += 1;
            document.getElementById('ammoCounter').innerHTML = this.ammonition;
        } else {
            this.coins += 1;
            document.getElementById('coinCounter').innerHTML = this.coins;
        }
    }


    isHurt() {
        let timePassed = new Date().getTime() - this.lastHit;
        timePassed = timePassed / 1000;
        return timePassed < 1;
    }


    isDead() {
        return this.energy == 0;
    }


}