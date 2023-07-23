$(function() {
    let $slideDots = '<div class="z-slideDots"></div>';
    $('.z-slideBox').append($slideDots);
    let $slideDot = '<div class="z-slideDots__dot"></div>';
    let $slideChildren = $('.z-slider__slide');
    let $dotsParent = $('.z-slideDots');
    let slideLength = $slideChildren.length;
    let count = 0;
    let imageSlideTime = 3000; // 画像のスライド時間

    //スライドの枚数分ドットを追加
    for (let i = 0; i < slideLength; i++) {
        $dotsParent.append($slideDot);
    }

    let $dotsChildren = $('.z-slideDots__dot');

    //1つめをアクティブにする
    $dotsChildren.eq(0).addClass('active');
    $slideChildren.eq(0).addClass('active');

    let autoPlayTimeout = null;

    function updateSlides(index) {
        // 以前のアクティブなスライドのビデオを一時停止し、再生位置をリセット
        let prevActiveSlide = $slideChildren.filter('.active');
        let prevVideoElem = prevActiveSlide.find('video')[0];
        if (prevVideoElem) {
            prevVideoElem.pause();
            prevVideoElem.currentTime = 0;
        }

        $slideChildren.removeClass('active');
        $slideChildren.eq(index).addClass('active');
    }

    function updateDots(index) {
        // ここで $dotsChildren を再取得
        let $dotsChildren = $('.z-slideDots__dot');
        $dotsChildren.removeClass('active');
        $dotsChildren.eq(index).addClass('active');
    }

    function stopAutoPlay() {
        if (autoPlayTimeout) {
            clearTimeout(autoPlayTimeout);
            autoPlayTimeout = null;
        }
    }

    //オートプレイ
    function autoPlay() {
        stopAutoPlay();

        let activeSlide = $slideChildren.filter('.active');
        let nextSlide = activeSlide.next().length ? activeSlide.next() : $slideChildren.eq(0);
        let videoElem = activeSlide.find('video')[0];

        if (videoElem) {
            videoElem.play();

            // 動画が再生され終わったらスライド
            $(videoElem).one('ended', function() {
                $(videoElem).off('ended');
                count = (count + 1) % slideLength;
                updateSlides(count);
                updateDots(count);
                autoPlay();
            });
        } else {
            // 画像の場合はn秒経過でスライド
            autoPlayTimeout = setTimeout(function() {
                count = (count + 1) % slideLength;
                updateSlides(count);
                updateDots(count);
                autoPlay();
            }, imageSlideTime);
        }
    }

    // 最初のスライドがアクティブになったとき、オートプレイを開始
    autoPlay();

    //ドットをクリックすると、クリックしたインデックスのドットとスライドがアクティブになる。
    $dotsParent.on('click', '.z-slideDots__dot', function() {
        // ここで $clickedDotIndex を取得する前に $dotsChildren を再取得
        let $dotsChildren = $('.z-slideDots__dot');
        let $clickedDotIndex = $dotsChildren.index($(this));
        let activeSlide = $slideChildren.filter('.active');
        let videoElem = activeSlide.find('video')[0];
        if (videoElem) {
            $(videoElem).off('ended');
        }
        stopAutoPlay();
        count = $clickedDotIndex;
        updateSlides(count);
        updateDots(count);
        autoPlay();
    });
});