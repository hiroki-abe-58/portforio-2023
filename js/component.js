$(function() {
    //フェード表示
    const fade_bottom = 50;
    const fade_move = 100;
    const fade_time = 600;
    $(".mainSection,.tcSection,.card,.genreBox__item").css({
        opacity: 0,
        transform: "translateY(" + fade_move + "px)",
        transition: fade_time + "ms",
    });
    $(window).on("scroll load", function() {
        const scroll_top = $(this).scrollTop();
        const scroll_bottom = scroll_top + $(this).height();
        const fade_position = scroll_bottom - fade_bottom;
        $(".mainSection,.tcSection,.card,.genreBox__item").each(function() {
            const this_position = $(this).offset().top;
            if (fade_position > this_position) {
                $(this).css({
                    opacity: 1,
                    transform: "translateY(0)",
                });
            }
        });
    });
    //コピー機能
    $(".copyThisText").click(function() {
        var textToCopy = $(this).data('id');
        var $temp = $("<input>");
        $('.copyThisText').removeClass('active');
        $(this).addClass('active');
        $('.copyThisText').find('i').attr('class', 'fa-regular fa-clone');
        $(this).find('i').attr('class', 'fa-regular fa-circle-check');
        $("body").append($temp);
        $temp.val(textToCopy).select();
        document.execCommand("copy");
        $temp.remove();
    });
    $('.btn-copy-code').click(function() {
        var $temp = $("<textarea>");
        $("body").append($temp);
        $temp.val($(this).siblings('.code').text()).select();
        $('.btn-copy-code').removeClass('active');
        $(this).addClass('active');
        $('.btn-copy-code').html('<i class="fa-regular fa-clone"></i>Copy');
        $(this).html('<i class="fa-regular fa-circle-check"></i>Copied');
        document.execCommand("copy");
        $temp.remove();
    });
    $(".btn-copy").on("click", function() {
        $('.btn-copy').removeClass('active');
        $('.btn-copy').html('<i class="fa-regular fa-clone"></i>Copy');
        $(this).toggleClass('active').html('<i class="fa-regular fa-circle-check"></i>Copied');
        var $textToCopy = $(this)
            .closest(".mainSection")
            .find(".promptTxt");

        var $temp = $("<textarea>");
        $("body").append($temp);
        $temp.val($textToCopy.val()).select();
        document.execCommand("copy");
        $temp.remove();
    });

    $(".btn-copy-model").on("click", function() {
        $('.btn-copy-model').removeClass('active');
        $('.btn-copy-model').html('<i class="fa-regular fa-clone"></i>Copy');
        $(this).toggleClass('active').html('<i class="fa-regular fa-circle-check"></i>Copied');
        var $textToCopy = $(this)
            .closest(".subSection--text__box")
            .find(".promptTxt");
        var $temp = $("<textarea>");
        $("body").append($temp);
        $temp.val($textToCopy.val()).select();
        document.execCommand("copy");
        $temp.remove();
    });

    $(".seedCard").on("click", function() {
        $(".seedCard").removeClass('active');
        $(this).addClass('active');
        var imgDataId = $(this).find("img").data("id");
        var $textarea = $(this).closest(".editSection").find(".promptTxt");
        $textarea.val(imgDataId);
    });

    $(".btn-addText").on("click", function() {
        $(this).toggleClass('active');
        var btnText = $(this).data("id");
        btnText += ',';
        var $textarea = $(this).closest(".editSection").find(".promptTxt");
        var currentText = $textarea.val();

        if (currentText.includes(btnText)) {
            var newText = currentText.replace(btnText, '').trim();
        } else {
            var newText = currentText + " " + btnText;
        }

        $textarea.val(newText);
    });

    //ギャラリーイメージの拡大モーダル
    $('.gallery-image').click(function() {
        var largeImage = $(this).attr('data-large');
        $('#img01').attr('src', largeImage);
        $('#imageModal').fadeIn();
    });

    $('.close, #imageModal').click(function() {
        $('#imageModal').fadeOut();
    });

    $('.modal-content, #caption').click(function(event) {
        event.stopPropagation();
    });

    //パララックス
    $(window).on('scroll', function() {
        var scrollTop = $(this).scrollTop();
        var maxScroll = $(window).height();
        var blurValue = scrollTop / maxScroll * 5;
        $('.background-image').css({
            '-webkit-filter': 'blur(' + blurValue + 'px)',
            'filter': 'blur(' + blurValue + 'px)',
            'background-position': 'center ' + (scrollTop * -0.5) + 'px'
        });
    });

    $(window).scroll(function() {
        var scrollTop = $(this).scrollTop();
        var heroSectionHeight = $('.heroSection').height();
        var opacity = 1 - scrollTop / heroSectionHeight;

        if (opacity >= 0) {
            $('.background-image').css('opacity', opacity);
        }
    });

    //目次スクロール
    $(".jumpList p").on("click", function() {
        var text = $(this).text();
        var target = $(".subSectionTitle p").filter(function() {
            return $(this).text() === text;
        });
        if (target.length > 0) {
            $('html, body').animate({
                scrollTop: target.offset().top - 80
            }, 800);
        }
    });

    //TOPへ戻る
    var appear = false;
    var pagetop = $('#page_top');
    $(window).scroll(function() {
        if ($(this).scrollTop() > 100) {
            if (appear == false) {
                appear = true;
                pagetop.stop().animate({
                    'bottom': '50px',
                    'right': '50px'
                }, 300);
            }
        } else {
            if (appear) {
                appear = false;
                pagetop.stop().animate({
                    'bottom': '-50px'
                }, 300);
            }
        }
    });

    pagetop.click(function() {
        $('body, html').animate({ scrollTop: 0 }, 500);
        return false;
    });
    //TOPページブラー
    $(window).on('scroll', function() {
        var scrollTop = $(this).scrollTop();
        var maxScroll = $(window).height();

        var blurValue = scrollTop / maxScroll * 10;
        var opacityValue = 1 - scrollTop / maxScroll;
        $('.heroCopy').css({
            '-webkit-filter': 'blur(' + blurValue + 'px)',
            'filter': 'blur(' + blurValue + 'px)',
            'opacity': opacityValue
        });
    });

    //ローダー
    $('.loader').fadeOut('slow');

    //経験年数
    $('.card__imgBox').each(function() {
        var startDate = $(this).find('.start').text(); // 開始年月を取得
        var currentDate = new Date(); // 現在の日付を取得
        var startYear = parseInt(startDate.substr(0, 4)); // 開始年を抽出
        var startMonth = parseInt(startDate.substr(5, 2)); // 開始月を抽出
        var currentYear = currentDate.getFullYear(); // 現在の年を取得
        var currentMonth = currentDate.getMonth() + 1; // 現在の月を取得

        // 年月の差分を計算
        var yearDiff = currentYear - startYear;
        var monthDiff = currentMonth - startMonth;

        // マイナスの場合、1年分を調整
        if (monthDiff < 0) {
            yearDiff -= 1;
            monthDiff += 12;
        }

        // 結果を表示
        var resultText = yearDiff + '年' + monthDiff + 'ヶ月';
        $(this).find('.result').text(resultText);
    });

    // ボタン -- スクロール
    $('.js-page--down').click(function() {
        $('html, body').animate({
            scrollTop: $(window).height() + $(window).scrollTop()
        }, 500);
    });

    //年齢計算
    var birthDate = new Date(1990, 3, 20);
    var currentDate = new Date();
    var diffInTime = currentDate.getTime() - birthDate.getTime();
    var age = Math.floor(diffInTime / (1000 * 3600 * 24 * 365.25));
    $('.getAge').text(age);

    //業界歴計算
    var startDate = new Date(2014, 2);
    var currentDate = new Date();
    var years = currentDate.getFullYear() - startDate.getFullYear();
    var months = currentDate.getMonth() - startDate.getMonth();
    if (months < 0) {
        years--;
        months += 12;
    }
    $('.getHistory').text(years + "年" + months + "ヶ月");

    //SES歴計算
    var SESstartDate = new Date(2019, 7);
    var SESyears = currentDate.getFullYear() - SESstartDate.getFullYear();
    var SESmonths = currentDate.getMonth() - SESstartDate.getMonth();
    if (SESmonths < 0) {
        SESyears--;
        SESmonths += 12;
    }
    $('.getSES').text(SESyears + "年" + SESmonths + "ヶ月");

    //FAQ
    $('.faqBox').click(function() {
        $(this).find('.faqBox__answer').slideToggle();
        $(this).find('i').toggleClass('transform-180');
    });
});

