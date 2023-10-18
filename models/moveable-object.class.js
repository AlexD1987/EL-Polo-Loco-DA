class MovableObject extends DrawableObject {    
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 2;
    lastHit = 0;
    

    applyGravity() {
        setInterval(() => {
            if (this.isOverGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
    }

    
    isOverGround() {
        return this.y < 170;
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
    }


    mainCharacterMoveLeft() {
        this.x -= this.speed;
        this.otherDirection = true;
        this.isMoving = true;
        this.snoring_sound.pause();
    }


    jump() {
        this.speedY = 23 ;
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
        } else {
            this.coins += 1;
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