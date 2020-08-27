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

// $(document).on('click', '.c-tag', function() {
//
//   $.ajax({
//     type : 'GET',
//     url : 'scripts/data.json',
//     async : false,
//     beforeSend : function(){/*loading*/},
//     dataType : 'json',
//     success : function(result) {
//       let filteredList = [];
//       for (let i = 0; i < cities.length; i++) {
//         if (cities[i].population > 3000000) {
//           bigCities.push(cities[i]);
//         }
//       }
//
//       createList(filteredList);
//     }
//   });
//
// });

function createList(filteredList) {
  var buffer="";

  $.each(filteredList, function(index, val){

    buffer+='<div class="l-item"><div class="c-card';
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
    for(var i=0; i < val.languages.length; i++){
      buffer+= '<li class="c-tag"><p>' + val.languages[i] + '</p></li>';
    }
    for(var n=0; n < val.tools.length; n++){
      buffer+= '<li class="c-tag"><p>' + val.tools[n] + '</p></li>';
    }
    buffer+= '<\/ul><\/div><\/div><\/div>';
  });
  // Adds table generated from JSON objects to DOM
  $('.l-table').html(buffer);
}
