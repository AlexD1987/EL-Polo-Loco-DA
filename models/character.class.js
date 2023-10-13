class Character extends MovableObject {
    y = 175;
    height = 250;
    speed = 5;

    isMoving = false; // Eine Variable, um den Bewegungszustand des Charakters zu verfolgen
    sleepTime = false;

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

    world;
    walking_sound = new Audio('audio/walk.mp3');
    snoring_sound = new Audio('audio/snoring.mp3');


    constructor() {
        super().loadImage('img/2_character_pepe/1_idle/idle/I-1.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_WAITING);
        this.loadImages(this.IMAGES_SLEEPING);

        this.animate();

    }

    animate() {
        let sleepTimeout;
    
        const resetSleepTimer = () => {
            clearTimeout(sleepTimeout);
            sleepTimeout = setTimeout(() => {
                this.sleepTime = true;
            }, 12000);
        };
    
        setInterval(() => {
            this.walking_sound.pause();
        
            if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
                this.x += this.speed;
                this.otherDirection = false;
                this.isMoving = true;
                this.walking_sound.play();
                this.snoring_sound.pause();
                resetSleepTimer(); // Wenn sich der Charakter bewegt, wird der Timer zurückgesetzt
            } else if (this.world.keyboard.LEFT && this.x > 0) {
                this.x -= this.speed;
                this.otherDirection = true;
                this.isMoving = true;
                this.walking_sound.play();
                this.snoring_sound.pause();
                resetSleepTimer(); // Wenn sich der Charakter bewegt, wird der Timer zurückgesetzt
            } else {
                this.isMoving = false;
            }
    
            this.world.camera_x = -this.x + 100;
        }, 1000 / 30);
    
        setInterval(() => {
            if (this.isMoving) {
                this.sleepTime = false;
                this.playAnimation(this.IMAGES_WALKING);
            }
        }, 90);
    
        setInterval(() => {
            if (!this.isMoving) {
                if (this.sleepTime) {
                    this.playAnimation(this.IMAGES_SLEEPING);
                    this.snoring_sound.play();
                } else {
                    this.playAnimation(this.IMAGES_WAITING);
                }
            }
        }, 350);
    
        resetSleepTimer();
    }
}
