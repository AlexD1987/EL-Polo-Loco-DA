class Character extends MovableObject {
    y = 80;
    height = 250;
    speed = 5;

    isMoving = false; // Eine Variable, um den Bewegungszustand des Charakters zu verfolgen
    sleepTime = false;
    overGround = false;
    jumpingSoundPlayed = false;

    IMAGES_WALKING = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png'
    ];

    IMAGES_WAITING = [
        'img/2_character_pepe/1_idle/idle/I-1.png',
        'img/2_character_pepe/1_idle/idle/I-2.png',
        'img/2_character_pepe/1_idle/idle/I-3.png',
        'img/2_character_pepe/1_idle/idle/I-4.png',
        'img/2_character_pepe/1_idle/idle/I-5.png',
        'img/2_character_pepe/1_idle/idle/I-6.png',
        'img/2_character_pepe/1_idle/idle/I-7.png',
        'img/2_character_pepe/1_idle/idle/I-8.png',
        'img/2_character_pepe/1_idle/idle/I-9.png',
        'img/2_character_pepe/1_idle/idle/I-10.png'
    ];

    IMAGES_SLEEPING = [
        'img/2_character_pepe/1_idle/long_idle/I-11.png',
        'img/2_character_pepe/1_idle/long_idle/I-12.png',
        'img/2_character_pepe/1_idle/long_idle/I-13.png',
        'img/2_character_pepe/1_idle/long_idle/I-14.png',
        'img/2_character_pepe/1_idle/long_idle/I-15.png',
        'img/2_character_pepe/1_idle/long_idle/I-16.png',
        'img/2_character_pepe/1_idle/long_idle/I-17.png',
        'img/2_character_pepe/1_idle/long_idle/I-18.png',
        'img/2_character_pepe/1_idle/long_idle/I-19.png',
        'img/2_character_pepe/1_idle/long_idle/I-20.png'
    ];

    IMAGES_JUMP = [
        'img/2_character_pepe/3_jump/J-31.png',
        'img/2_character_pepe/3_jump/J-32.png',
        'img/2_character_pepe/3_jump/J-33.png',
        'img/2_character_pepe/3_jump/J-34.png',
        'img/2_character_pepe/3_jump/J-35.png',
        'img/2_character_pepe/3_jump/J-36.png',
        'img/2_character_pepe/3_jump/J-37.png',
        'img/2_character_pepe/3_jump/J-38.png',
        'img/2_character_pepe/3_jump/J-39.png'
    ]

    world;
    walking_sound = new Audio('audio/walk.mp3');
    snoring_sound = new Audio('audio/snoring.mp3');
    jumping_sound = new Audio('audio/jump.mp3');



    constructor() {
        super().loadImage('img/2_character_pepe/1_idle/idle/I-1.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_WAITING);
        this.loadImages(this.IMAGES_SLEEPING);
        this.loadImages(this.IMAGES_JUMP);

        this.animate();
        this.applyGravity();
    }

    animate() {
        let sleepTimeout;
        const resetSleepTimer = () => {
            this.sleepTimer(sleepTimeout);
        };

        this.handleMovement(resetSleepTimer);

        setInterval(() => {
            this.checkJumpAnimation();
        }, 90);

        setInterval(() => {
            this.checkSleepAnimation();
        }, 350);

        resetSleepTimer();
    }

    checkSleepAnimation() {
        if (!this.isMoving) {
            if (this.sleepTime) {
                this.playAnimation(this.IMAGES_SLEEPING);
                this.snoring_sound.play();
                this.jumpingSoundPlayed = false;
            } else {
                this.walking_sound.pause();
                this.playAnimation(this.IMAGES_WAITING);
                this.jumpingSoundPlayed = false;
            }
        }
    }

    checkJumpAnimation() {
        if (this.isOverGround()) {
            if (!this.jumpingSoundPlayed) {
                this.jumping_sound.play();
                this.jumpingSoundPlayed = true;
            }
            this.sleepTime = false;
            this.walking_sound.pause();
            this.playAnimation(this.IMAGES_JUMP);
        } else if (this.isMoving) {
            this.sleepTime = false;
            this.walking_sound.play();
            this.playAnimation(this.IMAGES_WALKING);
            this.jumpingSoundPlayed = false;
        }
    }

    handleMovement(resetSleepTimer) {
        setInterval(() => {
            if (this.world.keyboard.SPACE && !this.isOverGround()) {
                this.jump();
            } else {
                if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
                    this.mainCharacterMoveRight();
                    resetSleepTimer();
                } else if (this.world.keyboard.LEFT && this.x > 0) {
                    this.mainCharacterMoveLeft();
                    resetSleepTimer();
                } else {
                    this.isMoving = false;
                }
            }
            this.world.camera_x = -this.x + 100;
        }, 1000 / 40);
    }

    sleepTimer(sleepTimeout) {
        clearTimeout(sleepTimeout);
        sleepTimeout = setTimeout(() => {
            this.sleepTime = true;
        }, 1200000);
    }

}
