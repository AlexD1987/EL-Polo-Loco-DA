class Character extends MovableObject {
    y = 80;
    height = 250;
    speed = 5;
    sleepTimer = 20;

    isMoving = false;
    sleepTime = false;
    overGround = false;
    jumpingSoundPlayed = false;
    waitTime = false;
    startWait;
    endWait;
    waitingTime;

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

    IMAGES_HURT = [
        'img/2_character_pepe/4_hurt/H-41.png',
        'img/2_character_pepe/4_hurt/H-42.png',
        'img/2_character_pepe/4_hurt/H-43.png'
    ]

    IMAGES_DEAD = [
        'img/2_character_pepe/5_dead/D-51.png',
        'img/2_character_pepe/5_dead/D-52.png',
        'img/2_character_pepe/5_dead/D-53.png',
        'img/2_character_pepe/5_dead/D-54.png',
        'img/2_character_pepe/5_dead/D-55.png',
        'img/2_character_pepe/5_dead/D-56.png',
        'img/2_character_pepe/5_dead/D-57.png'
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
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);

        this.animate();
        this.applyGravity();
    }

    animate() {
        this.handleMovement();

        setInterval(() => {
            this.checkJumpAnimation();
            this.checkSleepTimer();
        }, 90);

        setInterval(() => {
            this.checkHurtState();
            this.checkSleepAnimation();
            this.checkDeadState();
        }, 350);

        setInterval(() => {
            this.checkWaitAnimation();
        }, 500);
    }

    checkSleepAnimation() {
        if (this.waitingTime > this.sleepTimer) {
            this.sleepTime = true;
            this.playAnimation(this.IMAGES_SLEEPING);
            this.snoring_sound.play();
            this.jumpingSoundPlayed = false;
        }
    }

    checkWaitAnimation() {
        if (!this.isMoving && !this.sleepTime) {
            this.walking_sound.pause();
            this.playAnimation(this.IMAGES_WAITING);
            this.jumpingSoundPlayed = false;
            this.startSleepTimer();
        }
    }

    checkJumpAnimation() {
        if (this.isOverGround()) {
            if (!this.jumpingSoundPlayed) {
                this.jumping_sound.play();
                this.jumpingSoundPlayed = true;
                this.resetSleepTimer();
            }
            this.walking_sound.pause();
            this.playAnimation(this.IMAGES_JUMP);
        } else if (this.isMoving) {
            this.walking_sound.play();
            this.playAnimation(this.IMAGES_WALKING);
            this.jumpingSoundPlayed = false;
            this.resetSleepTimer();
        }
    }

    checkHurtState() {
        if (this.isHurt() && !this.isDead()) {
            this.playAnimation(this.IMAGES_HURT);
            this.resetSleepTimer();
        }
    }

    checkDeadState() {
        if (this.isDead()) {
            this.playAnimation(this.IMAGES_DEAD);
            this.walking_sound.pause();
            addEventListener('keydown', (event) => {
                if (event.keyCode == 39) {
                    keyboard.RIGHT = false;
                }
                if (event.keyCode == 37) {
                    keyboard.LEFT = false;
                }
                if (event.keyCode == 32) {
                    keyboard.SPACE = false;
                }
            })
            this.resetSleepTimer();
        }
    }

    handleMovement() {
        setInterval(() => {
            if (this.world.keyboard.SPACE && !this.isOverGround()) {
                this.jump();
                this.resetSleepTimer();
                this.snoring_sound.pause();
            } else {
                if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
                    this.mainCharacterMoveRight();
                    this.resetSleepTimer();
                    this.snoring_sound.pause();
                } else if (this.world.keyboard.LEFT && this.x > 0) {
                    this.mainCharacterMoveLeft();
                    this.resetSleepTimer();
                    this.snoring_sound.pause();
                } else {
                    this.isMoving = false;
                }
            }
            this.world.camera_x = -this.x + 100;
        }, 1000 / 40);
    }

    startSleepTimer() {
        if (!this.waitTime) {
            this.waitTime = true;
            this.startWait = Date.now();
        }
    }

    checkSleepTimer() {
        if (this.waitTime) {
            this.endWait = Date.now();
            this.waitingTime = (this.endWait - this.startWait) / 1000;
        }
    }

    resetSleepTimer() {
        this.startWait = 0;
        this.endWait = 0;
        this.sleepTime = false;
        this.waitTime = false;
        this.waitingTime = 0;
    }
}