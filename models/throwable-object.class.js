class ThrowableObject extends MovableObject {

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

    throw() {
        this.speedY = 17;
        this.applyGravity();
        this.bottleAnimation();
        this.setThrowDirection();
    }


    setThrowDirection() {
        if (!world.characterFlipped) {
            setInterval(() => {
                this.x += 10;
            }, 25);
        } else {
            setInterval(() => {
                this.x -= 10;
            }, 25);
        }
    }


    bottleAnimation() {
        setInterval(() => {
            if (!world.hitEnemy) {
                this.playAnimation(this.IMAGES_THROWING);
        } else {
                this.playAnimation(this.IMAGES_SPLASH);
        }
        }, 50);
    }
}