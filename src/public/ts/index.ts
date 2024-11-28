/* $(() => {
    const postData = (url: string, method: string, data: any) => {
      $.ajax({
        url: url,
        method: method,
        contentType: "application/json",
        data: JSON.stringify(data),
        success: function (response) {
          console.log("Server Response: ", response);
          window.location.reload();
        },
        error: function (xhr, status, error) {
          console.log("Request failed. Status: " + status);
          console.log("Error: " + error);
          console.log("Response text: " + xhr.responseText);
        }
      });
    };
  
    const updateButtons = $(".update-button");
  
    updateButtons.on("click", (e: JQuery.ClickEvent) => {
      const target = $(e.currentTarget);
      const productId = target.data("product-id") as number;
      const quantity = target.closest("form").find("input[name='quantity']").val() as string;
  
      const quantityNumber = parseInt(quantity);
  
      if (!isNaN(quantityNumber) && quantityNumber >= 1) {
        postData("/cart/update", "PUT", { productId: productId, quantity: quantityNumber });
      } else {
        alert("Invalid quantity!");
      }
    });
  
    const deleteButtons = $(".delete-button");
  
    deleteButtons.on("click", (e: JQuery.ClickEvent) => {
      const target = $(e.currentTarget);
      const productId = target.data("product-id") as number;
  
      postData("/cart/delete", "DELETE", { productId: productId });
    });
  });  */ 