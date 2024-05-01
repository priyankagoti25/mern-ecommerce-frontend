import _ from 'lodash'
export function fetchAllProduct(pagination) {
    return new Promise(async (resolve) => {
            const response = await fetch(`http://localhost:8080/products?_page=${pagination._page}&_per_page=${pagination._per_page}`)
            const data = response.json()
            resolve({data})
        }
    );
}
export function fetchProductById(id) {
    return new Promise(async (resolve) => {
        console.log('afsff',id)
            const response = await fetch(`http://localhost:8080/products/${id}`)
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
export function fetchAllBrands() {
    return new Promise(async (resolve) => {
            const response = await fetch('http://localhost:8080/brands')
            const data = response.json()
            resolve({data})
        }
    );
}

export function fetchAllCategories() {
    return new Promise(async (resolve) => {
            const response = await fetch('http://localhost:8080/categories')
            const data = response.json()
            resolve({data})
        }
    );
}