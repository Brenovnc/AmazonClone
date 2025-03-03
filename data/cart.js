export const cart = [ {
    productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    quantity: 2
}, {
    productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
    quantity: 1
}]

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

    console.log(cart)
}
