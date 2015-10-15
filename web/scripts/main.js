requirejs(["underscore", "jquery", "bitfont", "test"], function(_, $, Bitfont, Test) {
    var font = new Bitfont();
    var test = new Test();
    $("#generateFontTest-btn")
        .click(function() {
            var testJSON = test.generateFontTestJSON();
            document.write(testJSON);
        });
});
