$(() => {
  const postData = (url: string, method: string, data?: any) => {
    $.ajax({
      url: url,
      method: method,
      contentType: "application/json",
      data: JSON.stringify(data),
      success: function (response) {
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
      alert("Please enter a todo description!");
    }
  });

  $(".delete-button").on("click", (e) => {
    const target = $(e.currentTarget);
    const id = target.data("id") as number;

    postData(`/${id}`, "DELETE");
  });

  $(".update-button").on("click", function () {
    const parentLi = $(this).closest("li");

    $(".edit-form").addClass("d-none");
    $(".action-buttons").show();

    parentLi.find(".edit-form").removeClass("d-none");
    parentLi.find(".action-buttons").hide();
  });

  $(".save-button").on("click", (e) => {
    const target = $(e.currentTarget);
    const todoItem = target.closest("li");
    const id = target.data("id") as number;
    const description = todoItem.find(".edit-input").val()?.toString().trim();
    const completed = todoItem.find(".toggle-complete").is(":checked");

    if (description) {
      postData(`/${id}`, "PUT", { description, completed });
    } else {
      alert("Description cannot be empty!");
    }
  });

  $(".toggle-complete").on("change", (e) => {
    const target = $(e.currentTarget);
    const todoItem = target.closest("li");
    const id = target.data("id") as number;
    const text = todoItem.find(".todo-text");

    const completed = target.is(":checked");
    if (completed) {
      text.addClass("checked");
    } else {
      text.removeClass("checked");
    }

    const description = text.text().trim();
    postData(`/${id}`, "PUT", { description, completed });
  });
});
