/* global $ */

$(() => {
  "use strict";

  var $qanda = $(".js-q-and-a");

  const url = "http://localhost:8000/56164c18b4cff3ba5895b208";

  fetch(url).then((response) => {
    response.json().then((resp) => {
      if (!resp._embedded || !resp._embedded["hack:questions"] || !resp._embedded["hack:questions"].length) {
        throw new Error("Unable to find questions!");
      }

      let questions = resp._embedded["hack:questions"];

      $qanda.html(`
        <input name="question" id="post_question" class="post_question" value"" placeholder="Heb je een vraag?">
        <a href="submit" id="submit_question" alt="Submit">Submit</a>
      `);

      questions.forEach((q) => {
        if (!q._embedded || !q._embedded["hack:answers"] || !q._embedded["hack:answers"].length) {
          return; // skip, no answers yet for this question
        }

        let answers = q._embedded["hack:answers"].reduce((i, answer) => {
          return `${i} <li class="question--answer">${answer.answer}</li>`;
        }, "");

        $qanda.append(`
          <div class="question">
            <h4 class="question--title">${q.question}</h4>
            <div class="question--info">
              <span>on ${q.createdAt}</span>
              | <span>Upvotes: ${q.positive}</span>
            </div>
            <ul>${answers}</ul>
          </div>
        `);
      });

      $("body").on("click", "#submit_question", function (event) {
        event.preventDefault();

        $.post(url, { question: $("#post_question").val() }, function (data) {
          $("#post_question").remove();
          $("#submit_question").replaceWith("Hey dat is een super lekker vraag! Super dankjewel!");
        });
      });
    });
  }).catch((error) => $("#direct-naar-q-and-a, #vagren-link").remove());
});