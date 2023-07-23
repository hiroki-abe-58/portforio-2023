$(document).ready(function() {

    // 検索機能
    function performSearch() {
        var searchText = $(".searchSection input").val().toLowerCase();
        if (!searchText) return;
        $(".searchClearSection").css("display", "flex");
        $('.btn-badgeSort[data-class="all"]').text('キーワードと一致するすべて');
        $(".card").each(function() {
            var cardText = $(this).text().toLowerCase();
            if (cardText.indexOf(searchText) !== -1) {
                $(this).removeClass('unmatched');
            } else {
                $(this).addClass('unmatched');
            }
        });

        updateCards();
    }

    $(".btn-search").on("click", performSearch);
    $(".searchSection input").on("keyup", function(e) {
        if (e.key === 'Enter') performSearch();
    });

    // ソート機能
    $(".btn-badgeSort").on('click', function() {

        var filterClass = $(this).data('class');

        if (filterClass === 'all') {
            $('.btn-badgeSort').removeClass('active');
            $(this).addClass('active');
            $('.card').removeClass('filtered');
        } else {
            $('.btn-badgeSort[data-class="all"]').removeClass('active');
            $(this).toggleClass('active');

            var filterClasses = $('.btn-badgeSort.active').map(function() {
                return $(this).data('class');
            }).get();

            $('.card').addClass('filtered');

            $('.card').each(function() {
                var cardClasses = $(this).data('class').split(" ");
                if (filterClasses.every(val => cardClasses.indexOf(val) >= 0)) {
                    $(this).removeClass('filtered');
                }
            });

            if ($('.btn-badgeSort.active').length === 0) {
                $('.btn-badgeSort[data-class="all"]').addClass('active');
            }
        }

        updateCards();
    });

    function updateCards() {
        $('.card').hide();
        $('.card').each(function() {
            if (!$(this).hasClass('filtered') && !$(this).hasClass('unmatched')) {
                $(this).show();
            }
        });
        if ($('.card:hidden').length === $('.card').length) {
            $('.cardSection__notFound').show();
        } else {
            $('.cardSection__notFound').hide();
        }
    }

    function clearSearch() {
        $(".searchSection input").val('');
        $(".card").removeClass('unmatched').removeClass('filtered');
        $('.btn-badgeSort').removeClass('active');
        $('.btn-badgeSort[data-class="all"]').text('すべて').addClass('active');
        $(".searchClearSection").css("display", "none");
        updateCards();
    }

    $(".btn-searchClear").on("click", clearSearch);

});