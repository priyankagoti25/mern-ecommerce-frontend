import _ from 'lodash'
export function fetchAllProduct() {
    return new Promise(async (resolve) => {
            const response = await fetch('http://localhost:8080/products')
            const data = response.json()
            resolve({data})
        }
    );
}

export function fetchAllProductByFilter(filters) {
    let queryString = ''
    for (const key in filters) {
        queryString = `${key}=${filters[key]}`
    }
    return new Promise(async (resolve) => {
            const response = await fetch('http://localhost:8080/products'+`?${queryString}`)
            const data = response.json()
            resolve({data})
        }
    );
}


export async function fetchAllProductWithSort(option) {
    return new Promise(async (resolve) => {
            const response = await fetch('http://localhost:8080/products')
            const data =  response.json()
        //     const data =  _.sortBy(responseData,[option.sort],[option.order])
        // console.log('data......', data)
            resolve({data})
        }
    );
}
