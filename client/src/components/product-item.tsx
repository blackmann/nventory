import Product from '../lib/product'

interface Props {
  item: Product
}

function ProductItem({ item }: Props) {
  return (
    <div className="flex">
      <div className="w-[50px] h-[50px] bg-zinc-200 dark:bg-neutral-600 rounded-md me-2"></div>
      <div className="flex-1">
        <div>{item.title}</div>
        <div className="text-zinc-500">
          <span className="bg-zinc-200 rounded px-1">{item.quantity} left</span>{' '}
          {item.price.currency} {item.price.value.toFixed(2)}
        </div>
      </div>
    </div>
  )
}

export default ProductItem
