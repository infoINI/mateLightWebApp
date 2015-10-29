define(["underscore", "bitfont"], function(_, Bitfont) {
    var Test = function(screenWidth, screenHeight) {
        this.screenWidth = screenWidth;
        this.screenHeight = screenHeight;
    };

    Test.prototype.generateFontTestJSON = function() {
        var font = new Bitfont();
        var testChars = font.getSupportedChars();
        var testCharsCount = testChars.length;
        var result = {
            "author": "testApp",
            "timestamp": Math.floor(Date.now() / 1000),
            "startDate": Math.floor(Date.now() / 1000),
            "endDate": 0,
            "rows": this.screenHeight,
            "columns": this.screenWidth,
            "frames": []
        };
        for (var i = 0; i < testCharsCount; i++) {
            var testCharPattern = font.getCharPattern(testChars[i]);
            var frame = {
                frameNumber: i,
                displayDuration: 500
            };
            for (var rowNum = 0; rowNum < this.screenHeight; rowNum++) {
                frame["row" + rowNum] = {};
                for (var colNum = 0; colNum < this.screenWidth; colNum++) {
                    if (testCharPattern[rowNum] !== undefined && testCharPattern[rowNum][colNum] !== undefined && testCharPattern[rowNum][colNum] === "1") {
                        frame["row" + rowNum]["col" + colNum] = "00FF00";
                    } else {
                        frame["row" + rowNum]["col" + colNum] = "000000";
                    }
                }
            }
            result.frames.push(frame);
        }
        return JSON.stringify(result);
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
        var result = {
            "author": "testApp",
            "timestamp": Math.floor(Date.now() / 1000),
            "startDate": Math.floor(Date.now() / 1000),
            "endDate": 0,
            "rows": this.screenHeight,
            "columns": this.screenWidth,
            "frames": []
        };

        // Generate frames
        for (var offset = 0; offset < fullBitmap[0].length; offset++) {
            var currentFrame = [];
            for (var y = 0; y < this.screenHeight; y++) {
                var subRow = fullBitmap[y].slice(offset, offset + this.screenWidth);
                currentFrame[y] = subRow + "0".repeat(this.screenWidth - subRow.length); //padding at the end of fullBitmap
            }
            var frame = {
                frameNumber: offset,
                displayDuration: 200
            };
            for (var rowNum = 0; rowNum < this.screenHeight; rowNum++) {
                frame["row" + rowNum] = {};
                for (var colNum = 0; colNum < this.screenWidth; colNum++) {
                    if (currentFrame[rowNum] !== undefined && currentFrame[rowNum][colNum] !== undefined && currentFrame[rowNum][colNum] === "1") {
                        frame["row" + rowNum]["col" + colNum] = "00FF00";
                    } else {
                        frame["row" + rowNum]["col" + colNum] = "000000";
                    }
                }
            }
            result.frames.push(frame);
        }
        return JSON.stringify(result);
    };
    return Test;
});
