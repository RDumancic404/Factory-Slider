$(document).ready(function(){
    $("#rotateRight").click(function(){
        $("#activeArrows").children().hide();
        var focusedTop = $("#topRow img:last-child");
        var focusedBottom = $("#bottomRow img:last-child");

        $(".top").animate({
            left: "+=" + CalculateShiftRight(focusedTop) + "px"
        }, {queue: false});
        $(".bottom").animate({
            left: "+=" + CalculateShiftRight(focusedBottom) + "px"
        }, {queue: false});
        $(".rows img:first-child").fadeIn("slow", function(){
            focusedTop.remove();
            focusedBottom.remove();
            $("#activeArrows").children().show();
        }); 
    });

    $("#rotateLeft").click(function(){
        $("#activeArrows").children().hide();
        var focusedTop = $("#topRow img:first-child");
        var focusedBottom = $("#bottomRow img:first-child");

        $(".top").animate({
            left: "-=" + CalculateShiftLeft(focusedTop) + "px"
        }, {queue: false});
        $(".bottom").animate({
            left: "-=" + CalculateShiftLeft(focusedBottom) + "px"
        }, {queue: false});
        $(".rows img:last-child").fadeIn("slow", function(){
            focusedTop.remove();
            focusedBottom.remove();
            $("#activeArrows").children().show();
        }); 
    });
});

function CalculateShiftRight(focused){
    var shiftBy = focused.width();
    LoopRight(focused);
    // Added +10 for the borders between images
    return shiftBy + 10;
}

function CalculateShiftLeft(focused){
    var shiftBy = focused.width();
    LoopLeft(focused);
    // Added +10 for the borders between images
    return shiftBy + 10;
}

function LoopRight(focused){
    if(focused.hasClass("top")){
        focused.clone().prependTo("#topRow").hide()
    } else if(focused.hasClass("bottom")){
        focused.clone().prependTo("#bottomRow").hide()
    } 
    $(".rows img:first-child").css( "left", "0")
}

function LoopLeft(focused){
    if(focused.hasClass("top")){
        focused.clone().appendTo("#topRow").hide()
    } else if(focused.hasClass("bottom")){
        focused.clone().appendTo("#bottomRow").hide()
    }
    $(".rows img:last-child").css( "right", "0").css("left", "auto")
}