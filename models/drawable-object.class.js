class DrawableObject {
    x = 150;
    y = 175;
    height = 150;
    width = 100;
    img;
    imageChache = {};
    currentImage = 0;
    offsetTop = 25;
    offsetRight = 35;
    offsetBottom = -20;
    offsetLeft = 10;


    /**
     * Loads an image from the specified path.
     * @param {string} path - The path to the image to load.
     */
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }


    /**
     * Loads and caches images from the provided array of image paths.
     * @param {string[]} arr - An array of image paths to load and cache.
     */
    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageChache[path] = img;
        });
    }


    /**
     * Draws the object's image on the canvas context.
     * @param {CanvasRenderingContext2D} ctx - The 2D rendering context to draw on.
     */
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }
}