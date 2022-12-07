

$(document).ready(function() {

  let counter = $('.counter');
  let textBox = $('#tweet-text');
  
  textBox.on('input', function() {
    
    let charLimit = 140;
    let input = (this.value).length;
    
    charLimit -= input;
    
    counter.text(charLimit);
    
    // console.log((this.value).length);
    
    if (input > 140) {
      if (!counter.hasClass('max-char-limit')){

        counter.toggleClass('max-char-limit');
      }
    } 

    if (input <= 140) {
      if (counter.hasClass('max-char-limit')){

        counter.toggleClass('max-char-limit');
      }
    } 
    // console.log(counter);
  })


});

