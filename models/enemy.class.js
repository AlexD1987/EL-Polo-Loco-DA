class Enemy extends MovableObject {
    height = 60;
    width = 60;
    

    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];


    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png')
        this.loadImages(this.IMAGES_WALKING);

        this.x = 500 + Math.random() * 500;
        this.y = this.y + 90;
        this.speed = 0.15 + Math.random() * 0.5;
        
        this.animate();
        this.moveLeft();
    }


    animate() {
        setInterval(() => {
            let i = this.currentImage % this.IMAGES_WALKING.length;
            let path = this.IMAGES_WALKING[i];
            this.img = this.imageChache[path];
            this.currentImage++;
        }, 200);
    }
}