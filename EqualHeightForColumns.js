//Не подходит при flex-box
function setEqualHeight(columns) {
    var tallestcolumn = 0;
    columns.each(
        function() {
            currentHeight = $(this).outerHeight();
            if (currentHeight > tallestcolumn) {
                tallestcolumn = currentHeight;
            }
        }
    );
    columns.outerHeight(tallestcolumn);
}
setEqualHeight($(".card-box-wrap"));



$(document).ready(function() {
    setEqualHeight($(".card-box-wrap"));
});
