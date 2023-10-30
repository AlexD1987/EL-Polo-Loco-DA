class StatusBar extends DrawableObject {

    IMAGES_HEALTH = [
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/0.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/20.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/40.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/60.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/80.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png'
    ]

    IMAGES_BOSS_HEALTH = [
        'img/7_statusbars/2_statusbar_endboss/0.png',
        'img/7_statusbars/2_statusbar_endboss/20.png',
        'img/7_statusbars/2_statusbar_endboss/40.png',
        'img/7_statusbars/2_statusbar_endboss/60.png',
        'img/7_statusbars/2_statusbar_endboss/80.png',
        'img/7_statusbars/2_statusbar_endboss/100.png'
    ]

    IMAGES_COLLECTEBLES = [
        'img/7_statusbars/3_icons/icon_salsa_bottle.png',
        'img/7_statusbars/3_icons/icon_coin.png'
    ]

    
    percentage = 100;
    bossPercentage = 100;


    constructor(type, x, y, width, height) {
        super();
        this.loadImages(this.IMAGES_HEALTH);
        this.loadImages(this.IMAGES_BOSS_HEALTH);
        this.loadImages(this.IMAGES_COLLECTEBLES);
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.setStatusBar(type);
    }


    setStatusBar(type) {
        if (type == 'ammo') {
            let path = this.IMAGES_COLLECTEBLES[0];
            this.img = this.imageChache[path];
        } else if (type == 'coin') {
            let path = this.IMAGES_COLLECTEBLES[1];
            this.img = this.imageChache[path];
        } else if (type == 'boss') {
            this.setBossPercentage(100);
        } else {
            this.setPercentage(100);
        }
    }



    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES_HEALTH[this.getImageIndex(percentage)];
        this.img = this.imageChache[path];
    }

    setBossPercentage(percentage) {
        this.bossPercentage = percentage;
        let path = this.IMAGES_BOSS_HEALTH[this.getImageIndex(percentage)];
        this.img = this.imageChache[path];
    }


    getImageIndex(percentage) {
        if (percentage == 100) {
            return 5;
        } else if (percentage > 80) {
            return 4;
        } else if (percentage > 60) {
            return 3;
        } else if (percentage > 40) {
            return 2;
        } else if (percentage > 5) {
            return 1;
        } else {
            return 0;
        }
    }
}