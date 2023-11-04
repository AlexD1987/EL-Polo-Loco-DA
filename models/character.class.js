class Character extends MovableObject {
    y = 80;
    height = 250;
    speed = 5;
    energy = 100;
    sleepTimer = 5000;

    canPlayJumpSound = true;
    isMoving = false;
    sleepTime = false;
    overGround = false;
    jumpingSoundPlayed = false;
    waitTime = false;
    gameOver = false;

    world;
    startWait;
    endWait;
    waitingTime;
    position;

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

    walking_sound = new Audio('audio/walk.mp3');
    snoring_sound = new Audio('audio/snoring.mp3');
    jumping_sound = new Audio('audio/jump.mp3');
    hurt_sound = new Audio('audio/hurt.mp3');
    dead_sound = new Audio('audio/dead.mp3');


    constructor() {
        super().loadImage('img/2_character_pepe/1_idle/idle/I-1.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_WAITING);
        this.loadImages(this.IMAGES_SLEEPING);
        this.loadImages(this.IMAGES_JUMP);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);

        this.initLevel();
        this.animate();
        this.setCharacterPosition();
        this.applyGravity();
    }


    /**
     * Initialize the level by setting the startLevel flag after a delay.
     */
    initLevel() {
        setTimeout(() => {
            this.startLevel = true;
        }, 1500);
    }


    /**
     * Animate the object by handling various game states and animations.
     */
    animate() {
        this.handleMovement();

        setInterval(() => {
            this.checkJumpAnimation();
            this.checkSleepTimer();
        }, 90);

        setInterval(() => {
            this.checkHurtState();
            this.checkSleepAnimation();
        }, 350);

        setInterval(() => {
            this.checkWaitAnimation();
            this.checkDeadState();
        }, 400);
    }


    /**
    * Set the character's position by updating it at regular intervals.
    */
    setCharacterPosition() {
        setInterval(() => {
            this.position = this.x;
        }, 500);
    }


    /**
     * Check if the sleep animation should be played based on the waiting time and sleep timer.
     * If conditions are met, play the sleeping animation and associated sounds.
     */
    checkSleepAnimation() {
        if (this.waitingTime > this.sleepTimer) {
            this.sleepTime = true;
            this.playAnimation(this.IMAGES_SLEEPING);
            this.snoring_sound.volume = 0.5;
            this.snoring_sound.play();
            this.jumpingSoundPlayed = false;
        }
    }


    /**
     * Check if the waiting animation should be played based on movement and sleep state.
     * If conditions are met, play the waiting animation, pause walking sound, and start sleep timer.
     */
    checkWaitAnimation() {
        if (!this.isMoving && !this.sleepTime) {
            this.walking_sound.pause();
            this.playAnimation(this.IMAGES_WAITING);
            this.jumpingSoundPlayed = false;
            this.startSleepTimer();
        }
    }


    /**
     * Checks and handles the character's jump animation based on their current state.
     */
    checkJumpAnimation() {
        if (this.isOverGround() && this.startLevel) {
            this.handleJumpAnimation();
        } else if (this.isMoving) {
            this.walking_sound.play();
            this.playAnimation(this.IMAGES_WALKING);
            this.jumpingSoundPlayed = false;
            this.resetSleepTimer();
        }
    }


    /**
     * Handles the character's jump animation and plays jump sound if conditions are met.
     */
    handleJumpAnimation() {
        if (!this.jumpingSoundPlayed && this.canPlayJumpSound) {
            this.jumpingSoundPlayed = true;
            this.jumping_sound.volume = 0.5;
            this.jumping_sound.play();
            this.canPlayJumpSound = false;
            setTimeout(() => {
                this.canPlayJumpSound = true;
            }, 1800);
            this.resetSleepTimer();
        }
        this.walking_sound.pause();
        this.playAnimation(this.IMAGES_JUMP);
    }


    /**
     * Check and handle the hurt state of the object.
     * If hurt and not dead, play the hurt animation, hurt sound, pause snoring, and reset the sleep timer.
     */
    checkHurtState() {
        if (this.isHurt() && !this.isDead()) {
            this.playAnimation(this.IMAGES_HURT);
            this.hurt_sound.play();
            this.snoring_sound.pause();
            this.resetSleepTimer();
        }
    }


    /**
     * Check and handle the dead state of the object.
     * If dead, play the dead animation, start dead animation actions, pause walking sound, and reset sleep timer.
     */
    checkDeadState() {
        if (this.isDead()) {
            this.playAnimation(this.IMAGES_DEAD);
            this.startDeadAnimation();

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
                if (event.keyCode == 68) {
                    keyboard.D = false;
                }
            });
            this.resetSleepTimer();
        }
    }


    /**
     * Start the dead animation of the object.
     * Play the dead sound, pause it after 2.5 seconds, and gradually move the object downward.
     */
    startDeadAnimation() {
        this.dead_sound.play();
        setTimeout(() => {
            this.dead_sound.pause();
            this.dead_sound.currentTime = 0;
        }, 2500);

        // Gradually move the object downward
        setInterval(() => {
            this.y += 2;
        }, 1000 / 40);
    }


    /**
     * Handle the movement and actions of the object.
     * Check for jumping or movement direction and update camera position.
     */
    handleMovement() {
        setInterval(() => {
            if (this.world.keyboard.SPACE && !this.isOverGround()) {
                this.jump();
                this.resetSleepTimer();
                this.snoring_sound.pause();
            } else {
                this.handleMoveDirection();
            }
            this.world.camera_x = -this.x + 100;
        }, 1000 / 40);
    }


    /**
     * Handle the movement direction of the object based on keyboard input.
     * Move the object right if the RIGHT key is pressed, left if the LEFT key is pressed, or stop moving if neither is pressed.
     */
    handleMoveDirection() {
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


    /**
     * Start a sleep timer if it is not already active.
     * If not already started, set the `waitTime` flag to true and record the start time.
     */
    startSleepTimer() {
        if (!this.waitTime) {
            this.waitTime = true;
            this.startWait = Date.now();
        }
    }


    /**
     * Check and update the sleep timer, calculating the waiting time if it is active.
     */
    checkSleepTimer() {
        if (this.waitTime) {
            this.endWait = Date.now();
            this.waitingTime = (this.endWait - this.startWait) / 1000;
        }
    }


    /**
     * Reset the sleep timer and related flags and variables.
     */
    resetSleepTimer() {
        this.startWait = 0;
        this.endWait = 0;
        this.sleepTime = false;
        this.waitTime = false;
        this.waitingTime = 0;
    }
}