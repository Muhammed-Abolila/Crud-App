let productName = document.getElementById("productName");
let productCategory = document.getElementById("productCategory");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let countInput = document.getElementById("countInput");
let productDiscription = document.getElementById("productDiscription");
let serchInput = document.getElementById("serchInput");
let btn = document.getElementById("btn");
let demo = document.getElementById("demo");
let products;
let paramIndex;
// Get Total Function
function getTotal() {
    if (price.value == '') {
        total.innerHTML = "";
        total.style.background = "red"
    } else {
        total.innerHTML = (Number(price.value) + Number(taxes.value) + Number(ads.value)) - Number(discount.value)
        total.style.background = "green"
    }
}
// Create Products
btn.addEventListener("click", function createProducts() {
    if (btn.innerHTML == "Update") {
        products[paramIndex].name = productName.value;
        products[paramIndex].category = productCategory.value;
        products[paramIndex].price = price.value;
        products[paramIndex].taxes = taxes.value;
        products[paramIndex].ads = ads.value;
        products[paramIndex].discount = discount.value;
        products[paramIndex].total = total.innerHTML;
        products[paramIndex].discription = productDiscription.value;
        btn.innerHTML = "Add Product";
    } else {
        let product = {
            name: productName.value,
            category: productCategory.value,
            price: price.value,
            taxes: taxes.value,
            ads: ads.value,
            discount: discount.value,
            total: total.innerHTML,
            count: countInput.value,
            discription: productDiscription.value
        }
        if (product.count > 1) {
            for (let i = 0; i < product.count; i++) {
                products.push(product)
            }
        } else {
            products.push(product)
        }


    }
    readProduct();
    clearInptus();
    localStorage.setItem("products", JSON.stringify(products))
    location.reload();
});

// Read Products
function readProduct() {
    let kobry = '';
    for (let i = 0; i < products.length; i++) {
        kobry +=
            `
                    <tr>
                        <td>${i+1}</td>
                        <td>${products[i].name}</td>
                        <td>${products[i].category}</td>
                        <td>${products[i].price}</td>
                        <td>${products[i].taxes}</td>
                        <td>${products[i].ads}</td>
                        <td>${products[i].discount}</td>
                        <td>${products[i].total}</td>
                        <td>${products[i].discription}</td>
                        <td>
                            <button class="btnDelete" onClick="deleteProduct(${i})">Delete</button>
                        </td>
                        <td>
                            <button class="btnUpdate" onClick=(updateProduct(${i}))>Update</button>
                        </td>
                    </tr>
            `
    }
    demo.innerHTML = kobry
};
// LocalStorage
if (JSON.parse(localStorage.getItem("products")) == null) {
    products = []
} else {
    products = JSON.parse(localStorage.getItem("products"));
    readProduct()
};
// Clear Inputs
function clearInptus() {
    productName.value = '';
    productCategory.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value = '';
    total.innerHTML = '';
    countInput.value = '';
    productDiscription.value = '';
    total.style.background = "red";

};
// Delete Product
function deleteProduct(param) {
    products.splice(param, 1);
    localStorage.setItem("products", JSON.stringify(products));
    readProduct()
}

// update Function
function updateProduct(param) {
    paramIndex = param;
    productName.value = products[param].name;
    productCategory.value = products[param].category;
    price.value = products[param].price;
    taxes.value = products[param].taxes;
    ads.value = products[param].ads;
    discount.value = products[param].discount;
    total.innerHTML = products[param].total;
    productDiscription.value = products[param].discription;
    btn.innerHTML = "Update";
    if (total.innerHTML == '') {
        total.style.background = "red";
    } else {
        total.style.background = "green";
    }
}
// Search Function
function searchProduct() {
    let kobry2 = '';
    for (let i = 0; i < products.length; i++) {
        if (products[i].name.toLowerCase().includes(serchInput.value.toLowerCase())) {
            kobry2 =
                ` <tr>
                <td>${i+1}</td>
                <td>${products[i].name}</td>
                <td>${products[i].category}</td>
                <td>${products[i].price}</td>
                <td>${products[i].taxes}</td>
                <td>${products[i].ads}</td>
                <td>${products[i].discount}</td>
                <td>${products[i].total}</td>
                <td>${products[i].discription}</td>
                <td>
                    <button class="btnDelete" onClick="deleteProduct(${i})">Delete</button>
                </td>
                <td>
                    <button class="btnUpdate" onClick=(updateProduct(${i}))>Update</button>
                </td>
            </tr>`
        }
    }
    demo.innerHTML = kobry2
};