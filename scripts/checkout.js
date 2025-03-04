import {cart, updateCartQuantity, removeFromCart, updateQuantityCheckout} from '../data/cart.js'
import { products } from '../data/products.js';
import { formatCurrency } from './utils/money.js';

const listCartItems = document.querySelector(".js-order-summary"); 
const checkoutTitle = document.querySelector('.js-cart-quantity-checkout-title')
let list = ''

cart.forEach((cartItem) => {
    const productId = cartItem.productId;
    let matchingProduct
    
    products.forEach((product) => { 
        if(product.id === productId) {
            matchingProduct = product
            list += addList(matchingProduct, cartItem.quantity)
        }
    })
})

listCartItems.innerHTML = list
checkoutTitle.innerHTML = `${updateCartQuantity()} Items`;

function addList(product, quantity) {
    return `
        <div class="cart-item-container js-cart-item-conteiner-${product.id}">
            <div class="delivery-date">
                Delivery date: Tuesday, June 21
            </div>

            <div class="cart-item-details-grid">
            <img class="product-image"
                src="${product.image}">

            <div class="cart-item-details">
                <div class="product-name">
                    ${product.name}
                </div>
                <div class="product-price">
                    ${formatCurrency(product.priceCents)}
                </div>
                <div class="product-quantity">
                <span>
                    Quantity: <span class="quantity-label js-quantity-label-${product.id}">
                        ${quantity}
                    </span>
                </span>
                <span class="update-quantity-link link-primary js-update-link"
                data-product-id="${product.id}">
                    Update
                </span>
                <input class="quantity-input js-quantity-input-${product.id}"></input>
                <span class="save-quantity-link link-primary" 
                data-product-id="${product.id}">
                    Save
                </span>
                <span class="delete-quantity-link link-primary js-delete-link"
                data-product-id="${product.id}">
                    Delete
                </span>
                </div>
            </div>

            <div class="delivery-options">
                <div class="delivery-options-title">
                Choose a delivery option:
                </div>
                <div class="delivery-option">
                <input type="radio" checked
                    class="delivery-option-input"
                    name="delivery-option-${product.id}">
                <div>
                    <div class="delivery-option-date">
                    Tuesday, June 21
                    </div>
                    <div class="delivery-option-price">
                    FREE Shipping
                    </div>
                </div>
                </div>
                <div class="delivery-option">
                <input type="radio"
                    class="delivery-option-input"
                    name="delivery-option-${product.id}">
                <div>
                    <div class="delivery-option-date">
                    Wednesday, June 15
                    </div>
                    <div class="delivery-option-price">
                    $4.99 - Shipping
                    </div>
                </div>
                </div>
                <div class="delivery-option">
                <input type="radio"
                    class="delivery-option-input"
                    name="delivery-option-${product.id}">
                <div>
                    <div class="delivery-option-date">
                    Monday, June 13
                    </div>
                    <div class="delivery-option-price">
                    $9.99 - Shipping
                    </div>
                </div>
                </div>
            </div>
            </div>
        </div>
    `
}

document.querySelectorAll('.js-delete-link')
    .forEach((link) => {
        link.addEventListener('click', () => {
            const productId = link.dataset.productId
            console.log(productId)
            removeFromCart(productId);
            checkoutTitle.innerHTML = `${updateCartQuantity()} Items`;
            
            const container = document.querySelector(`.js-cart-item-conteiner-${productId}`)
            container.remove()
        })
    })

document.querySelectorAll('.js-update-link')
    .forEach((link) => {
        link.addEventListener('click', () => {
            const productId = link.dataset.productId
            const productContainer = document.querySelector(`.js-cart-item-conteiner-${productId}`)
            productContainer.classList.add('is-editing-quantity')
        })
    })

document.querySelectorAll('.save-quantity-link')
    .forEach((link) => {
        link.addEventListener('click', () => {
            const productId = link.dataset.productId
            const saveContainer = document.querySelector(`.js-cart-item-conteiner-${productId}`)
            saveContainer.classList.remove('is-editing-quantity')

            const quantityInput = document.querySelector(`.js-quantity-input-${productId}`)
            updateQuantityCheckout(productId, quantityInput.value);

            checkoutTitle.innerHTML = `${updateCartQuantity()} Items`;
            document.querySelector(`.js-quantity-label-${productId}`).innerHTML = quantityInput.value
        })
    })