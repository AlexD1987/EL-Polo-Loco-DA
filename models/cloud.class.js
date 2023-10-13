class Cloud extends MovableObject {
    width = 300;
    height = 180;

    constructor() {
        super().loadImage('img/5_background/layers/4_clouds/1.png')

        this.y = Math.random() * 20 + 50;
        this.x = Math.random() * 4000;
        this.animate();
    }

    animate() {
        setInterval(() => {
            this.x -= 0.07;
        }, 1000 / 60);
    }
}