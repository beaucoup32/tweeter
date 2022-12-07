/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(() => {

  const data = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png"
        ,
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd" },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    }
  ]

  
  const createTweetElement = (tweetData) => {

    let $tweet = $(`
      <article class="twt 1">
        <div class="divider">
          <header class="author">
            <img src=${tweetData.user.avatars}>
            <h3>${tweetData.user.name}</h3>
            <h3 class="tag">${tweetData.user.handle}</h3>
          </header>
          <p>${tweetData.content.text}</p>
          </div>
        <div>
          <footer>
            <p class="date">${tweetData.created_at}</p>
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

    for (let tweet of tweetArr) {
      
      const $tweet = createTweetElement(tweet);
      $('.new-tweet').prepend($tweet);
    }

    
  }
  
  renderTweets(data);

  const $form = $('.post-tweet');

  $form.on('submit', (event) => {
    event.preventDefault();

    const data = $form.serialize();
    $.post('/tweets', data, (response) => {

      console.log(data);
      // console.log(response);
    });

  })
})

