/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
const createTweetElement = (tweetData) => {

  // prevent tags being read by input
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
          <h3>${escape(tweetData.user.name)}</h3>
          <h3 class="tag">${escape(tweetData.user.handle)}</h3>
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
};

const renderTweets = (tweetArr) => {

  //clear tweet section
  $(".new-tweet").empty();

  for (let tweet of tweetArr) {
    const $tweet = createTweetElement(tweet);
    $(".new-tweet").prepend($tweet);
  }
};

const loadtweets = () => {
  $.getJSON("/tweets", (data) => {
    renderTweets(data);
  });
};

$(() => {
  const $error = $(".error");

  $error.hide();
  loadtweets();

  $(".post-tweet").on("submit", (event) => {
    event.preventDefault();

    const data = $(".post-tweet").serialize();
    const input = $("#tweet-text").val()

    if (!input) {
      
      $(".err").text("Error: Please type at least 1 character.");

      return $error.slideDown();
    }

    if (input.length > 140) {

      $(".err").text(`Error: Maximum 140 characters (${input.length})`);
      return $error.slideDown();
    }

    $.post("/tweets", data, (response) => {

      $("#tweet-text").val("");
      $(".counter").val("140");
      loadtweets();
    });

    $error.slideUp();
  });

  $('.write').on('click', (event) => {

    event.preventDefault()
    $('.tweet-container').slideToggle();
    $('#tweet-text').focus();
  })
});
