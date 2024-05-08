// File for Util functions
import logo from "../images/logo.png";
import { axiosInstance } from "../api/axiosInstance";
import { history } from "./history";

export const calculateTotalItems = (items = []) => {
  const totalItems = items.reduce((total, item) => total + item.quantity, 0);
  //setCartCount(totalItems);
  return totalItems;
};
export const singleItemTotalPrice = (price = 0, quantity = 0) =>
  price * quantity;

export const fetchLocalStorageOrDB = (product, user, quantity = null) => {
  let fetchedCart;
  if (user) {
    fetchedCart = quantity || null;
  } else {
    let cartInLocalStorage =
      JSON.parse(localStorage.getItem('cartAdded')) || null;

    cartInLocalStorage
      ? (cartInLocalStorage = cartInLocalStorage[product._id])
      : (cartInLocalStorage = null);
    fetchedCart = cartInLocalStorage;
  }
  return fetchedCart;
};

export const checkForFavourite = (state, item) => {
  const { favourite } = state;
  let status = false;
  if (item._id in favourite) {
    status = true;
  }
  return status;
};


export const loadScript = (src) => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
   document.body.appendChild(script);
 });
};

export const displayRazorPay = (orderDetails) => {
  const options = {
    key: process.env.REACT_APP_RAZORPAY_KEY_ID,
    currency: orderDetails.currency,
    amount: orderDetails.amount,
    name: process.env.REACT_APP_PROJECT_NAME,
    description: "Test order",
    image: {logo},
    order_id: orderDetails.id,
    "handler": async function (response) {
      try {
        const { data } = await axiosInstance.post('/api/validatepayment', response, {
          headers: {
            "Content-Type": "application/json",
          }
        });
        history.navigate(`${data.redirectUrl}`)
      }
      catch (error) {
        console.log(error)
      }
      },
    prefill: {
      name: "test user",
      email: "testuser@email.com",
      contact: "+919000090000",
    },
  };

  const paymentObject = new window.Razorpay(options);
  paymentObject.open();
}


