//是否显示导航栏
var showNavBar = true;
//是否展开导航栏
var expandNavBar = true;

//生成的层级
var level = 6

$(document).ready(function () {
    var h1s = $("body").find("h1");
    var h2s = $("body").find("h2");
    var h3s = $("body").find("h3");
    var h4s = $("body").find("h4");
    var h5s = $("body").find("h5");
    var h6s = $("body").find("h6");

    var headCounts = [h1s.length, h2s.length, h3s.length, h4s.length, h5s.length, h6s.length];
    headCounts = headCounts.splice(0, level)
    var vH1Tag = null;
    var vH2Tag = null;
    for (var i = 0; i < headCounts.length; i++) {
        if (headCounts[i] > 0) {
            if (vH1Tag == null) {
                vH1Tag = 'h' + (i + 1);
            } else {
                vH2Tag = 'h' + (i + 1);
            }
        }
    }
    if (vH1Tag == null) {
        return;
    }

    $("body").prepend('<div class="BlogAnchor">' +

        '<p class="html_header">' +
        '<span></span>' +
        '</p>' +
        '<div class="AnchorContent" id="AnchorContent"> </div>' +
        '</div>');


    var vH1Index = 0;
    var vH2Index = 0;
    var hArray = "h1,h2,h3,h4,h5,h6".split(",").splice(0, level);
    $("body").find(hArray.toString()).each(function (i, item) {
        var id = '';
        var name = '';
        var tag = $(item).get(0).tagName.toLowerCase();
        var className = '';
        if (tag == vH1Tag) {
            id = name = ++vH1Index;
            name = id;
            vH2Index = 0;
            className = 'item_h1';
        } else if (tag == vH2Tag) {
            id = vH1Index + '_' + ++vH2Index;
            name = vH1Index + '.' + vH2Index;
            className = 'item_h2';
        }
        $(item).attr("id", "wow" + id);
        $(item).addClass("wow_head");
        var u = $(item).find("a")[0].name
        $("#AnchorContent").css('max-height', ($(window).height() - 80) + 'px');
        $("#AnchorContent").append('<li><a class="nav_item ' + className + ' anchor-link"  href="#' + u + '">' + "" + "" + $(this).text() + '</a></li>');
    });

    //
    // $(".anchor-link").click(function () {
    //     $("html,body").animate({scrollTop: $($(this).attr("link")).offset().top}, 500);
    // });

    var headerNavs = $(".BlogAnchor li .nav_item");
    var headerTops = [];
    $(".wow_head").each(function (i, n) {
        headerTops.push($(n).offset().top);
    });
    $(window).scroll(function () {
        var scrollTop = $(window).scrollTop();
        $.each(headerTops, function (i, n) {
            var distance = n - scrollTop;
            if (distance >= 0) {
                $(".BlogAnchor li .nav_item.current").removeClass('current');
                $(headerNavs[i]).addClass('current');
                return false;
            }
        });
    });

    if (!showNavBar) {
        $('.BlogAnchor').hide();
    }
    if (!expandNavBar) {
        $(this).html("目录▼");
        $(this).attr({"title": "展开"});
        $("#AnchorContent").hide();
    }
});


$(window).resize(function () {
    $("#AnchorContent").css('max-height', ($(window).height() - 80) + 'px');
});



