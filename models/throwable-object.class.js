class ThrowableObject extends MovableObject {

    bottleHitEnemy = false;

    IMAGES_THROWING = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png',
    ]

    IMAGES_SPLASH = [
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png',
    ]

    hit_sound = new Audio('audio/break.mp3')
    whip_sound = new Audio('audio/whip.mp3')


    constructor(x, y) {
        super().loadImage(this.IMAGES_THROWING[0]);
        this.loadImages(this.IMAGES_THROWING);
        this.loadImages(this.IMAGES_SPLASH);
        this.x = x;
        this.y = y;
        this.height = 80;
        this.width = 60;

        this.throw();
    }

    /**
     * Perform a throw action.
     * Set the vertical speed, apply gravity, trigger bottle animation, and determine the throw direction.
     */
    throw() {
        this.speedY = 17;
        this.applyGravity();
        this.bottleAnimation();
        this.setThrowDirection();
    }


    /**
     * Set the throw state by marking that the bottle has hit an enemy.
     * After a delay, reset the throw state to indicate no hit.
     */
    setThrowState() {
        this.bottleHitEnemy = true;
        setTimeout(() => {
            this.bottleHitEnemy = false;
        }, 500);
    }


    /**
     * Set the throw direction of the object based on its orientation and collision state.
     * Move the object horizontally in the specified direction.
     */
    setThrowDirection() {
        if (!world.characterFlipped) {
            setInterval(() => {
                if (!world.hitEnemy || this.bottleHitEnemy) {
                    this.x += 7;
                }
            }, 25);
        } else {
            setInterval(() => {
                if (!world.hitEnemy || this.bottleHitEnemy) {
                    this.x -= 7;
                }
            }, 25);
        }
    }


    /**
     * Manage the bottle animation and sound effects.
     * Play the splash animation and sound when the bottle hits an enemy or reaches a certain height.
     * Otherwise, play the throwing animation.
     */
    bottleAnimation() {
        let soundPlayed = false;
        setInterval(() => {
            if (world.bottleHitEnemy || world.bottleHitBoss || this.y > 300) {
                this.playAnimation(this.IMAGES_SPLASH);
                if (!soundPlayed) {
                    this.hit_sound.play();
                    soundPlayed = true;
                }
            } else {
                this.playAnimation(this.IMAGES_THROWING);
            }
        }, 20);
        this.throwingBottle(soundPlayed);
    }


    /**
     * Manage sound effects for the bottle throw action.
     * Play the whip sound and pause it after a certain duration if it has not been played before.
     * @param {boolean} soundPlayed - Indicates whether the sound has already been played.
     */
    throwingBottle(soundPlayed) {
        setInterval(() => {
            if (!soundPlayed) {
                this.whip_sound.play();
                soundPlayed = true;
                setTimeout(() => {
                    this.whip_sound.pause();
                }, 1000);
            }
        }, 500);
    }
}


