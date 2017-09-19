$(function () {
//set positioning variables
    var xPos = 0;
    var xBackground = 400;
    var yPos = 0;
    var yBackground = 0;
    //assign all tiles to class "puzzlepiece"
    $("#puzzlearea > div").addClass("puzzlepiece").css("background-image", "url('background.jpg')");
    //assign tile behavior
    $(".puzzlepiece").click(move);
    $(".puzzlepiece").mouseover(movable);
    //assign shuffle button action
    $("#shufflebutton").click(shuffle);
    //create tiles
    for (var i = 1; i < 16; i++) {
        var tile = $("div")[i];
        tile.style.left = xPos + "px";
        tile.style.top = yPos + "px";
        tile.style.backgroundPosition = xBackground + "px " + yBackground + "px";
        if (parseInt(tile.style.left) < 300) {
            xPos += 100;
            xBackground -= 100;
        }
        else {
            xPos = 0;
            yPos += 100;
            xBackground = 400;
            yBackground -= 100;
        }
    }
    //set empty tile position
    var yEmpty = yPos;
    var xEmpty = xPos;

    //shuffle all tiles
    function shuffle() {
        for (var i = 0; i < 300; i++) {
            var j = parseInt(Math.random() * 15);
            tile = $(".puzzlepiece")[j];
            if (getEmpty($(tile))) {
                var xOld = $(tile).position().left;
                var yOld = $(tile).position().top;
                tile.style.left = xEmpty + "px";
                tile.style.top = yEmpty + "px";
                xEmpty = xOld;
                yEmpty = yOld;
            }
        }
    }

    //move tile to empty space if possible
    function move() {
        var xOld = $(this).position().left;
        var yOld = $(this).position().top;
        var xNew;
        var yNew;
        if (getEmpty($(this)) == "right") {
            xNew = xOld + 100;
            $(this).animate({left: xNew + "px", top: yOld + "px"}, {duration: 100});
            xEmpty = xOld;
            yEmpty = yOld;
        }
        else if (getEmpty($(this)) === "left") {
            xNew = xOld - 100;
            $(this).animate({left: xNew + "px", top: yOld + "px"}, {duration: 100});
            xEmpty = xOld;
            yEmpty = yOld;
        }
        else if (getEmpty($(this)) === "up") {
            yNew = yOld - 100;
            $(this).animate({left: xOld + "px", top: yNew + "px"}, {duration: 100});
            xEmpty = xOld;
            yEmpty = yOld;
        }
        else if (getEmpty($(this)) === "down") {
            yNew = yOld + 100;
            $(this).animate({left: xOld + "px", top: yNew + "px"}, {duration: 100});
            xEmpty = xOld;
            yEmpty = yOld;
        }
    }

    //check for empty space adjacent to tile
    function getEmpty(tile) {
        var xOld = tile.position().left;
        var yOld = tile.position().top;
        var empty = "none";
        if (xEmpty - xOld === 100 && yEmpty === yOld) {
            empty = "right";
        }
        else if (xEmpty - xOld === -100 && yEmpty === yOld) {
            empty = "left";
        }
        else if (yEmpty - yOld === -100 && xEmpty === xOld) {
            empty = "up";
        }
        else if (yEmpty - yOld === 100 && xEmpty === xOld) {
            empty = "down";
        }
        return empty;
    }

    //check whether piece is movable
    function movable() {
        if ((getEmpty($(this)) === "none")) {
            $(this).removeClass("movablepiece");
        }
        else {
            $(this).addClass("movablepiece");
        }
    }
});