$(document).ready(function () {
  // typing animation
  (function ($) {
    $.fn.writeText = function (content) {
      var contentArray = content.split(""),
        current = 0,
        elem = this;
      setInterval(function () {
        if (current < contentArray.length) {
          elem.text(elem.text() + contentArray[current++]);
        }
      }, 50);
    };
  })(jQuery);

  // input text for typing animation
  $("#holder").writeText("TECH + ELECTRONICS + SOFTWARE");

  // initialize wow.js
  new WOW().init();

  // Push the body and the nav over by 285px over
  var main = function () {
    $(".fa-bars").click(function () {
      $(".nav-screen").animate(
        {
          right: "0px"
        },
        200
      );

      $("body").animate(
        {
          right: "312px"
        },
        200
      );
    });

    // Then push them back */
    $(".fa-times").click(function () {
      $(".nav-screen").animate(
        {
          right: "-312px"
        },
        200
      );

      $("body").animate(
        {
          right: "0px"
        },
        200
      );
    });

    $(".nav-links a").click(function () {
      $(".nav-screen").animate(
        {
          right: "-312px"
        },
        500
      );

      $("body").animate(
        {
          right: "0px"
        },
        500
      );
    });
  };

  $(document).ready(main);

  // initiate full page scroll

  $("#fullpage").fullpage({
    scrollBar: true,
    responsiveWidth: 500,
    navigation: true,
    navigationTooltips: ["home", "about", "qualification", "portfolio", "contact", "connect"],
    anchors: ["home", "about", "qualification", "portfolio", "contact", "connect"],
    menu: "#myMenu",
    fitToSection: true,

    afterLoad: function (anchorLink, index) {
      var loadedSection = $(this);

      //using index
      if (index == 1) {
        /* add opacity to arrow */
        $(".fa-chevron-down").each(function () {
          $(this).css("opacity", "10");
        });
        $(".header-links a").each(function () {
          $(this).css("color", "white");
        });
        $(".header-links").css("background-color", "transparent");
      } else if (index != 1) {
        $(".header-links a").each(function () {
          $(this).css("color", "black");
        });
        $(".header-links").css("background-color", "white");
      }

      //using index
      if (index == 2) {
        /* animate skill bars */
        $(".skillbar").each(function () {
          $(this)
            .find(".skillbar-bar")
            .animate(
              {
                width: $(this).attr("data-percent")
              },
              500
            );
        });
      }
    }
  });

  // move section down one
  $(document).on("click", "#moveDown", function () {
    $.fn.fullpage.moveSectionDown();
  });

  // fullpage.js link navigation
  $(document).on("click", "#skills", function () {
    $.fn.fullpage.moveTo(2);
  });

  $(document).on("click", "#qualification", function () {
    $.fn.fullpage.moveTo(3);
  });

  $(document).on("click", "#portfolio", function () {
    $.fn.fullpage.moveTo(4);
  });

  $(document).on("click", "#contact", function () {
    $.fn.fullpage.moveTo(5);
  });

  $(document).on("click", "#connect", function () {
    $.fn.fullpage.moveTo(6);
  });

  $(document).on("click", "#home", function () {
    $.fn.fullpage.moveTo(1);
  });

  // smooth scrolling
  $(function () {
    $("a[href*=#]:not([href=#])").click(function () {
      if (
        location.pathname.replace(/^\//, "") ==
        this.pathname.replace(/^\//, "") &&
        location.hostname == this.hostname
      ) {
        var target = $(this.hash);
        target = target.length
          ? target
          : $("[name=" + this.hash.slice(1) + "]");
        if (target.length) {
          $("html,body").animate(
            {
              scrollTop: target.offset().top
            },
            800
          );
          return false;
        }
      }
    });
  });

  //ajax form
  $(function () {
    // Get the form.
    var form = $("#ajax-contact");
    // Get the messages div.
    var formMessages = $("#form-messages");

    // Set up an event listener for the contact form.
    $(form).submit(function (e) {
      // Stop the browser from submitting the form.
      e.preventDefault();

      $(formMessages).text(
        "Wait please, sending your message!"
      );

      var apiKey = '1477932a948ac179ca35c0462529d557';
      var endpoint = 'https://api.mailjet.com/v3.1/send';
      // Serialize the form data.
      var formData = $(form).serialize();

      var emailData = {
        Messages: [
          {
            From: {
              Email: "inghector1991@outlook.com",
              Name: "Hector Carreno"
            },
            To: [
              {
                Email: 'inghector1991@outlook.com'
              }
            ],
            Subject: 'ContactMe - HC Tech development | My Web site',
            HTMLPart: '<html><body><h1>Hello, recipient!</h1><p>This is the body of the email.</p><p>Name: ' + "Name" + '</p><p>Email: ' + "formData.Email" + '</p><p>Message: ' + "formData.Messages" + '</p></body></html>'
          }
        ]
      };

      // fetch(endpoint, {
      //   method: 'POST',
      //   headers: {
      //     'Authorization': 'Basic ' + apiKey,
      //     'Content-Type': 'application/json'
      //   },
      //   body: JSON.stringify(emailData)
      // })
      //   .then(function (response) {
      //     if (response.ok) {
      //       // Make sure that the formMessages div has the 'success' class.
      //       $(formMessages).addClass("success");
      //       $(formMessages).removeClass("error");

      //       // Set the message text.
      //       $(formMessages).text(
      //         "Message sent!"
      //       );

      //       // Clear the form.
      //       $("#name").val("");
      //       $("#email").val("");
      //       $("#message").val("");

      //     } else {
      //       // Make sure that the formMessages div has the 'error' class.
      //       $(formMessages).removeClass("success");
      //       $(formMessages).addClass("error");

      //       $(formMessages).text(
      //         "Oops! An error occured and your message could not be sent. (" + response.response + ")"
      //       );
      //     }
      //   })
      //   .catch(function (error) {
      //     $(formMessages).text(
      //       "Oops! A crash has occured and your message could not be sent. (" + error.response + ")"
      //     );
      //   });

      // Serialize the form data.
      var formData = $(form).serialize();

      // Submit the form using AJAX.
      $.ajax({
        type: "POST",
        url: endpoint,
        data: emailData,
        headers: {
          'Authorization': 'Basic ' + apiKey,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(emailData)
      })
        .done(function (response) {
          // Make sure that the formMessages div has the 'success' class.
          $(formMessages).removeClass("error");
          $(formMessages).addClass("success");

          // Set the message text.
          $(formMessages).text(response);

          // Clear the form.
          $("#name").val("");
          $("#email").val("");
          $("#message").val("");
          // Send the email
          // sendEmail(formData);  
        })
        .fail(function (data) {
          // Make sure that the formMessages div has the 'error' class.
          $(formMessages).removeClass("success");
          $(formMessages).addClass("error");

          $(formMessages).text(
            "Oops! An error occured and your message could not be sent."
          );

          // Set the message text.
          // if (data.responseText != "") {
          //   $(formMessages).text(data.responseText);
          // } else {
          //   $(formMessages).text(
          //     "Oops! An error occured and your message could not be sent."
          //   );
          // }
        });
    });
  });
});