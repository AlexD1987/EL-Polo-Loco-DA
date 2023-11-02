let canvas;

let world;
let keyboard = new Keyboard();


/**
 * Initializes the game by setting up the canvas and starting the game world.
 */
function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
    start();
}


/**
 * Initiates the game by hiding the start screen and beginning end game checks.
 */
function start() {
    document.getElementById('startScreen').classList.add('d-none');
    checkEndGame();
}


/**
 * Periodically checks and updates the end game screen based on game status. 
 * Also, removes keyboard event listeners when the game is won.
 */
function checkEndGame() {
    setInterval(() => {
        if (world.wonGame) {
            document.getElementById('endScreenWon').classList.remove('d-none');
            addEventListener('keydown', (event) => {
                if (event.keyCode == 39) {
                    keyboard.RIGHT = false;
                }
                if (event.keyCode == 37) {
                    keyboard.LEFT = false;
                }
                if (event.keyCode == 32) {
                    keyboard.SPACE = false;
                }
            });
        }
        if (world.lostGame) {
            document.getElementById('endScreenLost').classList.remove('d-none');
        }
    }, 100);
}


/**
 * Event listener for keydown events.
 * Detects specific key presses and updates the keyboard object accordingly.
 * @param {Event} event - The keydown event object.
 */
document.addEventListener('keydown', (event) => {
    if (event.keyCode == 39) {
        keyboard.RIGHT = true;
    }
    if (event.keyCode == 37) {
        keyboard.LEFT = true;
    }
    if (event.keyCode == 38) {
        keyboard.UP = true;
    }
    if (event.keyCode == 40) {
        keyboard.DOWN = true;
    }
    if (event.keyCode == 32) {
        keyboard.SPACE = true;
    }
    if (event.keyCode == 68) {
        keyboard.D = true;
    }
});


/**
 * Event listener for keyup events.
 * Detects specific key releases and updates the keyboard object accordingly.
 * @param {Event} event - The keyup event object.
 */
document.addEventListener('keyup', (event) => {
    if (event.keyCode == 39) {
        keyboard.RIGHT = false;
    }
    if (event.keyCode == 37) {
        keyboard.LEFT = false;
    }
    if (event.keyCode == 38) {
        keyboard.UP = false;
    }
    if (event.keyCode == 32) {
        keyboard.SPACE = false;
    }
    if (event.keyCode == 68) {
        keyboard.D = false;
    }
});


/**
 * Add touch event listeners to control character movement and actions using on-screen buttons.
 * - Registers touchstart and touchend events for right, left, jump, and throw buttons.
 * - Prevents default touch behavior to avoid unintended scrolling.
 * - Updates the 'keyboard' object properties to control character actions.
 */
document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('btnRight').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.RIGHT = true;
    });

    document.getElementById('btnRight').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.RIGHT = false;
    });

    document.getElementById('btnLeft').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.LEFT = true;
    });

    document.getElementById('btnLeft').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.LEFT = false;
    });

    document.getElementById('btnJump').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.SPACE = true;
    });

    document.getElementById('btnJump').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.SPACE = false;
    });

    document.getElementById('btnThrow').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.D = true;
    });

    document.getElementById('btnThrow').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.D = false;
    });
});




