$(document).ready(function() {
  $(".list-filters").toggle();

  document.getElementsByTagName("html")[0].style.visibility = "visible";
});

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
  // Add table generated from JSON objects to DOM
  $('.l-table').html(buffer);
}


// create list of filters to apply
var filters = [];

// when user clicks tag within list item...
$( '.l-table' ).on( 'click', '.c-tag', function () {

  // if no filters are in use, show filter bar and hide all list items
  if ($('.list-filters').is(':hidden')) {
    $(".list-filters").toggle();
    $(".spacer-filters").toggle();
    $(".l-item").addClass('hide');
  }

  // set filter to tag clicked by user
  var filter = $(this).children('p').text()

  // check if filter is already applied
  if (filters.indexOf(filter.toLowerCase()) !== -1) {
    return false;
  } else {

    // add filter to array of filters
    filters.push( filter.toLowerCase() );

    // reveal each list item which matches an active filter
    $.each(filters, function(i, filteredItem) {
      $('.' + filteredItem).removeClass('hide');
    });

    // print filter to filter-list
    var buffer = '';
    buffer+='<li><span class="filter-label">';
    buffer+= filter;
    buffer+='</span><div class="close"></div></li>';
    $('.list-filters').children('ul').append(buffer);
  }

});

// when user clicks tag close button...
$( '.list-filters' ).on( 'click', '.close', function () {

  // captures value of tag to be closed
  var removeItem = $(this).siblings('.filter-label').text().toLowerCase();

  // destroy the tag the user closed
  $(this).parent().remove();

  // remove filter value from array of filters
  filters.splice( $.inArray(removeItem, filters), 1 );

  // hide all list items
  $(".l-item").addClass('hide');

  // reveal each list item which matches an active filter
  $.each(filters, function(i, filteredItem) {
    $('.' + filteredItem).removeClass('hide');
  });

  // if last active filter has been closed...
  if($('.list-filters > ul').children(':visible').length == 0) {
    // hide filter bar area, reveal spacer
    $('.list-filters').toggle();
    $('.spacer-filters').toggle();
    // reveal all list items
    $(".l-item").removeClass('hide');
  }
});

// when user clicks clear tags button...
$( '.list-filters' ).on( 'click', '.clear-filters', function () {
  // reset filter array
  filters = [];
  // hide filter bar area, reveal spacer
  $('.list-filters').toggle();
  $('.spacer-filters').toggle();
  //reveal all list items
  $(".l-item").removeClass('hide');
  // clear filters from filter list
  $( ".filter-label" ).parent().remove();
});
