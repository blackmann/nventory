
interface Product {
  _id: string
  title: string
  quantity: number
  price: {
    value: number,
    currency: string
  }
  image: string
}

export default Product
