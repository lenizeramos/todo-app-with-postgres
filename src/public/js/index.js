$(function () {
    var postData = function (url, method, data) {
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
    $("#todo-add-button").on("click", function () {
        var _a;
        var description = (_a = $("#new-todo-input").val()) === null || _a === void 0 ? void 0 : _a.toString().trim();
        if (description) {
            postData("/", "POST", { description: description, completed: false });
        }
        else {
            alert("Please enter a todo description!");
        }
    });
    $(".delete-button").on("click", function (e) {
        var target = $(e.currentTarget);
        var id = target.data("id");
        postData("/".concat(id), "DELETE");
    });
    $(".update-button").on("click", function () {
        var parentLi = $(this).closest("li");
        $(".edit-form").addClass("d-none");
        $(".action-buttons").show();
        parentLi.find(".edit-form").removeClass("d-none");
        parentLi.find(".action-buttons").hide();
    });
    $(".save-button").on("click", function (e) {
        var _a;
        var target = $(e.currentTarget);
        var todoItem = target.closest("li");
        var id = target.data("id");
        var description = (_a = todoItem.find(".edit-input").val()) === null || _a === void 0 ? void 0 : _a.toString().trim();
        var completed = todoItem.find(".toggle-complete").is(":checked");
        if (description) {
            postData("/".concat(id), "PUT", { description: description, completed: completed });
        }
        else {
            alert("Description cannot be empty!");
        }
    });
    $(".toggle-complete").on("change", function (e) {
        var target = $(e.currentTarget);
        var todoItem = target.closest("li");
        var id = target.data("id");
        var text = todoItem.find(".todo-text");
        var completed = target.is(":checked");
        if (completed) {
            text.addClass("checked");
        }
        else {
            text.removeClass("checked");
        }
        var description = text.text().trim();
        postData("/".concat(id), "PUT", { description: description, completed: completed });
    });
});
