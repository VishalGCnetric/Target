// import { get } from "../api/APIController";

import { getOrdersSuccess } from "../../Redux/Admin/Orders/ActionCreator";
import store from "../../Redux/Store";
import { deleteCall, get, post, putCall } from "../../api/config/APIController";

export const getCartItems = () => {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      get("cart")
        .then((response) => {
          if (response.status === 200) {
            // console.log("this is new cart response", response.data);
            dispatch({
              type: "GET_CART_ITEMS",
              cartItems: response?.data,
            });
            resolve(response.data);
          }
        })
        .catch((error) => {
          dispatch({
            type: "GET_CART_ITEMS",
            cartItems: {},
          });
          reject(error);
        })
        .finally();
    });
  };
};

// public addToCart = (data: any) => {
//   return new Promise((resolve: any, reject: any) => {
//     this.instance
//       .post(API.ADD_TO_CART + "/" + Cart.getCartId(), data)
//       .then((response) => {
//         if (response.status == 200) {
//           let message = response.data.msg ?? "";
//           let cartItems: any = LocalStorageService.getCartItems();

//           if (cartItems) {
//             cartItems.push(data.data.id);
//           } else {
//             cartItems = [data.data.id];
//           }

//           LocalStorageService.setCartItems(cartItems);
//           useCartStore.setState({
//             count: cartItems.length,
//             cartItems: cartItems,
//           });
//           resolve(response);
//         } else {
//           let message = response.data.msg ?? "";
//           Toast.showError(message);
//           reject(response);
//         }
//       })
//       .catch((error) => {
//         console.log("Error", error);
//         Toast.showError(
//           JSON.parse(error.response.request.response).msg.detail
//         );
//         reject(error);
//       });
//   });
// };

export const getCutomerOrdersNew = () => {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      get("orders")
        .then((response) => {
          if (response.status === 200) {
            // console.log("this getCutomerOrdersNew", response.data);
            dispatch({
              type: "GET_ORDER_HISTORY_NEW",
              order: response?.data,
            });
            resolve(response.data);
          }
        })
        .catch((error) => {
          reject(error);
        })
        .finally();
    });
  };
};

export const AddItemToCartNew = (id) => {
  let data = {
    productVariantId: id,
    quantity: 1,
  };
  // return (dispatch) => {
    return new Promise((resolve, reject) => {
      post("cart", data)
        .then((response) => {
          if (response.status === 200) {
            // console.log("this getCutomerOrdersNew", response.data);
            store.dispatch({
              type: "GET_ORDER_HISTORY_NEW",
              order: response?.data,
            });
            resolve(response.data);
          }
        })
        .catch((error) => {
          reject(error);
        })
        .finally();
    });
  // };
};

export const RemoveCartItemNew = (id) => {
  let url = `cart?lineId=${id}`;
  // let data = {
  //   productVariantId: id,
  //   quantity: 1,
  // };
  // return (dispatch) => {
    return new Promise((resolve, reject) => {
      deleteCall(url)
        .then((response) => {
          if (response.status === 200) {
            // console.log("this getCutomerOrdersNew", response.data);
            // dispatch({
            //   type: "GET_ORDER_HISTORY_NEW",
            //   order: response?.data,
            // });
            resolve(response.data);
          }
        })
        .catch((error) => {
          reject(error);
        })
        .finally();
    });
  };
// };


export const updateCartQtyNEW = (id, qty) => {
  let params = {
    lineId: id,
    quantity: qty,
  };

  return new Promise((resolve, reject) => {
    putCall(`cart`, params)
      .then((response) => {
        if (response.status == 200) {
          // store.dispatch({
          //   type: "GET_CART_ITEMS",
          //   items: response?.data,
          // });
          resolve(response?.data);
        } else {
          return false;
        }
      })
      .catch((error) => {
        return false;
      })
      .finally();
  });
};



export const placeOrder = async (data) => {


  return new Promise((resolve, reject) => {
    return post("checkout", data)
      .then((res) => {
        getCartItems()
        resolve(res);
        // getCustomerLoginCart();
      })
      .catch((error) => {
        reject(false);
        console.log(error);
      })
      .finally();
  });
};
