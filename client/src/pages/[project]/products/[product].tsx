import { useLoaderData, useNavigate, useRevalidator } from 'react-router-dom'
import Product from '../../../lib/product'
import Input from '../../../components/input'
import { FieldValues, useForm } from 'react-hook-form'
import React from 'preact/compat'
import request from '../../../lib/request'

function ProductDetail() {
  const product = useLoaderData() as Product
  const { revalidate } = useRevalidator()
  const { handleSubmit, register } = useForm()
  const navigate = useNavigate()

  const [submitting, setSubmitting] = React.useState(false)

  async function update(data: FieldValues) {
    if (submitting) {
      return
    }

    setSubmitting(true)
    try {
      await request.patch(`/products/${product._id}`, {
        ...data,
      })

      setSubmitting(false)
      revalidate()
    } catch (err) {
      setSubmitting(false)
      console.error(err)
    }
  }

  return (
    <>
      <header className="border-b border-zinc-200 dark:border-neutral-700 text-zinc-500 pb-3 p-2 h-[48px] flex items-center">
        Detail
      </header>

      <div className="p-2">
        <div className="w-[100px] h-[100px] bg-zinc-200 dark:bg-neutral-600 rounded-md me-2">
          <img
            src={product.image}
            className="w-[100px] h-[100px] object-cover rounded-md"
          />
        </div>
        <h2 className="text-lg font-bold">{product.title}</h2>

        <div className="text-zinc-500 mb-5">
          <span className="bg-zinc-200 rounded px-1">
            {product.quantity} left
          </span>{' '}
          {product.price.currency} {product.price.value.toFixed(2)}
        </div>

        <form onSubmit={handleSubmit(update)}>
          <div className="flex mb-3 flex-wrap">
            <div className="me-3">
              <label className="flex items-center">
                Price
                <Input
                  type="number"
                  defaultValue={product.price.value.toFixed(2)}
                  className="!w-[6rem] ms-1"
                  {...register('price', {
                    required: true,
                    valueAsNumber: true,
                  })}
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
                  {...register('quantity', {
                    required: true,
                    validate: (value) => {
                      try {
                        const res = eval(value)
                        if (isNaN(res)) return false
                      } catch {
                        return false
                      }
                      return true
                    },
                    setValueAs(value) {
                      try {
                        return eval(value)
                      } catch {
                        return value
                      }
                    },
                  })}
                />
              </label>
            </div>

            <div className="ms-1">
              <button
                className="bg-blue-600 text-white rounded-md p-1 disabled:bg-blue-400"
                disabled={submitting}
              >
                {submitting ? 'Updating…' : 'Update'}
              </button>
            </div>
          </div>

          <div className="p-2 bg-zinc-100 rounded-md flex">
            <span className="material-symbols-rounded text-blue-500 me-2 mt-1">
              label
            </span>
            <p className="text-zinc-500">
              You can enter <code className="font-bold">25-2</code> in the
              quantity field and it'll automatically be calculated for you.
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
