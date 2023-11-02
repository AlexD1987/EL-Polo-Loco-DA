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
     * Handle a collision with an enemy (chicken).
     * If the collision is with an enemy object, set the object's state to hitten and dead, play the dead animation, stop its speed,
     * and remove it from the list of enemies after a delay.
     * @param {Enemy} enemy - The enemy object with which the collision occurred.
     * @param {number} index - The index of the enemy object in the list of enemies.
     */
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