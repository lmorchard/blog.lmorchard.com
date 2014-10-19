$('*[data-content-href]').each(function () {
  var el = $(this);
  $.get(el.attr('data-content-href'), function (data) {
    el.html(data);
  });
});
