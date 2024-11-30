$(() => {
  const postData = (url: string, method: string, data?: any) => {
    $.ajax({
      url: url,
      method: method,
      contentType: "application/json",
      data: JSON.stringify(data),
      success: function () {
        window.location.reload();
      },
      error: function (xhr, status, error) {
        console.log("Error: ", status, error, xhr.responseText);
      },
    });
  };

  $("#todo-add-button").on("click", () => {
    const description = $("#new-todo-input").val()?.toString().trim();
    if (description) {
      postData(`/`, "POST", { description, completed: false });
    } else {
      $("#error-message")
        .removeClass("d-none")
        .html("Please enter a todo description!");
    }
  });

  $(".todo-delete-button").on("click", (e) => {
    const target = $(e.currentTarget);
    const id = target.data("id") as number;

    postData(`/${id}`, "DELETE");
  });

  $(".todo-edit-button").on("click", function () {
    const parentLi = $(this).closest("li");

    parentLi.find(".todo-edit-form").removeClass("d-none");
    parentLi.find(".todo-content").addClass("d-none");
    parentLi.find(".todo-content").removeClass("d-flex");
  });

  $(".todo-save-button").on("click", (e) => {
    const target = $(e.currentTarget);
    const todoItem = target.closest("li");
    const id = target.data("id") as number;
    const description = todoItem
      .find(".edit-description-input")
      .val()
      ?.toString()
      .trim();
    const completed = todoItem.find(".todo-toggle").is(":checked");

    if (description) {
      postData(`/${id}`, "PUT", { description, completed });
    } else {
      $("#error-message")
        .removeClass("d-none")
        .html("Todo description cannot be empty!");
    }
  });

  $(".todo-toggle").on("change", (e) => {
    const target = $(e.currentTarget);
    const todoItem = target.closest("li");
    const id = target.data("id") as number;
    const text = todoItem.find(".todo-description");

    const completed = target.is(":checked");
    if (completed) {
      text.addClass("todo-completed");
    } else {
      text.removeClass("todo-completed");
    }

    const description = text.text().trim();
    postData(`/${id}`, "PUT", { description, completed });
  });
});
