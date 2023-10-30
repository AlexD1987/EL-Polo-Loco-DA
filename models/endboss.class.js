class Endboss extends MovableObject {
    height = 300;
    width = 280;
    y = 135;

    startFight;

    energy = 100;
    initEndboss = false;
    attack = false;
    reload = false;
    direction = 1;

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
        'img/4_enemie_boss_chicken/3_attack/G17.png',
        'img/4_enemie_boss_chicken/3_attack/G18.png',
        'img/4_enemie_boss_chicken/3_attack/G19.png',
        'img/4_enemie_boss_chicken/3_attack/G20.png'
    ]

    IMAGES_LIFEBAR = [
        'img/4_enemie_boss_chicken/_lifebar/eb_0.png',
        'img/4_enemie_boss_chicken/_lifebar/eb_20.png',
        'img/4_enemie_boss_chicken/_lifebar/eb_40.png',
        'img/4_enemie_boss_chicken/_lifebar/eb_60.png',
        'img/4_enemie_boss_chicken/_lifebar/eb_80.png',
        'img/4_enemie_boss_chicken/_lifebar/eb_100.png'
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
        this.loadImages(this.IMAGES_LIFEBAR);
        this.loadImages(this.IMAGES_DEAD);

        this.x = 719 * 8;

        this.initAnimation();
    }


    initAnimation() {
        setTimeout(() => {
            this.animate();
            this.getFightPosition();
        }, 1500);
    }


    animate() {
        let i = 0;
        setInterval(() => {
            if (i < 7 && this.startFight >= 5300) {
                this.playAnimation(this.IMAGES_ALERT)
                this.chickenAlarm();
            } else if (!this.reload) {
                this.playAnimation(this.IMAGES_ATTACK);
            } else if (this.reload) {
                this.playAnimation(this.IMAGES_WALKING);
            }

            i++;

            if (this.startFight >= 5300 & !this.initEndboss) {
                i = 0;
                setTimeout(() => {
                    this.initEndboss = true;
                    this.startBossFight();
                }, 1700);
            }
        }, 200);
    }


    startBossFight() {
        setInterval(() => {
            if (this.reload) {
                this.reload = false;
            } else {
                this.reload = true;
                this.direction *= -1;
            } 
        }, 5000); 

        setInterval(() => {
            this.x -= 5 * this.direction;
        }, 600);
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

        if (!soundPlayed) {
            this.alarm_sound.play();
            soundPlayed = true;
            setTimeout(() => {
                this.alarm_sound.pause();
            }, 1220);
        }
    }
}
