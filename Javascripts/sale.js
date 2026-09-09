const productElement = document.getElementById("product");
const numberElement = document.getElementById("number");

const popup = document.getElementById("popup");
const popupText = document.getElementById("popup-text");
const products = {
  1: {
    name: "Original blend 200g",
    price: 500,
  },
  2: {
    name: "Original blend 500g",
    price: 900,
  },
  3: {
    name: "Special Blend 200g",
    price: 700,
  },
  4: {
    name: "Special Blend 500g",
    price: 1200,
  },
};

let purchases = [];

function showPopup(message) {
  popupText.innerText = message;
  popup.style.display = "flex";
}

function closePopup() {
  popup.style.display = "none";
}

function add() {
  const id = productElement.value;
  const number = parseInt(numberElement.value);

  if (id === "0" || isNaN(number)) {
    window.alert("Please select a product and quantity.");
    return;
  }
  const product = products[id];

  const purchase = {
    name: product.name,
    price: product.price,
    number: number,
  };

  purchases.push(purchase);
  const amount = product.price * number;

  showPopup(
    `product: ${product.name}
    Quantity: ${number}
    Amount: ${amount} yen`
  );
}
function display() {
  let message = "";

  for (let index = 0; index < purchases.length; index++) {
     const purchase = purchases[index];
      message += `${purchase.name} ${purchase.price}yen: ${purchase.number} ${
      purchase.number === 1 ? "item" : "items"
    }\n`;

  }

  return message;
}
function calc() {
  let sum = 0;

  for (let index = 0; index < purchases.length; index++) {
    sum += purchases[index].price * purchases[index].number;
  }

  let shipping = 0;

  if (sum < 2000) {
    shipping = 500;
  } else if (sum < 3000) {
    shipping = 250;
  } else {
    shipping = 0;
  }
  const total = sum + shipping;

  showPopup(
    `${display()}
Subtotal ${sum} yen
Shipping ${shipping} yen
Total ${total} yen`
  );

  
  purchases = [];
  productElement.value = "0";
  numberElement.value = "";
}