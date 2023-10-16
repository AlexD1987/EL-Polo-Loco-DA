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
        this.speedY = 20;
        this.sleepTime = false;
        this.snoring_sound.pause();
    }

    playAnimation(image) {
        let i = this.currentImage % image.length;
        let path = image[i];
        this.img = this.imageChache[path];
        this.currentImage++;
    }
}