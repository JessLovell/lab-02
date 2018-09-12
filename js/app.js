'use strict'

function ImageConstructor(imageObject){
  this.title = imageObject.title;
  this.description = imageObject.description;
  this.keyword = imageObject.keyword;
  this.numberOfHorns = imageObject.horns;
  this.imageUrl = imageObject.image_url;
}

ImageConstructor.allImages = [];
ImageConstructor.allKeywords = [];

ImageConstructor.prototype.render = function(){
  $('main').append('<section class = "clone"></section');
  const $imageClone = $('section[class = "clone"]');
  const $imageHtml = $('#photo-template').html();

  $imageClone.html($imageHtml);

  $imageClone.find('h2').text(this.title);
  $imageClone.find('img').attr('src', this.imageUrl);
  $imageClone.find('p').text(this.description);
  $imageClone.removeClass('clone');
  $imageClone.addClass(this.keyword);
}

ImageConstructor.readJson = () => {
  $.get('data/page-1.json', 'json')
    .then(data => {
      data.forEach(image => {
        ImageConstructor.allImages.push( new ImageConstructor(image));
      })
    })
    .then( ImageConstructor.loadImages)
    .then(keywordExtractor)
    .then(populateDropDownMenu)
}
ImageConstructor.loadImages = () => {
  ImageConstructor.allImages.forEach(image => image.render());
}

$(() => ImageConstructor.readJson());


const keywordExtractor = () => {
  ImageConstructor.allImages.forEach(element => {
    console.log(element.keyword);
    if(ImageConstructor.allKeywords.indexOf(element.keyword) === -1){
      ImageConstructor.allKeywords.push(element.keyword);
    }
  })
}

const populateDropDownMenu = () => {
  ImageConstructor.allKeywords.forEach(element =>{
    $('select').append(`<option value="${element}">${element}</option>`);
  })
}

$('select').on('change', () =>{
  console.log('anything');
  let $input = $('select').val();
  console.log($input);
  let imageClass = `${$input}`;
  console.log(imageClass);
  ImageConstructor.allKeywords.forEach((element) =>{
    if($input === element){
      $(`.${element}`).show();
      console.log('if shows');
    }else{
      $(`.${element}`).hide();
      console.log('if hides');
    }
    console.log('all the way through');
  }
  )

})

console.log(ImageConstructor.allKeywords);