function header() {
    var currentUrl = window.location.href;
    var found = false;
    $('header a').each(function() {
        if (!found) {
            var href = this.href;
            if (href === window.location.origin + '/') {
                if (currentUrl === href) {
                    $(this).addClass('active');
                    found = true;
                }
            } else {
                if (currentUrl.indexOf(href) === 0) {
                    $(this).addClass('active');
                    found = true;
                }
            }
        }
    });
    $('.hamburger').click(function() {
        $('.headerContainer__right, .headerContainer__left').toggleClass('active');
        $(this).toggleClass('active');
    });
}

function footer() {
    $(document).ready(function() {
        // 発行年計算
        var currentdate = new Date();
        currentdate.setHours(currentdate.getHours() + 9);
        var year = currentdate.getFullYear();
        $('.publicationYear').text(year);

        //ブレッドクラム
        var pathArray = window.location.pathname.split('/');
        var breadcrumb = $('.breadcrumbs');

        if (pathArray.length == 2 && pathArray[1] === "") {
            breadcrumb.hide();
            return;
        }

        breadcrumb.empty();
        breadcrumb.append('<a class="active" href="/">Home</a>');

        if (pathArray[pathArray.length - 1] === "") {
            pathArray.pop();
        }

        var path = "";
        for (var i = 1; i < pathArray.length; i++) {
            if (pathArray[i] != "") {
                path += "/" + pathArray[i];
                breadcrumb.append('<i class="fa-solid fa-chevron-right"></i>');

                var linkText = pathArray[i];
                if (linkText.endsWith('.html')) {
                    linkText = linkText.substring(0, linkText.length - 5);
                }

                if (i == pathArray.length - 1) {
                    breadcrumb.append('<a>' + linkText + '</a>');
                } else {
                    breadcrumb.append('<a class="active" href="' + path + '">' + linkText + '</a>');
                }
            }
        }
    });

}