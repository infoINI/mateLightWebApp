define(["underscore", "bitfont", "matelightjson"], function(_, Bitfont, MateLightJSON) {
    var Test = function(screenWidth, screenHeight) {
        this.screenWidth = screenWidth;
        this.screenHeight = screenHeight;
    };

    Test.prototype.generateFontTestJSON = function() {
        var font = new Bitfont();
        var testChars = font.getSupportedChars();
        var testCharsCount = testChars.length;
        var mateLightJSON = new MateLightJSON({
            "author": "testApp",
            "timestamp": Math.floor(Date.now() / 1000),
            "startDate": Math.floor(Date.now() / 1000),
            "rows": this.screenHeight,
            "columns": this.screenWidth
        });
        for (var i = 0; i < testCharsCount; i++) {
            var testCharPattern = font.getCharPattern(testChars[i]);
            mateLightJSON.appendMonochromeBitmap(testCharPattern, "00FF00", 500);
        }
        return mateLightJSON.compileJSON();
    };

    Test.prototype.generateMarqueeTestJSON = function() {
        var font = new Bitfont();
        var testChars = font.getSupportedChars();
        var testCharsCount = testChars.length;
        var fullBitmap = [
            "00",
            "00",
            "00",
            "00",
            "00"
        ];
        testChars.forEach(function(char) {
            var charPattern = font.getCharPattern(char);
            for (var y = 0; y < 5; y++) {
                fullBitmap[y] = fullBitmap[y] + _.reduce(charPattern[y], function(memo, num) {
                    return memo + num;
                }) + "00";
            }
        });
        var mateLightJSON = new MateLightJSON({
            "author": "testApp",
            "timestamp": Math.floor(Date.now() / 1000),
            "startDate": Math.floor(Date.now() / 1000),
            "rows": this.screenHeight,
            "columns": this.screenWidth
        });
        // Generate frames
        for (var offset = 0; offset < fullBitmap[0].length; offset++) {
            var currentFrame = [];
            for (var y = 0; y < this.screenHeight; y++) {
                var subRow = fullBitmap[y].slice(offset, offset + this.screenWidth);
                currentFrame[y] = subRow + "0".repeat(this.screenWidth - subRow.length); //padding at the end of fullBitmap
            }
            mateLightJSON.appendMonochromeBitmap(currentFrame, "00FF00", 200);
        }
        return mateLightJSON.compileJSON();
    };
    return Test;
});
