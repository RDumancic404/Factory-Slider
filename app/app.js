$(document).ready(function(){
    $(window).on("resize", function(){location.reload()});
    var isInAnimation;

    $("#btnLeft").hover( function() {
        BlueOutButtons($(this));
    }, function() {
        GrayOutButtons($(this));
    });

    $("#btnRight").hover( function() {
        BlueOutButtons($(this));
    }, function() {
        GrayOutButtons($(this));
    });

    $("#btnRight").click(function(){
        if(isInAnimation == true) {
            return;
        }
        isInAnimation = true;
        var focusedTop = $("#topRow img:last-child");
        var focusedBottom = $("#bottomRow img:last-child");
        LoopRight(focusedTop, focusedBottom);

        let anim1 = $(".top").animate({
            left: "+=" + CalculateShift(focusedTop) + "px"
        }, {queue: false});
        let anim2 = $(".bottom").animate({
            left: "+=" + CalculateShift(focusedBottom) + "px"
        }, {queue: false});
        let anim3 = $(".rows img:first-child").fadeIn("slow");
        $.when(anim1, anim2, anim3).then(function() {
            focusedTop.remove();
            focusedBottom.remove();
            isInAnimation = false;
        });
    });

    $("#btnLeft").click(function(){
        if(isInAnimation == true) {
            return;
        }
        isInAnimation = true;
        var focusedTop = $("#topRow img:first-child");
        var focusedBottom = $("#bottomRow img:first-child");
        LoopLeft(focusedTop, focusedBottom);

        let anim1 = $(".top").animate({
            left: "-=" + CalculateShift(focusedTop) + "px"
        }, {queue: false});
        let anim2 = $(".bottom").animate({
            left: "-=" + CalculateShift(focusedBottom) + "px"
        }, {queue: false});
        let anim3 = $(".rows img:first-child").fadeOut("slow");
        $.when(anim1, anim2, anim3).then(function() {
            focusedTop.remove();
            focusedBottom.remove();
            isInAnimation = false;
        }); 
    });
});

function GrayOutButtons(button) {
    $(button).css("border-color", "#DDDDDD");
    if(button.attr("id") == "btnRight") {
        button.children("img:first").attr("src", "assets/arrow-gray-right.png")
    } else {
        button.children("img:first").attr("src", "assets/arrow-gray-left.png")
    }
}

function BlueOutButtons(button) {
    $(button).css("border-color", "#134880");
    if(button.attr("id") == "btnRight") {
        button.children("img:first").attr("src", "assets/arrow-blue-right.png")
    } else {
        button.children("img:first").attr("src", "assets/arrow-blue-left.png")
    }
}

function CalculateShift(focused){
    var shiftBy = focused.width();
    // Added +10 for the borders between images
    return shiftBy + 10;
}

function LoopRight(top, bottom){
    top.clone().prependTo("#topRow");
    bottom.clone().prependTo("#bottomRow");
    $("#topRow img:first-child").css("right", "1240px").css( "left", "auto");
    $("#bottomRow img:first-child").css("right", "1090px").css( "left", "auto");
}

function LoopLeft(top, bottom){
    top.clone().appendTo("#topRow");
    bottom.clone().appendTo("#bottomRow");
    $("#topRow img:last-child").css( "right", "-" + CalculateShift(top) + "px").css("left", "auto");
    $("#bottomRow img:last-child").css( "right", "-" + CalculateShift(bottom) + "px").css("left", "auto");
}