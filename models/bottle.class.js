class Bottle extends DrawableObject {
    width = 80
    height = 60;
    y = 360;

    constructor(x) {
        super().loadImage('img/6_salsa_bottle/1_salsa_bottle_on_ground.png') 

        this.x = x;
    }
}