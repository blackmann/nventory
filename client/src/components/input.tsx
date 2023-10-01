import clsx from 'clsx'
import React from 'preact/compat'

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<'input'>>(
  ({className, ...props}, ref) => (
    <input
      ref={ref}
      type="text"
      className={clsx('border rounded-md border-slate-200 p-1 w-full', className)}
      {...props}
    />
  )
)

export default Input
