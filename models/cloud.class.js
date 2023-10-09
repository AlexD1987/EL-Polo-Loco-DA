class Cloud extends MovableObject {
    width = 300;
    height = 180;
    y = 50;

    constructor() {
        super().loadImage('img/5_background/layers/4_clouds/1.png')

        
        this.x = Math.random() * 500;
        this.animate();
    }

    animate() {
        setInterval( () =>  {
            this.x -= 0.07;
        }, 1000 / 60);
    }
}