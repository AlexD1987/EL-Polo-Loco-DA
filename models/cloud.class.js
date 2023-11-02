class Cloud extends MovableObject {
    width = 300;
    height = 180;

    constructor(x) {
        super().loadImage('img/5_background/layers/4_clouds/1.png')

        this.y = (Math.random() * 20) + (Math.random() * 50);
        this.x = x;
        this.animate();
    }

    
    /**
     * Animate the object by moving it to the left at a constant rate.
     */
    animate() {
        setInterval(() => {
            this.x -= 0.07;
        }, 1000 / 60);
    }
}