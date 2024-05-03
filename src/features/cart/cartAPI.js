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
