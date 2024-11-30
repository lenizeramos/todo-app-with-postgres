$(function () {
    var postData = function (url, method, data) {
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
    $("#todo-add-button").on("click", function () {
        var _a;
        var description = (_a = $("#new-todo-input").val()) === null || _a === void 0 ? void 0 : _a.toString().trim();
        if (description) {
            postData("/", "POST", { description: description, completed: false });
        }
        else {
            $("#error-message")
                .removeClass("d-none")
                .html("Please enter a todo description!");
        }
    });
    $(".todo-delete-button").on("click", function (e) {
        var target = $(e.currentTarget);
        var id = target.data("id");
        postData("/".concat(id), "DELETE");
    });
    $(".todo-edit-button").on("click", function () {
        var parentLi = $(this).closest("li");
        parentLi.find(".todo-edit-form").removeClass("d-none");
        parentLi.find(".todo-content").addClass("d-none");
        parentLi.find(".todo-content").removeClass("d-flex");
    });
    $(".todo-save-button").on("click", function (e) {
        var _a;
        var target = $(e.currentTarget);
        var todoItem = target.closest("li");
        var id = target.data("id");
        var description = (_a = todoItem
            .find(".edit-description-input")
            .val()) === null || _a === void 0 ? void 0 : _a.toString().trim();
        var completed = todoItem.find(".todo-toggle").is(":checked");
        if (description) {
            postData("/".concat(id), "PUT", { description: description, completed: completed });
        }
        else {
            $("#error-message")
                .removeClass("d-none")
                .html("Todo description cannot be empty!");
        }
    });
    $(".todo-toggle").on("change", function (e) {
        var target = $(e.currentTarget);
        var todoItem = target.closest("li");
        var id = target.data("id");
        var text = todoItem.find(".todo-description");
        var completed = target.is(":checked");
        if (completed) {
            text.addClass("todo-completed");
        }
        else {
            text.removeClass("todo-completed");
        }
        var description = text.text().trim();
        postData("/".concat(id), "PUT", { description: description, completed: completed });
    });
});
