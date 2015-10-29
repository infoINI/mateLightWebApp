requirejs(["underscore", "jquery", "bitfont", "test"], function(_, $, Bitfont, Test) {
    var font = new Bitfont();
    var test = new Test(8,5);
    $("#generateFontTest-btn")
        .click(function() {
            var testJSON = test.generateFontTestJSON();
            document.write(testJSON);
        });
    $("#generateMarqueeTest-btn")
        .click(function() {
            var marqueeJSON = test.generateMarqueeTestJSON();
            document.write(marqueeJSON);
        });
});
