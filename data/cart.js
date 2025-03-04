export let cart = JSON.parse(localStorage.getItem('cart')) 

if (!cart) {
    cart =  [ {
        productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
        quantity: 2
    }, {
        productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
        quantity: 1
    }]
}

function saveToStorage() {
    localStorage.setItem('cart', JSON.stringify(cart))
}

export function updateCartQuantity () {
    let totalQuantity = 0

    cart.forEach((item) => {
        totalQuantity += item.quantity
    })

    return totalQuantity
}

export function updateQuantityCheckout(productId, newQuantity) {
    cart.forEach((item) => {
        if(item.productId === productId) {
            item.quantity = Number(newQuantity)
        }
    })
    saveToStorage();
}

export function addToCart(productId) {
    let alreadyExistItem = false

    cart.forEach((item) =>  {
        if(item.productId === productId) {
            item.quantity += 1
            alreadyExistItem = true
        }
    })

    !alreadyExistItem && cart.push({
        productId,
        quantity: 1
    })

    saveToStorage()
}

export function removeFromCart(productId) {
    const newCart = []

    cart.forEach((item) => {
        if(item.productId !== productId) {
            newCart.push(item)
        }
    })

    cart = newCart;
    saveToStorage()
}
