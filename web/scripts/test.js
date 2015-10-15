define(["underscore", "bitfont"], function(_, Bitfont) {
    var Test = function() {};

    Test.prototype.generateFontTestJSON = function() {
        var font = new Bitfont();
        var testChars = font.getSupportedChars();
        var testCharsCount = testChars.length;
        var result = {
            "author": "testApp",
            "timestamp": Math.floor(Date.now() / 1000),
            "startDate": Math.floor(Date.now() / 1000),
            "endDate": 0,
            "rows": 5,
            "columns": 8,
            "frames": []
        };
        for (var i = 0; i < testCharsCount; i++) {
            var testCharPattern = font.getCharPattern(testChars[i]);
            var frame = {
                frameNumber: i,
                displayDuration: 500
            };
            for (var rowNum = 0; rowNum < 5; rowNum++) {
                frame["row" + rowNum] = {};
                for (var colNum = 0; colNum < 8; colNum++) {
                    if (testCharPattern[rowNum][colNum] === "1") {
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
