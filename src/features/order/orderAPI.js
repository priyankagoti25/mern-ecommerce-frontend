export function createOrder(order){
    return new Promise(async (resolve)=>{
        try{
            const response =await fetch('http://localhost:8080/orders',{
                method: 'POST',
                body: JSON.stringify(order),
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
