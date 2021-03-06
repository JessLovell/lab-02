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

  const $template = $('#photo-template').html();
  const source = Handlebars.compile($template);
  return source(this);
}

ImageConstructor.readJson = (file) => {
  $.get(file, 'json')
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
  ImageConstructor.allImages.forEach(image => $('#photo').append(image.render()));
}

$(() => ImageConstructor.readJson('data/page-1.json'));


const keywordExtractor = () => {
  ImageConstructor.allImages.forEach(element => {
    console.log(element.keyword);
    if(ImageConstructor.allKeywords.indexOf(element.keyword) === -1){
      ImageConstructor.allKeywords.push(element.keyword);
    }
    ImageConstructor.allKeywords.sort();
  })
}

const populateDropDownMenu = () => {
  ImageConstructor.allKeywords.forEach(element =>{
    $('select').append(`<option value="${element}">${element}</option>`);
  })
}

$('select').on('change', () =>{
  let $input = $('select').val();
  ImageConstructor.allKeywords.forEach((element) =>{
    if($input === element){
      $(`.${element}`).show();
    }else if($input === 'default'){
      ImageConstructor.allKeywords.forEach((element) => {
        $(`.${element}`).show();
      })
    }else{
      $(`.${element}`).hide();
    }
  }
  )

})
$('#page-buttons').on('click', (event) =>{
  let $pageMatch = $(event.target).attr('id');
  if($pageMatch === 'page-2'){

    $('#photo').html('');
    $('select').html('');
    ImageConstructor.allImages = [];
    ImageConstructor.allKeywords = [];
    ImageConstructor.readJson('data/page-2.json');
  }else{
    $('#photo').html('');
    $('select').html('');
    ImageConstructor.allImages = [];
    ImageConstructor.allKeywords = [];
    ImageConstructor.readJson('data/page-1.json');
  }

})

