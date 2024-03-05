var comments = [];
var message = document.querySelector("#message");
var submitButton = document.querySelector("#submitButton");
var commentsDisplay = document.querySelector("#commentList");

function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
}

function displayComments(listOfComments) {
  commentsDisplay.innerHTML = "";
  for (var i = 0; i < listOfComments.length; i++) {
    var listItem = document.createElement("li");
    var commentContent = document.createElement("div");
    var closeIcon = document.createElement("i");
    closeIcon.classList.add("fa-solid", "fa-xmark", "close-button");
    closeIcon.dataset.commentId = listOfComments[i].id;

    var textContents = document.createElement("div");
    textContents.textContent =
      "ID: " +
      listOfComments[i].id +
      ", Email: " +
      listOfComments[i].email +
      ", Text: " +
      listOfComments[i].text +
      " ";

    textContents.classList.add("same-row");
    var imageContent = document.createElement("div");
    imageContent.innerHTML = listOfComments[i].image;
    imageContent.classList.add("same-row");

    commentContent.appendChild(textContents);
    commentContent.appendChild(imageContent);
    listItem.appendChild(commentContent);
    commentContent.appendChild(closeIcon);
    commentsDisplay.appendChild(listItem);

    closeIcon.addEventListener("click", function (event) {
      var icon = event.target;
      var commentId = icon.dataset.commentId;
      comments = comments.filter(function (comment) {
        return comment.id !== commentId;
      });
      displayComments(comments);
    });
  }
}

function isEdited(field) {
  field.addEventListener("input", function () {
    field.classList.remove("invalid");
  });
}

isEdited(message);

submitButton.addEventListener("click", function (event) {
  event.preventDefault();

  if (message.value.trim() === "") {
    message.classList.add("invalid");
    return;
  }

  if (message.validity.valid) {
    const newComment = {
      id: generateId(),
      email: "email@email.com",
      image:
        "<img src='https://t1.gstatic.com/licensed-image?q=tbn:ANd9GcTVNBVgDTZrFvUARECMzBrur7L34aGgMgeqrY3JE6rWUauX3cRgAjXim93D7cn2UTQM'>",
      text: message.value.trim(),
    };
    comments.push(newComment);
    displayComments(comments);
    message.value = "";
  }
});
