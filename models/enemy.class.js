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

        this.speed = 0.15 + Math.random() * 0.25;

        this.animate();
        this.moveLeft();
    }

    chickenScream = new Audio('audio/single_screem.mp3');


    /**
     * Animate the object by playing the walking animation if it is not dead.
     */
    animate() {
        setInterval(() => {
            if (!this.dead) {
                this.playAnimation(this.IMAGES_WALKING);
            }
        }, 200);
    }


    /**
     * Handle hitting an enemy chicken.
     * If the provided enemy is an instance of the 'Enemy' class, the character gets hit,
     * plays a hit animation, and removes the enemy from the level.
     * @param {Enemy} enemy - The enemy chicken being hit.
     * @param {number} index - The index of the enemy in the level.
     */
    hitChicken(enemy, index) {
        if (enemy instanceof Enemy) {
            this.hitten = true;
            this.dead = true;
            this.chickenScream.volume = 0.5;
            this.chickenScream.play();
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


    /**
     * Check if the enemy is in a dead state.
     * @returns {boolean} True if the enemy is dead, otherwise false.
     */
    setEnemyDead() {
        if (this.dead) {
            return true;
        }
    }
}