'use strict'

function ImageConstructor(imageObject){
  this.title = imageObject.title;
  this.description = imageObject.description;
  this.keyword = imageObject.keyword;
  this.numberOfHorns = imageObject.horns;
  this.imageUrl = imageObject.image_url;
}

ImageConstructor.allImages = [];

ImageConstructor.prototype.render = function(){
  $('main').append('<section class = "clone"></section');
  const $imageClone = $('section[class = "clone"]');
  const $imageHtml = $('#photo-template').html();

  $imageClone.html($imageHtml);

  $imageClone.find('h2').text(this.title);
  $imageClone.find('img').attr('src', this.imageUrl);
  $imageClone.find('p').text(this.description);
  $imageClone.removeClass('clone');
  $imageClone.addClass(this.title);
}


ImageConstructor.readJson = () => {
  $.get('data/page-1.json', 'json')
    .then(data => {
      data.forEach(image => {
        ImageConstructor.allImages.push( new ImageConstructor(image));
      })
    })
    .then( ImageConstructor.loadImages)
}

ImageConstructor.loadImages = () => {
  ImageConstructor.allImages.forEach(image => image.render());
}

$(() => ImageConstructor.readJson());
