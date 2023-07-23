$.get("./include/header.html", function(data) {
    $('#getHeader').html(data);
    header();
});
$('#getFooter').load('./include/footer.html', function() {
    footer();
});