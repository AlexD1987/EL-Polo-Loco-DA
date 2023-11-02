class Endboss extends MovableObject {
    height = 300;
    width = 280;
    y = 135;

    startFight;

    energy = 100;
    initEndboss = false;
    attack = false;
    reload = false;
    endbossDead = false;
    screamPlayed = false;
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
    dead_sound = new Audio('audio/boss_scream.mp3');


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


    /**
     * Initialize the animation for the object.
     * After a delay of 1500 milliseconds, start the animation and obtain the fight position.
     */
    initAnimation() {
        setTimeout(() => {
            this.animate();
            this.getFightPosition();
        }, 1500);
    }


    /**
     * Animate the object and control the animation flow.
     * Advance the animation frame and handle special events, such as starting the end boss fight.
     */
    animate() {
        let i = 0;
        setInterval(() => {
            this.handleAnimation(i);

            i++;

            if (this.startFight >= 5300 && !this.initEndboss) {
                i = 0;
                setTimeout(() => {
                    this.initEndboss = true;
                    this.startBossFight();
                }, 1700);
            }
        }, 200);
    }


    /**
     * Handle character animation based on the provided conditions and index.
     * Animations may include alert, death, attack, or walking animations.
     * @param {number} i - The animation index used for decision making.
     */
    handleAnimation(i) {
        if (i < 7 && this.startFight >= 5300) {
            this.playAnimation(this.IMAGES_ALERT);
            this.chickenAlarm();
        } else if (this.energy === 0) {
            this.endbossDead = true;
            this.playAnimation(this.IMAGES_DEAD);
            this.checkDeadSoundPlayed();
        } else if (!this.reload) {
            this.playAnimation(this.IMAGES_ATTACK);
        } else if (this.reload) {
            this.playAnimation(this.IMAGES_WALKING);
        }
    }


    /**
     * Start the boss fight sequence for the object.
     * Set up intervals for reloading and changing direction, as well as controlling boss movement.
     */
    startBossFight() {
        setInterval(() => {
            if (this.reload) {
                this.reload = false;
            } else {
                this.reload = true;
                this.direction *= -1;
            }
        }, 4500);

        setInterval(() => {
            if (!this.endbossDead && !this.endbossDead) {
                this.x -= 5 * this.direction;
            }
        }, 600);
    }


    /**
     * Retrieve the fight position of the object relative to the character's position.
     * Set up an interval to periodically update the fight position based on the character's position.
     */
    getFightPosition() {
        setTimeout(() => {
            setInterval(() => {
                this.startFight = world.characterPosition;
            }, 100);
        }, 1000);
    }


    /**
     * Trigger a chicken alarm sound effect.
     * Play the alarm sound effect once and pause it after a specified duration.
     */
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


    /**
     * Check if the dead sound has been played, and play it if not already played.
     */
    checkDeadSoundPlayed() {
        if (!this.screamPlayed) {
            this.dead_sound.play();
        }
        this.screamPlayed = true;
    }


    /**
     * Check if the boss character is in a dead state.
     * @returns {boolean} True if the boss character is dead, otherwise false.
     */
    setBossDead() {
        if (this.endbossDead) {
            return true;
        }
    }
}
