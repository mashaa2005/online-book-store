
document.addEventListener("DOMContentLoaded", function () {

    const orderForm = document.getElementById("orderForm");

    if (orderForm) {
        orderForm.addEventListener("submit", function (e) {
            e.preventDefault();

            const name = document.getElementById("name").value;

            alert(`${name}, благодарим за поръчката!`);

            orderForm.reset();
        });
    }

    const reviewForm = document.getElementById("reviewForm");

    if (reviewForm) {
        reviewForm.addEventListener("submit", function (e) {
            e.preventDefault();

            const reviewText = document.getElementById("reviewText");
            const reviewsBox = document.getElementById("reviews");

            const newReview = document.createElement("p");
            newReview.textContent = reviewText.value;

            reviewsBox.prepend(newReview);

            reviewText.value = "";
        });
    }

});
