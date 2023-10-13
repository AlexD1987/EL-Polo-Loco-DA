class Bottle extends MovableObject {
    width = 80
    height = 60;
    y = 360;

    constructor() {
        super().loadImage('img/6_salsa_bottle/1_salsa_bottle_on_ground.png')

        this.x = 400 + Math.random() * 719 * 7;
    }
}