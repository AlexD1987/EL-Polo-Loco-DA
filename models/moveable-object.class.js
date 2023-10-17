class MovableObject {
    x = 150;
    y = 175;
    img;
    height = 150;
    width = 100;
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 2;
    energy = 100;
    lastHit = 0;

    imageChache = {};
    currentImage = 0;

    applyGravity() {
        setInterval(() => {
            if (this.isOverGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
    }

    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    drawFrame(ctx) {
        if (this instanceof Character || this instanceof Enemy || this instanceof Endboss) {
            ctx.beginPath();
            ctx.lineWidth = "3";
            ctx.strokeStyle = "red";
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();
        }
    }

    isOverGround() {
        return this.y < 170;
    }

    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageChache[path] = img;
        });
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

    isHurt() {
        let timePassed = new Date().getTime() - this.lastHit;
        timePassed = timePassed / 1000;
        return timePassed < 2;
    }

    isDead() {
        return this.energy == 0;
    }
}