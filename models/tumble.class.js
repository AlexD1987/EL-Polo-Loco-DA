class Tumble extends MovableObject {
    y = 355;
    width = 50;
    height = 50;

    IMAGES_ROTATE = [
        'img/5_background/layers/tumble1.png',
        'img/5_background/layers/tumble2.png',
        'img/5_background/layers/tumble4.png',
        'img/5_background/layers/tumble4.png'
    ]

    constructor(x) {
        super().loadImage('img/5_background/layers/tumble1.png');
        this.loadImages(this.IMAGES_ROTATE);

        this.x = x;

        this.speed = 1.4 + Math.random() * 0.5;

        this.animate();
        this.moveLeft();
    }

    
    /**
     * Animate the object by repeatedly playing a rotation animation.
     */
    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_ROTATE);
        }, 70);
    }
}