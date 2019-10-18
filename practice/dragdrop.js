function drag(ev) {
  ev.dataTransfer.setData("text", ev.target.id);
}

function allowDrop(ev) {
  ev.preventDefault();
}

//Take the article and store it in locatl storage location
function drop(ev) {
  ev.preventDefault();
  var data = ev.dataTransfer.getData("text");

  let title = document.getElementById(data).innerHTML;
  var res = title.substring(0, 15);
  const $favItem = $("<li>");
  $favItem.append(res);
  $favItem.attr("id", res);
  $favItem.attr("draggable", "true");
  $favItem.attr("ondragstart", "drag(event)");
  $favList.append($favItem);

  objContent = $("#content").eq(0)[0].innerHTML;
  console.log("function drop 0", $("#content").eq(0)[0]);
  objFirst = $("#content")
    .first()
    .text();
  //   objLast = $("#content")
  //     .first()
  //     .text();

  //   console.log("objFirst", objFirst);
  console.log("objContent", objContent);
  $p = $("<p>");
  var obj = {
    title: res,
    content1: objContent,
    image: $("#imageID").eq(0)[0].src
  };

  let myJSON = JSON.stringify(obj);
  localStorage.setItem(res, myJSON);
}

///////////////////////////////////////////////////////////
// remove a favorate
///////////////////////////////////////////////////////////
function dropRemove(ev) {
  ev.preventDefault();

  var data = ev.dataTransfer.getData("text");
  document.getElementById(data).remove();
  localStorage.removeItem(data);
}
