$(function() {
  $.ajax({
    type : 'GET',
    url : 'scripts/data.json',
    async : false,
    beforeSend : function(){/*loading*/},
    dataType : 'json',
    success : function(result) {
      createList(result);
    }
  });
});

function createList(filteredList) {
  var buffer="";

  $.each(filteredList, function(index, val){

    buffer+='<div class="l-item ' + val.role.toLowerCase() + ' ' + val.level.toLowerCase() + ' ';
    for(var i=0; i < val.languages.length; i++){
      buffer+= val.languages[i].toLowerCase() + ' ';
    }
    for(var n=0; n < val.tools.length; n++){
      buffer+= val.tools[n].toLowerCase() + ' ';
    }
    buffer+='"><div class="c-card';
    if (val.featured == true) {
      buffer+= ' featured ';
    }
    buffer+='"><div class="l-item__detail">';
    buffer+= '<div class="l-item__logo"><img class="c-card__logo" src="' + val.logo + '" alt=""><\/div>';
    buffer+= '<div class="l-item__row row1"><h2 class="c-card__company">' + val.company + '<\/h2>';
    if (val.new == true) {
      buffer+= '<p class="c-card__new">New!<\/p>';
    }
    if (val.featured == true) {
      buffer+= '<p class="c-card__featured">Featured<\/p>';
    }
    buffer+= '<\/div>';
    buffer+= '<div class="l-item__row row2"><h1 class="c-card__position">' + val.position + '<\/h1><\/div>';
    buffer+= '<ul class="l-item__row row3 details">';
    buffer+= '<li class="c-card__postedAt"><p>' + val.postedAt + '<\/p><\/li>';
    buffer+= '<li class="c-card__contract"><p> ' + val.contract + '<\/p><\/li>';
    buffer+= '<li class="c-card__location"><p> ' + val.location + '<\/p><\/li>';
    buffer+= '<\/ul><\/div>';
    buffer+= '<div class="l-item__tags"><ul class="c-card__tags">';
    buffer+= '<li class="c-tag"><p>' + val.role + '</p></li>';
    buffer+= '<li class="c-tag"><p>' + val.level + '</p></li>';
    for(var c=0; c < val.languages.length; c++){
      buffer+= '<li class="c-tag"><p>' + val.languages[c] + '</p></li>';
    }
    for(var m=0; m < val.tools.length; m++){
      buffer+= '<li class="c-tag"><p>' + val.tools[m] + '</p></li>';
    }
    buffer+= '<\/ul><\/div><\/div><\/div>';
  });
  // Adds table generated from JSON objects to DOM
  $('.l-table').html(buffer);
}

var filters = [];

$( '.l-table' ).on( 'click', '.c-tag', function () {

  // if no filters are in use, show filter bar
  if ($('.list-filters').is(':hidden')) {
    $(".list-filters").toggle();
    $(".list-filters").html("<ul></ul>")
    $(".spacer-filters").toggle();
    $(".l-item").addClass('hide');
  }

  // add filter to list of filters
  var filter = $(this).children('p').text()

  filters.push( filter.toLowerCase() );

  $.each(filters, function(i, filteredItem) {
    $('.' + filteredItem).removeClass('hide');
  });

  // add filter tag to filter-list
  var buffer = '';

  buffer+='<li><span class="filter-label">';
  buffer+= filter;
  buffer+='</span><div class="close"></div></li>';

  $('.list-filters').children('ul').append(buffer);

});

$( '.list-filters' ).on( 'click', '.close', function () {

  var removeItem = $(this).siblings('.filter-label').text().toLowerCase();

  $(this).parent().toggle();

  filters.splice( $.inArray(removeItem, filters), 1 );

  // alert(filters);

  $(".l-item").addClass('hide');
  
  $.each(filters, function(i, filteredItem) {
    $('.' + filteredItem).removeClass('hide');
  });

  if($('.list-filters > ul').children(':visible').length == 0) {
    $('.list-filters').toggle();
    $('.list-filters').html('');
    $('.spacer-filters').toggle();
    $(".l-item").removeClass('hide');
  }
});
