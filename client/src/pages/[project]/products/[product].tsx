import { useLoaderData } from 'react-router-dom'
import Product from '../../../lib/product'
import Input from '../../../components/input'

function ProductDetail() {
  const product = useLoaderData() as Product

  return (
    <>
      <header className="border-b border-zinc-200 dark:border-neutral-700 text-zinc-500 pb-3 p-2 h-[48px] flex items-center">
        Detail
      </header>

      <div className="p-2">
        <div className="w-[100px] h-[100px] bg-zinc-200 dark:bg-neutral-600 rounded-md me-2">
          <img src={product.image} className="w-[100px] h-[100px] object-cover rounded-md" />
        </div>
        <h2 className="text-lg font-bold">{product.title}</h2>

        <div className="text-zinc-500 mb-5">
          <span className="bg-zinc-200 rounded px-1">
            {product.quantity} left
          </span>{' '}
          {product.price.currency} {product.price.value.toFixed(2)}
        </div>

        <form>
          <div className="flex mb-3 flex-wrap">
            <div className="me-3">
              <label className="flex items-center">
                Price
                <Input
                  type="number"
                  defaultValue={product.price.value.toFixed(2)}
                  className="!w-[6rem] ms-1"
                />
              </label>
            </div>

            <div>
              <label className="flex items-center">
                Quantity
                <Input
                  type="text"
                  className="!w-[6rem] ms-2"
                  defaultValue={product.quantity.toString()}
                />
              </label>
            </div>

            <div className="ms-1">
              <button className="bg-blue-600 text-white rounded-md p-1">
                Update
              </button>
            </div>
          </div>

          <div className="p-2 bg-zinc-100 rounded-md flex">
            <span className="material-symbols-rounded text-blue-500 me-2 mt-1">
              label
            </span>
            <p className="text-zinc-500">
              You can enter 25-2 in the quantity field and it'll automatically
              be calculated for you.
            </p>
          </div>

          <div className="p-2 bg-zinc-100 rounded-md flex mt-2">
            <span className="material-symbols-rounded text-orange-500 me-2 mt-1">
              bolt
            </span>
            <p className="text-zinc-500">
              A greater value that the current entry means stock up. Lower means
              a sale.
            </p>
          </div>
        </form>
      </div>
    </>
  )
}

export default ProductDetail
