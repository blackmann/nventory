import clsx from 'clsx'
import React from 'preact/compat'

const Button = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<'button'>
>(({ className, ...props }, ref) => (
  <button
    ref={ref}
    className={clsx(
      'bg-blue-600 text-white rounded-md p-1 flex items-center',
      className
    )}
    {...props}
  />
))

export default Button
