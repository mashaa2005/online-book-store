
document.addEventListener("DOMContentLoaded", function () {

    const orderForm = document.getElementById("orderForm");

    if (orderForm) {

        orderForm.addEventListener("submit", async function (e) {

            e.preventDefault();

            const name = document.getElementById("name").value;
            const address = document.getElementById("address").value;

            try {

                const response = await fetch("/orders", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        customerName: name,
                        address: address,
                        productId: "book"
                    })
                });

                const data = await response.json();

                alert(data.message);

                orderForm.reset();

            } catch (error) {

                console.log(error);

            }

        });

    }


    const reviewForm = document.getElementById("reviewForm");

    if (reviewForm) {

        reviewForm.addEventListener("submit", function (e) {

            e.preventDefault();

            const reviewText = document.getElementById("reviewText");
            const reviewsBox = document.getElementById("reviews");

            let newReview = document.createElement("p");

            newReview.textContent = reviewText.value;

            reviewsBox.prepend(newReview);

            reviewText.value = "";

        });

    }

});