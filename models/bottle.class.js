class Bottle extends DrawableObject {
    width = 80
    height = 60;
    y = 360;

    IMAGES_BOTTLE = [
        'img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        'img/6_salsa_bottle/2_salsa_bottle_on_ground.png'
    ]

    constructor(x) {
        super().loadImage(this.IMAGES_BOTTLE[Math.round(Math.random())]) 

        this.x = x;
    }
}