(() => {
    const domain = window.location.origin;
    const form = document.querySelector("form");
    
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        // const images = document.querySelectorAll(".image-input");
        const product_id = location.pathname.split("/").pop();
        const titleInput = document.getElementById("title-input").value;
        const descriptionInput = document.getElementById("textarea").value;
        const selectCategory = document.getElementById("select-category").value;
        const selectCondition = document.getElementById("select-condition").value;
        const priceInput = document.getElementById("price-input").value;
        const addressInput = document.getElementById("address-input").value;
        const phoneInput = document.getElementById("phone-input").value;
        const listProductBtn = document.getElementById("list-product-btn");
        listProductBtn.innerText = "Listing...";
        listProductBtn.disabled = true;

        // console.log('Images:', images);
        console.log('Product id:', product_id);
        console.log('Title Input:', titleInput);
        console.log('Description Input:', descriptionInput);
        console.log('Category Select:', selectCategory);
        console.log('Condition Select:', selectCondition);
        console.log('Price Input:', priceInput);
        console.log('Address Input:', addressInput);
        console.log('Phone Input:', phoneInput);

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        // var formdata = new FormData();
        const data = {
            product_id: product_id,
            title: titleInput,
            product_description: descriptionInput,
            price: priceInput,
            condition: selectCondition,
            categories: [selectCategory],
            product_address: addressInput,
            phone: phoneInput,
            // visiability: "private",
        }
        // formdata.append("data", JSON.stringify(data));
        // images.forEach((image) => {
        //     formdata.append("photo", image.files[0]);
        // })

        var requestOptions = {
            method: 'PUT',
            body: JSON.stringify(data),
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch(domain + "/api/v1/products", requestOptions)
            .then(async (response) => {
                let result = await response.json();
                result.status = response.status;
                return result;
            })
            .then(result => {
                if (result.status != 200) {
                    throw new Error(result.message);
                }
                alert(result.message);
                window.location.href = domain + "/home";
                listProductBtn.innerText = "List Your Product";
                listProductBtn.disabled = false;
            })
            .catch(error => {
                listProductBtn.innerText = "List Your Product";
                listProductBtn.disabled = false;
                alert(error.message);
                console.log('error', error)
            });

    })
})()