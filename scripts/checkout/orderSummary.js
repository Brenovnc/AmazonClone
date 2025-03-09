import {cart, updateCartQuantity, removeFromCart, updateQuantityCheckout, updateDeliveryOption} from '../../data/cart.js'
import { products } from '../../data/products.js';
import { formatCurrency } from '../utils/money.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import {deliveryOptions} from '../../data/deliveryOptions.js'

const today = dayjs(); 
const deliveryDate = today.add(7, 'days')
console.log(deliveryDate.format('dddd, MMMM D'))

export default function re() {
    console.log('re')
}

export function renderOrderSummary() {

    const listCartItems = document.querySelector(".js-order-summary"); 
    const checkoutTitle = document.querySelector('.js-cart-quantity-checkout-title')
    let list = ''

    cart.forEach((cartItem) => {
        const productId = cartItem.productId;
        let matchingProduct
        const deliveryOptionId = cartItem.deliveryOptionId;
        let deliveryOption;
        
        products.forEach((product) => { 
            if(product.id === productId) {
                matchingProduct = product
            }
        });
            
        deliveryOptions.forEach((option) => {
            if (option.id === deliveryOptionId) {
                deliveryOption = option
            }
        });


        const today = dayjs();
        const dateString = today.add(
            deliveryOption.deliveryDays,
            'days'
        ).format('dddd, MMMM D');

        console.log(matchingProduct.id)
        
        list += `
            <div class="cart-item-container js-cart-item-conteiner-${matchingProduct.id}">
                <div class="delivery-date">
                    Delivery date: ${dateString}
                </div>

                <div class="cart-item-details-grid">
                <img class="product-image"
                    src="${matchingProduct.image}">

                <div class="cart-item-details">
                    <div class="product-name">
                        ${matchingProduct.name}
                    </div>
                    <div class="product-price">
                        ${formatCurrency(matchingProduct.priceCents)}
                    </div>
                    <div class="product-quantity">
                    <span>
                        Quantity: <span class="quantity-label js-quantity-label-${matchingProduct.id}">
                            ${cartItem.quantity}
                        </span>
                    </span>
                    <span class="update-quantity-link link-primary js-update-link"
                    data-product-id="${matchingProduct.id}">
                        Update
                    </span>
                    <input class="quantity-input js-quantity-input-${matchingProduct.id}"></input>
                    <span class="save-quantity-link link-primary" 
                    data-product-id="${matchingProduct.id}">
                        Save
                    </span>
                    <span class="delete-quantity-link link-primary js-delete-link"
                    data-product-id="${matchingProduct.id}">
                        Delete
                    </span>
                    </div>
                </div>

                <div class="delivery-options">
                    <div class="delivery-options-title">
                    Choose a delivery option:
                    </div>
                        ${deliveryOptionsHTML(matchingProduct.id, cartItem)}
                    </div>
                </div>
                </div>
            </div>
        `
    });

    listCartItems.innerHTML = list
    checkoutTitle.innerHTML = `${updateCartQuantity()} Items`;

    function deliveryOptionsHTML(productId, cartItem) {
        let html = ''
        deliveryOptions.forEach((deliveryOption) => {
            const today = dayjs();
            const dateString = today.add(
                deliveryOption.deliveryDays,
                'days'
            ).format('dddd, MMMM D');

            const priceString = deliveryOption.priceCents
            === 0
                ? 'FREE'
                : `$${formatCurrency(deliveryOption.priceCents)} -`

            const isChecked = deliveryOption.id === cartItem.deliveryOptionId

            html += `
                <div class="delivery-option js-delivery-option"
                data-product-id="${productId}"
                data-delivery-option-id="${deliveryOption.id}">
                    <input type="radio"
                        ${isChecked ? 'checked': ''}
                        class="delivery-option-input"
                        name="delivery-option-${productId}">
                    <div>
                        <div class="delivery-option-date">
                            ${dateString}
                        </div>
                        <div class="delivery-option-price">
                        ${priceString} Shipping
                        </div>
                    </div>
                </div>
        `
        })  
            return html;
    }

    document.querySelectorAll('.js-delete-link')
        .forEach((link) => {
            link.addEventListener('click', () => {
                const productId = link.dataset.productId
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

                // Pega o valor presente no input e converte para number (já que sempre é string)
                const quantityInput = Number(document.querySelector(`.js-quantity-input-${productId}`).value)

                // Caso seja zero, faz a mesma função do botão de delete
                if(quantityInput === 0) {
                    removeFromCart(productId);
                    checkoutTitle.innerHTML = `${updateCartQuantity()} Items`;
                    
                    const container = document.querySelector(`.js-cart-item-conteiner-${productId}`)
                    container.remove()
                //Caso seja maior que 1, apenas salva o valor
                } else if (quantityInput >= 1) {
                    updateQuantityCheckout(productId, quantityInput);
        
                    checkoutTitle.innerHTML = `${updateCartQuantity()} Items`;
                    document.querySelector(`.js-quantity-label-${productId}`).innerHTML = quantityInput
                }
            })
        })

        document.querySelectorAll('.js-delivery-option')
            .forEach((element) => {
                element.addEventListener('click', () => {
                    const {productId, deliveryOptionId} = element.dataset 
                    updateDeliveryOption(productId, deliveryOptionId);
                    renderOrderSummary();
                })
            })
}