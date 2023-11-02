let canvas;

let world;
let keyboard = new Keyboard();


/**
 * Initialize the game.
 * Set up the canvas and create a new World instance with keyboard input.
 */
function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
};


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
    if (event.keyCode == 40) {
        keyboard.DOWN = false;
    }
    if (event.keyCode == 32) {
        keyboard.SPACE = false;
    }
    if (event.keyCode == 68) {
        keyboard.D = false;
    }
});