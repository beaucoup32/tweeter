/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(() => {

  let $error = $('.error');
  $error.hide();
  
  const createTweetElement = (tweetData) => {
    // prevent tags being ready by input
    const escape = function (str) {
      let div = document.createElement("div");
      div.appendChild(document.createTextNode(str));
      return div.innerHTML;
    };

    let $tweet = $(`
      <article class="twt 1">
        <div class="divider">
          <header class="author">
            <img src=${tweetData.user.avatars}>
            <h3>${tweetData.user.name}</h3>
            <h3 class="tag">${tweetData.user.handle}</h3>
          </header>
          <p>${escape(tweetData.content.text)}</p>
          </div>
        <div>
          <footer>
            <p class="date">${timeago.format(tweetData.created_at)}</p>
            <div class="logos">
              <i class="fa-regular fa-flag fs-lg"></i>
              <i class="fa-solid fa-repeat"></i>
              <i class="fa-regular fa-heart"></i>
            </div>
          </footer>
        </div>
      </article>
      `);
    
    return $tweet;
  }

  const renderTweets = (tweetArr) => {

    //clear tweet section
    $('.new-tweet').empty();
    
    for (let tweet of tweetArr) {
      
      const $tweet = createTweetElement(tweet);
      $('.new-tweet').prepend($tweet);
    }
    
  }
  
  const loadtweets = () => {
    $.getJSON('/tweets', (data) => {
      renderTweets(data);
    })

  }

  

  loadtweets();


  const $form = $('.post-tweet');

  $form.on('submit', (event) => {
    event.preventDefault();

    const data = $form.serialize();

    const input = data.substring(5);

    if (!input) {

      $('.err').text('Error: Please type at least 1 character.');

      return $error.slideDown();
    }

    if (input.length > 140) {

      $('.err').text(`Error: Maximum 140 characters (${input.length})`);
      return $error.slideDown();
    }

    $.post('/tweets', data, (response) => {
      loadtweets();
    });

    let $input = $('#tweet-text');

    $error.slideUp();
    $input.val('');

  })
})

