class Enemy extends MovableObject {
    y = 355;
    height = 60;
    width = 60;

    hitten = false;
    dead = false;

    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];

    IMAGES_DEAD = [
        'img/3_enemies_chicken/chicken_normal/2_dead/dead.png'
    ]

    constructor(x) {
        super().loadImage('img/3_enemies_chicken/chicken_normal/2_dead/dead.png')
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);

        this.x = x;
       
        this.speed = 0.15 + Math.random() * 0.2;

        this.animate();
        this.moveLeft();
    }

    animate() {
        setInterval(() => {
            if (!this.dead) {
                this.playAnimation(this.IMAGES_WALKING);
            }
        }, 200);
    }

    hitChicken(enemy, index) {
        if (enemy instanceof Enemy) {
            this.hitten = true;
            this.dead = true;
            setInterval(() => {
                this.playAnimation(this.IMAGES_DEAD);
            }, 20);
            this.speed = 0;
            setTimeout(() => {
                world.level.enemies.splice(index, 1);
                this.hitten = false;
                this.dead = false;
            }, 1000);
        }
    }


    setEnemyDead() {
        if (this.dead) {
            return true;
        }
    }
}