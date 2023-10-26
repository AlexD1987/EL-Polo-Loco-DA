class Enemy extends MovableObject {
    y = 355;
    height = 60;
    width = 60;

    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];

    constructor(world) {
        super().loadImage('img/3_enemies_chicken/chicken_normal/2_dead/dead.png')
        this.loadImages(this.IMAGES_WALKING);

        this.world = world;

        this.x = 1000 + Math.random() * 719 * 7;
       
        this.speed = 0.15 + Math.random() * 0.5;

        this.animate();
        this.moveLeft();
    }

    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_WALKING);
        }, 200);
    }
}