function drag(ev) {
  //   console.log("fred drag ev", ev);
  ev.dataTransfer.setData("text", ev.target.id);
}

function allowDrop(ev) {
  //   console.log("fred allowDrop ev", ev);
  ev.preventDefault();
}

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
  //   console.log("ev drop2  ", data);
  document.getElementById(data).remove();
  localStorage.removeItem(data);
}
