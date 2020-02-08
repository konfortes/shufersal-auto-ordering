export enum Category {
    Fruits = 'fruits',
    Vegetables = 'vegetables',
}

export interface Product {
    name: string
    price: string
}

export interface ProductRequest {
    name: string
    amount?: number
    priceLimit?: number
}
