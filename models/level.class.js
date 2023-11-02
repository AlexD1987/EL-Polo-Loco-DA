class Level {
    enemies;
    clouds;
    bottles;
    coins;
    backgroundObjects;
    level_end_x = 719 * 9;

    constructor(enemies, movingBackground, bottles, coins, backgroundObjects) {
        this.enemies = enemies;
        this.movingBackground = movingBackground;
        this.bottles = bottles;
        this.coins = coins;
        this.backgroundObjects = backgroundObjects;
    }
}