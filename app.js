$(() => {
  let inputLimit = 0;

  const handleData = newsResults => {
    //code goes here
    // const $ul = $("<ul>");
    // $ul.appendTo(".parentContainer");

    console.log("in handleData");
    // console.log("fred api", newsResults.totalResults);
  
    const $h1 = $("<h1>");
    $h1.text("Article List");
    $("#articleList").append($h1);

    //Loop through
    for (let i = 0; i < newsResults.articles.length - 1; i++) {
      const $div = $("<div>");
//Setup title of news article
      const $p = $("<h5>");
      $p.text(newsResults.articles[i].title);
      $p.attr("id", "article");
      $p.addClass("article");
      $("#articleList").append($p);
      //
      //Setup content of news article
      const $p1 = $("<p>");
      $p1.addClass("hideMe");
      $p1.text(newsResults.articles[i].content);
      $p.append($p1);

        //
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

      // console.log(newsResults.articles[i].title);
      // console.log(newsResults.articles[i].description);
      // console.log(newsResults.articles[i].urlToImage);
      // console.log(newsResults.articles[i].content);

      // $div1.text(trouble[i].complaint_type);
      // $div1.addClass("child1");
      // $($div).append($div1);
      // //
      // const $div2 = $("<div>");
      // $div2.text("What did the police do?");
      // $div2.addClass("child2");
      // $div2.attr("id", "row"); // for CSS styling
      // $($div).append($div2);

      // const $div3 = $("<div>");
      // $div3.text(trouble[i].resolution_description);
      // $div3.addClass("resolution");
      // $div3.attr("id", "res" + i);
      // $($div).append($div3);
      //   $div3.text(trouble[i].resolution_description);
      //   $div3.addClass("resolution");
      //   $div3.attr("id", "res" + i);
      //   $($div).append($div3);

      $(".parentContainer").append($div);
      // const $p = $("<p>");
      //   $p.text(trouble[i].resolution_description);
      //   $($li).append($p);
    }
  };
  //

  $("#articleList").on("click", ".article", event => {
    let $target = $(event.currentTarget);
     
    let $content = $target.children().eq(0)[0].innerHTML;
    let $description = $target.children().eq(1)[0].innerHTML;
    let $image = $target.children().eq(2)[0].innerHTML;
    console.log("Fred 1", $description)
    console.log("Fred 2 ", $content)
    console.log("Fred 3 ", $image)


    // $target.css("background-color", "rgb(255,255,255");
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
    $img.attr('src',$image);
    $img.attr('alt',"image");
    $img.attr('style',"width:400px;height:300px");
    $("#articleImage").append($img);

  });
  // event.preventDefault();
  console.log("in brooklyn");

  let endpoint = `https://newsapi.org/v2/top-headlines?country=us&apiKey=8a8d89a8254e42609470f3760d59751d`;
  $.ajax({url: endpoint}).then(handleData);
  // $(event.currentTarget).trigger("reset");

  // $(".brooklyn").on("click", event => {
  //   event.preventDefault();
  //   console.log("in brooklyn");
  //   inputLimit = $(".inputLimit").val();
  //   let endpoint = `https://newsapi.org/v2/top-headlines?country=us&apiKey=8a8d89a8254e42609470f3760d59751d`;
  //   $.ajax({url: endpoint}).then(handleData);
  //   $(event.currentTarget).trigger("reset");
  // });
  $(".manhattan").on("click", event => {
    event.preventDefault();
    console.log("in manhattan");
    inputLimit = $(".inputLimit").val();
    let endpoint = `https://data.cityofnewyork.us/resource/fhrw-4uyv.json?agency=NYPD&borough=MANHATTAN`;

    // console.log("fred ", $(".inputLimit".id));
    $.ajax({url: endpoint, data: {$limit: 10}}).then(handleData);
    $(event.currentTarget).trigger("reset");
  });
});
