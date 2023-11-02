class Sun extends MovableObject {
    width = 100;
    height = 100;
    y = 30;

    IMAGES_ANIMATION = [
        'img/5_background/layers/sun.png',
        'img/5_background/layers/sun2.png'
    ];

    constructor() {
        super().loadImage('img/5_background/layers/sun.png');
        this.loadImages(this.IMAGES_ANIMATION);

        this.x = Math.random() * 3000;
        this.animate();
    }


    /**
     * Initiates an animation loop by repeatedly playing a sequence of images.
     */
    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_ANIMATION);
        }, 600);
    }
}