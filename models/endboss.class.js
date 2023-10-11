class Endboss extends MovableObject {
    height = 60;
    width = 60;

    BOSS_WALKING = [
        'img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/4_enemie_boss_chicken/1_walk/G3.png'
    ];

    constructor() {
        super().loadImage('img/4_enemie_boss_chicken/1_walk/G1.png');
        this.loadImage(this.BOSS_WALKING);

        this.x = 719 * 5;
        this.animate();
    }

    animate() {
        setInterval(() => {
            this.playAnimation(this.BOSS_WALKING);
        }, 200);
    }
}