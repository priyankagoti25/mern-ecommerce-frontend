export function addToCart(item){
    return new Promise(async (resolve)=>{
        try{
            const response =await fetch('http://localhost:8080/cart',{
                method: 'POST',
                body: JSON.stringify(item),
                headers:{
                    'content-type': 'application/json'
                }
            })
            const data = await response.json()
            resolve({data})
        }
        catch (e) {
            console.log('error',e)
        }

    })
}

export function fetchCartItemsByUser(userID) {
    return new Promise(async (resolve) => {
            const response = await fetch(`http://localhost:8080/cart?user=${userID}`)
            const data = response.json()
            resolve({data})
        }
    );
}

export function updateCartItem(updated) {
    return new Promise(async (resolve) => {
            const response = await fetch(`http://localhost:8080/cart/${updated.id}`,{
                method: 'PATCH',
                body:JSON.stringify({quantity:updated.quantity})
            })
            const data = response.json()
            resolve({data})
        }
    );
}

export function deleteCartItem(id) {
    return new Promise(async (resolve) => {
            const response = await fetch(`http://localhost:8080/cart/${id}`,{
                method: 'DELETE',
            })
            const data = response.json()
            resolve({data})
        }
    );
}