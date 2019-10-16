$(() => {
  const handleData = newsResults => {

    const $h1 = $("<h1>");
    $h1.text("Articles");
    $("#articleList").append($h1);

    //Loop through
    for (let i = 0; i < newsResults.articles.length - 1; i++) {

      // If first time on page load, display the first news article returned
      if (i == 0) {
        loadArticle(newsResults.articles[0]);
      }
      const $div = $("<div>");
      //Setup title of news article
      const $p = $("<h5>");
      $p.text(newsResults.articles[i].title);
      $p.attr("id", "article");
      $p.addClass("article");
      // $p.css("hover", "red");
      $("#articleList").append($p);

      //Setup content of news article
      const $p1 = $("<p>");
      $p1.addClass("hideMe");
      $p1.text(newsResults.articles[i].content);
      $p.append($p1);

      //Setup description of news article
      const $p2 = $("<p>");
      $p2.addClass("hideMe");
      $p2.text(newsResults.articles[i].description);
      $p.append($p2);
      //Setup image of news article
      const $p3 = $("<p>");
      $p3.addClass("hideMe");
      $p3.text(newsResults.articles[i].urlToImage);
      $p.append($p3);
      $(".parentContainer").append($div);
    }
  };
  //

  const loadArticle = firstArticle => {
    $("#content").text("");
    let $p = $("<p>");
    $p.text(firstArticle.description);
    $p.attr("id", "contentDetail");
    $p.addClass("contentDetail");
    $("#content").append($p);
    //add the content
    let $p1 = $("<p>");
    $p1.text(firstArticle.content);
    $p1.attr("id", "contentDetail");
    $p1.addClass("contentDetail");
    $("#content").append($p1);
    $("#articleImage").text("");
    let $img = $("<img>");
    $img.attr("src", firstArticle.urlToImage);
    $img.attr("alt", "image");
    $img.attr("style", "width:400px;height:300px");
    $("#articleImage").append($img);
  };

  ///////////////////////////////////////////////////////////
  //   Reset page back to headlines                         /
  ///////////////////////////////////////////////////////////
  $("#leftNav").on("click", "#link1", event => {
    location.reload();
  });

  ///////////////////////////////////////////////////////////
  //   setup the article on click                           /
  ///////////////////////////////////////////////////////////
  $("#articleList").on("click", ".article", event => {
    let $target = $(event.currentTarget);

    let $content = $target.children().eq(0)[0].innerHTML;
    let $description = $target.children().eq(1)[0].innerHTML;
    let $image = $target.children().eq(2)[0].innerHTML;

    $("#content").text("");
    let $p = $("<p>");
    $p.text($description);
    $p.attr("id", "contentDetail");
    $p.addClass("contentDetail");
    $("#content").append($p);

    //add the content
    let $p1 = $("<p>");
    $p1.text($content);
    $p1.attr("id", "contentDetail");
    $p1.addClass("contentDetail");
    $("#content").append($p1);

    $("#articleImage").text("");
    let $img = $("<img>");
    $img.attr("src", $image);
    $img.attr("alt", "image");
    $img.attr("style", "width:400px;height:300px");
    $("#articleImage").append($img);
  });

   ///////////////////////////////////////////////////////////
  //   Handle search field                                  /
  ///////////////////////////////////////////////////////////
  $("form").on("submit", event => {
    event.preventDefault();

    //Clearn contents 
    $("#articleList").text("");
    $("#content").text("");

    searchValue =  $(".search").val();
    let endpoint = `https://newsapi.org/v2/everything?q=${searchValue}&apiKey=8a8d89a8254e42609470f3760d59751d`;
    $(event.currentTarget).trigger("reset");
    $.ajax({url: endpoint}).then(handleData);

  });


  let endpoint = `https://newsapi.org/v2/top-headlines?country=us&apiKey=8a8d89a8254e42609470f3760d59751d`;
  $.ajax({url: endpoint}).then(handleData);
  // $(event.currentTarget).trigger("reset");

  //dont write below
});
