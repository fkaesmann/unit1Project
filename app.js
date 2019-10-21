$(() => {
  ///////////////////////////////////////////////////////////
  //   Fred Kaesmann                                        /
  //   Oct. 2019                                            /
  //   unit1Project1                                        /
  //   news.api aggregation site                            /
  ///////////////////////////////////////////////////////////

  imageFlip = 0;
  selectedText = "";
  $favList = $("<ul>");
  $favList.addClass("divFavorate");

  $("#div1").append($favList);

  ///////////////////////////////////////////////////////////
  //load local storage into favorates (if there)
  ///////////////////////////////////////////////////////////
  if (localStorage.length > 0) {
    for (var i = 0; i < localStorage.length; i++) {
      let favString = localStorage.getItem(localStorage.key(i));
      var obj = JSON.parse(favString);
      const $favItem = $("<li>");
      $favItem.append(obj.title);
      $favItem.attr("id", obj.title);
      $favItem.attr("draggable", "true");
      $favItem.attr("ondragstart", "drag(event)");
      $favList.append($favItem);
    }
  }

  const handleData = newsResults => {
    const $h1 = $("<h1>");
    $h1.text("Articles");
    $("#articleList").append($h1);

    //Loop through returned articles from the API
    //Hide all the details in hidden paragraphs
    for (let i = 0; i < newsResults.articles.length - 1; i++) {
      // If first time on page load, display the first news article
      if (i == 0) {
        loadArticle(newsResults.articles[0]);
      }

      //Setup title of news article
      const $div = $("<div>");
      const $p = $("<h5>");

      //Setup title of news article
      $p.text(newsResults.articles[i].title);
      $p.attr("id", "article" + i);
      $p.attr("draggable", "true");
      $p.attr("ondragstart", "drag(event)");
      $p.addClass("article");
      $("#articleList").append($p);

      //Setup content of news article
      const $p1 = $("<p>");
      $p1.addClass("hideMe");
      $p1.attr("id", "contentDetail");
      $p1.text(newsResults.articles[i].content);
      $p.append($p1);

      //Setup description of news article
      const $p2 = $("<p>");
      $p2.addClass("hideMe");
      $p2.attr("id", "contentDetail2");
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
  $("img").on("error", function() {
    $(this).attr("src", "./missing.jpeg");
  });

  //When loading the page, setup the first article content and image
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

    //setup image
    let $img = $("<img>");
    $img.attr("src", firstArticle.urlToImage);
    $img.attr("id", "imageID");
    $img.attr("alt", "image");
    $img.attr("style", "width:400px;height:300px");
    $("#articleImage").append($img);

    //setup for Print option in hidden <div>
    $("#hideForPrint").text("");
    let $pPrint = $("<p>");
    $pPrint.text(firstArticle.description);
    $pPrint.addClass("contentDetail");
    $("#hideForPrint").append($pPrint);

    let $pPrint1 = $("<p>");
    $pPrint1.text(firstArticle.content);
    $pPrint1.addClass("contentDetail");
    $("#hideForPrint").append($pPrint1);

    let $img1 = $("<img>");
    $img1.attr("src", firstArticle.urlToImage);
    $img1.attr("style", "width:400px;height:300px");
    $("#hideForPrint").append($img1);
  };

  ///////////////////////////////////////////////////////////
  //   Reset page back to headlines                         /
  ///////////////////////////////////////////////////////////
  $("#leftNav").on("click", "#link1", event => {
    location.reload();
  });

  ///////////////////////////////////////////////////////////
  //   Reset page back to headlines                         /
  ///////////////////////////////////////////////////////////
  $("#articleImage").on("click", event => {
    let $target = $(event.currentTarget);
    if (imageFlip == 0) {
      imageFlip = 1;
      $target.css("transform", "scaleX(-1)");
    } else {
      imageFlip = 0;
      $target.css("transform", "scaleX(+1)");
    }
  });

  ///////////////////////////////////////////////////////////
  //   setup the article on clicked article                 /
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
    $img.attr("id", "imageID");
    $img.attr("alt", "image");
    $img.attr("style", "width:400px;height:300px");
    $("#articleImage").append($img);

    //setup for Print option
    $("#hideForPrint").text("");
    let $pPrint = $("<p>");
    $pPrint.text($description);
    $pPrint.addClass("contentDetail");
    $("#hideForPrint").append($pPrint);

    let $pPrint1 = $("<p>");
    $pPrint1.text($content);
    $pPrint1.addClass("contentDetail");
    $("#hideForPrint").append($pPrint1);

    let $img1 = $("<img>");
    $img1.attr("src", $image);
    $img1.attr("style", "width:400px;height:300px");
    $("#hideForPrint").append($img1);
  });

  ///////////////////////////////////////////////////////////
  //   Handle search field                                  /
  ///////////////////////////////////////////////////////////
  $("form").on("submit", event => {
    event.preventDefault();

    //Clean contents
    $("#articleList").text("");
    $("#content").text("");

    searchValue = $(".search").val();
    let endpoint = `https://newsapi.org/v2/everything?q=${searchValue}&apiKey=8a8d89a8254e42609470f3760d59751d`;
    $(event.currentTarget).trigger("reset");
    $.ajax({url: endpoint}).then(handleData);
  });

  ///////////////////////////////////////////////////////////
  //   Handle the print command (display hidden <div>)      /
  ///////////////////////////////////////////////////////////
  $("#leftNav").on("click", "#printPage", event => {
    window.print();
  });

  ///////////////////////////////////////////////////////////
  // Handle searching on the selected text after double click  /
  ///////////////////////////////////////////////////////////
  function getSelectionText() {
    var text = "";
    var activeEl = document.activeElement;
    var activeElTagName = activeEl ? activeEl.tagName.toLowerCase() : null;
    if (
      activeElTagName == "textarea" ||
      (activeElTagName == "input" &&
        /^(?:text|search|password|tel|url)$/i.test(activeEl.type) &&
        typeof activeEl.selectionStart == "number")
    ) {
      text = activeEl.value.slice(
        activeEl.selectionStart,
        activeEl.selectionEnd
      );
    } else if (window.getSelection) {
      text = window.getSelection().toString();
    }
    return text;
  }

  document.onmouseup = document.onkeyup = document.onselectionchange = function() {
    selectedText = getSelectionText();

    if (selectedText !== "") {
      //Clearn contents
      $("#articleList").text("");
      $("#content").text("");
      let endpoint = `https://newsapi.org/v2/everything?q=${selectedText}&apiKey=8a8d89a8254e42609470f3760d59751d`;
      selectedText = "";
      $.ajax({url: endpoint}).then(handleData);
    }
    //End of double click on text
  };

  //On click of the Favorates, disply object
  $("#div1").on("click", "ul > li", event => {
    let $target = $(event.currentTarget);
    // console.log("fav clic title", $target. eq(0)[0].innerHTML);
    let title = $target.eq(0)[0].innerHTML;
    let pulled = localStorage.getItem(title);

    var obj = JSON.parse(pulled);

    // $("#content").text(obj.content1);
    $("#content").html(obj.content1);
    $("img").attr("src", obj.image);
  });

  let endpoint = `https://newsapi.org/v2/top-headlines?country=us&apiKey=8a8d89a8254e42609470f3760d59751d`;
  $.ajax({url: endpoint}).then(handleData);
  // $(event.currentTarget).trigger("reset");
  //dont write below
});
