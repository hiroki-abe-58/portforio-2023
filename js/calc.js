$(function() {
    var ratioInput = $("#ratio-input");
    var ratioExpander = $("#ratio-expander");
    var ratioInputResult = $("[data-class='ratio-input-result']");
    var ratioUnknownResult = $("[data-class='ratio-unknown-result']");
    var btnRatio = $(".btn-ratio");

    function updateRatio() {
        var activeRatio = $(".btn-ratio.active").attr("data-class").split(':');
        var ratio = Number(ratioInput.val());
        var expander = Number(ratioExpander.val());

        var unknownValue = (ratio / activeRatio[0]) * activeRatio[1];
        unknownValue = Math.floor(unknownValue * expander);
        ratio = Math.floor(ratio * expander);

        ratioInputResult.html('<span class="copyThisText" data-id="' + ratio + '"><i class="fa-regular fa-clone"></i>' + ratio + 'px</span>');
        ratioUnknownResult.html('<span class="copyThisText" data-id="' + unknownValue + '"><i class="fa-regular fa-clone"></i>' + unknownValue + 'px</span>');

        $(".calcSection__resultBox").css('display', 'flex');
    }

    ratioInput.on('input', function() {
        updateRatio();
    });

    ratioExpander.on('input', function() {
        updateRatio();
    });

    btnRatio.click(function() {
        btnRatio.removeClass('active');
        $(this).addClass('active');
        updateRatio();
    });

    updateRatio();

    // コピー機能
    $(document).on('click', '.copyThisText', function() {
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
});