const level1 = new Level(
    [
        /* new Enemy(),
        new Enemy(),
        new Enemy(),
        new Enemy(),
        new Enemy(),
        new Enemy(),
        new Enemy(),
        new Enemy(),
        new Enemy(),
        new Enemy(),
        new Enemy(),
        new Enemy(),
        new Enemy(),
        new Enemy(),
        new Enemy(),
        new Enemy(),
        new Enemy(),
        new Enemy(), */
        new Endboss()
    ],
    [
        new Cloud(),
        new Cloud(),
        new Cloud(),
        new Sun(),
        new Tumble(),
        new Tumble(),
        new Tumble()
    ],
    [
        new Bottle(),
        new Bottle(),
        new Bottle(),
        new Bottle(),
        new Bottle(),
        new Bottle(),
        new Bottle(),
        new Bottle(),
        new Bottle(),
        new Bottle()
    ],
    [
        new Coin(),
        new Coin(),
        new Coin(),
        new Coin(),
        new Coin(),
        new Coin(),
        new Coin(),
        new Coin(),
        new Coin(),
        
    ],
    [
        new Ground('img/5_background/layers/air.png', -719),
        new Ground('img/5_background/layers/3_third_layer/1.png', -719),
        new Ground('img/5_background/layers/2_second_layer/1.png', -719),
        new Ground('img/5_background/layers/1_first_layer/1.png', -719),
        new Ground('img/5_background/layers/air.png', 0),
        new Ground('img/5_background/layers/3_third_layer/2.png', 0),
        new Ground('img/5_background/layers/2_second_layer/2.png', 0),
        new Ground('img/5_background/layers/1_first_layer/2.png', 0),
        new Ground('img/5_background/layers/air.png', 719),
        new Ground('img/5_background/layers/3_third_layer/1.png', 719),
        new Ground('img/5_background/layers/2_second_layer/1.png', 719),
        new Ground('img/5_background/layers/1_first_layer/1.png', 719),
        new Ground('img/5_background/layers/air.png', 719 * 2),
        new Ground('img/5_background/layers/3_third_layer/2.png', 719 * 2),
        new Ground('img/5_background/layers/2_second_layer/2.png', 719 * 2),
        new Ground('img/5_background/layers/1_first_layer/2.png', 719 * 2),
        new Ground('img/5_background/layers/air.png', 719 * 3),
        new Ground('img/5_background/layers/3_third_layer/1.png', 719 * 3),
        new Ground('img/5_background/layers/2_second_layer/1.png', 719 * 3),
        new Ground('img/5_background/layers/1_first_layer/1.png', 719 * 3),
        new Ground('img/5_background/layers/air.png', 719 * 4),
        new Ground('img/5_background/layers/3_third_layer/2.png', 719 * 4),
        new Ground('img/5_background/layers/2_second_layer/2.png', 719 * 4),
        new Ground('img/5_background/layers/1_first_layer/2.png', 719 * 4),
        new Ground('img/5_background/layers/air.png', 719 * 5),
        new Ground('img/5_background/layers/3_third_layer/1.png', 719 * 5),
        new Ground('img/5_background/layers/2_second_layer/1.png', 719 * 5),
        new Ground('img/5_background/layers/1_first_layer/1.png', 719 * 5),
        new Ground('img/5_background/layers/air.png', 719 * 6),
        new Ground('img/5_background/layers/3_third_layer/2.png', 719 * 6),
        new Ground('img/5_background/layers/2_second_layer/2.png', 719 * 6),
        new Ground('img/5_background/layers/1_first_layer/2.png', 719 * 6),
        new Ground('img/5_background/layers/air.png', 719 * 7),
        new Ground('img/5_background/layers/3_third_layer/1.png', 719 * 7),
        new Ground('img/5_background/layers/2_second_layer/1.png', 719 * 7),
        new Ground('img/5_background/layers/1_first_layer/1.png', 719 * 7),
        new Ground('img/5_background/layers/air.png', 719 * 8),
        new Ground('img/5_background/layers/3_third_layer/2.png', 719 * 8),
        new Ground('img/5_background/layers/2_second_layer/2.png', 719 * 8),
        new Ground('img/5_background/layers/1_first_layer/2.png', 719 * 8),
        new Ground('img/5_background/layers/air.png', 719 * 9),
        new Ground('img/5_background/layers/3_third_layer/1.png', 719 * 9),
        new Ground('img/5_background/layers/2_second_layer/1.png', 719 * 9),
        new Ground('img/5_background/layers/1_first_layer/1.png', 719 * 9)
    ]
);