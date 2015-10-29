define(["underscore"], function(_) {

    /**
     * Initializes empty frame
     * @param  {Number} rows    rows
     * @param  {Number} columns columns
     */
    var Frame = function(rows, columns) {
        // initialise empty frame
        this.rows = rows;
        this.columns = columns;
        this._frame = {};
        for (var row = 0; row < rows; row++) {
            this._frame["row" + row] = {};
            for (var col = 0; col < columns; col++) {
                this._frame["row" + row]["col" + col] = "000000";
            }
        }
    };

    /**
     * Sets a color to one single pixel
     * @param  {Number} x     x coordinate
     * @param  {Number} y     y coordinate
     * @param  {String} color color in hexdecimal rgb e.g. FF0000
     */
    Frame.prototype.setPixel = function(x, y, color) {
        this._frame['row' + y]['col' + x] = color;
    };

    /**
     * Returns Frame object
     * @return {Frame} frame
     */
    Frame.prototype.getFrame = function() {
        return this._frame;
    };

    return Frame;
});
