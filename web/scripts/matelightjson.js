define(["underscore", "frame"], function(_, Frame) {
    var MateLightJSON = function(config) {
        this._mlJSON = {
            "author": config.author,
            "timestamp": config.timestamp,
            "startDate": config.startDate,
            "endDate": config.endDate || 0,
            "rows": config.rows,
            "columns": config.columns,
            "frames": []
        };
    };

    /**
     * Appends a single [y][x] style bit-array as frame
     * @param  {Array} bitmap [y][x] bit Array
     * @param  {String} color frame color in hexdecimal rgb e.g. FF0000
     * @param  {Number} displayDuration display duration in ms
     */
    MateLightJSON.prototype.appendMonochromeBitmap = function(bitmap, color, displayDuration) {
        var frame = new Frame(this._mlJSON.rows, this._mlJSON.columns);
        var yMax = _.min([frame.rows, bitmap.length]);
        var xMax = _.min([frame.columns, bitmap[0].length]);
        for (var y = 0; y < yMax; y++) {
            for (var x = 0; x < frame.columns; x++) {
                if (bitmap[y][x] == 1) {
                    frame.setPixel(x, y, color);
                }
            }
        }
        this.appendFrame(frame, displayDuration);
    };

    /**
     * Appends a proper formatted frame into JSON
     * @param  {Frame} frame Frame object to be appended
     * @param  {Number} displayDuration display duration in ms
     */
    MateLightJSON.prototype.appendFrame = function(frame, displayDuration) {
        var _frame = frame.getFrame();
        _frame.displayDuration = displayDuration;
        _frame.frameNumber = this._mlJSON.frames.length;
        this._mlJSON.frames.push(_frame);
    };

    /**
     * Generates mateLight JSON
     * @return {json} mateLight JSON
     */
    MateLightJSON.prototype.compileJSON = function() {
        return JSON.stringify(this._mlJSON);
    };
    return MateLightJSON;
});
