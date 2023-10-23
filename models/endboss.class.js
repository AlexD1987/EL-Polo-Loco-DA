class Endboss extends MovableObject {
    height = 300;
    width = 280;
    y = 135;

    startFight;

    initEndboss = false;

    IMAGES_WALKING = [
        'img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/4_enemie_boss_chicken/1_walk/G3.png',
        'img/4_enemie_boss_chicken/1_walk/G4.png'
    ];

    IMAGES_HURT = [
        'img/4_enemie_boss_chicken/4_hurt/G21.png',
        'img/4_enemie_boss_chicken/4_hurt/G22.png',
        'img/4_enemie_boss_chicken/4_hurt/G23.png'
    ]

    IMAGES_ALERT = [
        'img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/4_enemie_boss_chicken/2_alert/G12.png'
    ]

    IMAGES_ATTACK = [
        'img/4_enemie_boss_chicken/3_attack/G13.png',
        'img/4_enemie_boss_chicken/3_attack/G14.png',
        'img/4_enemie_boss_chicken/3_attack/G15.png',
        'img/4_enemie_boss_chicken/3_attack/G16.png',
        'img/4_enemie_boss_chicken/3_attack/G17.png',
        'img/4_enemie_boss_chicken/3_attack/G18.png',
        'img/4_enemie_boss_chicken/3_attack/G19.png',
        'img/4_enemie_boss_chicken/3_attack/G20.png'
    ]

    IMAGES_DEAD = [
        'img/4_enemie_boss_chicken/5_dead/G24.png',
        'img/4_enemie_boss_chicken/5_dead/G25.png',
        'img/4_enemie_boss_chicken/5_dead/G26.png'
    ]

    alarm_sound = new Audio('audio/alarm.mp3');


    constructor() {
        super().loadImage(this.IMAGES_WALKING[3]);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);

        this.x = 719 * 8;

        this.animate();
        this.getFightPosition();
    }


    animate() {
        let i = 0;
        setInterval(() => {
            if (i < 7) {
                this.playAnimation(this.IMAGES_ALERT)
                setTimeout(() => {
                    if (world.characterPosition >= 5100) {
                        this.chickenAlarm();
                    }
                }, 100);
            } else {
                this.playAnimation(this.IMAGES_WALKING);
            }

            i++;

            if (this.startFight > 5300 & !this.initEndboss) {
                i = 0;
                setTimeout(() => {
                    this.initEndboss = true;
                }, 1700);
            }
        }, 200);
    }

    
    getFightPosition() {
        setTimeout(() => {
            setInterval(() => {
                this.startFight = world.characterPosition;
            }, 100);
        }, 1000);
    }


    chickenAlarm() {
            let soundPlayed = false;
    
            setInterval(() => {
                if (!soundPlayed) {
                    this.alarm_sound.play();
                    soundPlayed = true;
                    setTimeout(() => {
                        this.alarm_sound.pause();
                    }, 800);
                }
            }, 500);
    }
}
