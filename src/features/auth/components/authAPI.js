export function createUser(userData){
    return new Promise(async (resolve)=>{
        try{
            const response =await fetch('http://localhost:8080/users',{
                method: 'POST',
                body: JSON.stringify(userData),
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
export function checkUser(loginInfo){
    return new Promise(async (resolve,reject)=>{
        try{
            const response =await fetch(`http://localhost:8080/users?email=${loginInfo.email}`)
            const data = await response.json()
            console.log('login user----------->',data)
            if(data.length){
                if(loginInfo.password === data[0].password){
                    resolve({data:data[0]})
                }
                else {
                    reject({message: 'Wrong credential'})
                }
            }
            else {
                reject({message: 'User not found'})
            }
        }
        catch (e) {
            reject({message: 'something went wrong'})
        }
    })
}
export function addAddress(address){
    return new Promise(async (resolve)=>{
        try{
            const response =await fetch('http://localhost:8080/addresses',{
                method: 'POST',
                body: JSON.stringify(address),
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
