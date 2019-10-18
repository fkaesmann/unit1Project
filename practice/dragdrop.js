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
  //   ev.target.appendChild(document.getElementById(data));
  let title = document.getElementById(data).innerHTML;
  var res = title.substring(0, 15);
  const $favItem = $("<li>");
  $favItem.append(res);
  $favList.append($favItem);

  objContent = $("#content").eq(0)[0].innerHTML;

  var obj = {
    title: res,
    content1: objContent,
    image: $("#imageID").eq(0)[0].src
  };

  console.log("obj.title ", obj.title);
  console.log("obj.content1 ", obj.content1);
  console.log("obj.image ", obj.image);

  let myJSON = JSON.stringify(obj);
  localStorage.setItem(res, myJSON);
}
