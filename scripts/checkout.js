import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
// import { loadProducts } from "../data/products.js";
// import '../data/cart-class.js'
// import "../data/backend-pratice.js"
import { loadCart } from "../data/cart.js";
import { loadProductsFetch } from "../data/products.js";

async function loadPage() {
    await loadProductsFetch()

    // Como loadCart é uma função de callback, precisamos encapcular ela em uma promise
    // pois o await só espera quando o operando é uma promise
    // ou seja, await não faz nada com callback
    await new Promise((resolve) => {
        loadCart(() => {
            resolve();
        })
    })

    renderOrderSummary()
    renderPaymentSummary()  
}
loadPage()

// Promise.all([
//     loadProductsFetch(),
//     new Promise((resolve) => {
//         loadCart(() => {
//             resolve();
//         })
//     })

// ]).then((values) => {
//     console.log(values)
//     renderOrderSummary()
//     renderPaymentSummary()  
// })



// new Promise((resolve) => {
//     loadProducts(() => {
//         resolve('value1') 
//     })
// }).then((value) => {
//     console.log(value)
    
//     return new Promise((resolve) => {
//         loadCart(() => {
//             resolve();
//         })
//     });
// }).then(() => {
//     renderOrderSummary()
//     renderPaymentSummary()  
// })

// loadProducts(() => {
//     loadCart(() => {
//         renderOrderSummary();
//         renderPaymentSummary();
//     })
// });