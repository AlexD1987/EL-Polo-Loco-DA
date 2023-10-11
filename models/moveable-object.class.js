class MovableObject {
    x = 150;
    y = 270;
    img;
    height = 150;
    width = 100;
    speed = 0.15;
    otherDirection = false;

    imageChache = {};
    currentImage = 0;

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

    moveRight() {
        setInterval (() => {
            this.x += this.speed;
        }, 1000 / 60);
    }

    moveLeft() {
        setInterval(() => {
            this.x -= this.speed;
        }, 1000 / 60);
    }

    playAnimation(image) {
        let i = this.currentImage % image.length;
                let path = image[i];
                this.img = this.imageChache[path];
                this.currentImage++;
    }
}