import { InputHTMLAttributes, ReactNode, forwardRef } from 'react'
import { clsx } from 'clsx'

interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'prefix'> {
  label?: string
  error?: string
  prefix?: ReactNode
  suffix?: ReactNode
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, prefix, suffix, className, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label className="text-sm font-medium text-cb-text-secondary">{label}</label>
        )}
        <div className="relative flex items-center">
          {prefix && (
            <span className="absolute left-3 text-cb-text-muted text-sm font-medium">{prefix}</span>
          )}
          <input
            ref={ref}
            className={clsx(
              'w-full bg-white border rounded-xl text-cb-text placeholder-cb-text-muted transition-colors duration-200 font-sans',
              'focus:outline-none focus:ring-2 focus:ring-cb-blue/30 focus:border-cb-blue',
              'py-3 text-sm',
              prefix ? 'pl-8 pr-4' : 'px-4',
              suffix ? 'pr-12' : '',
              error ? 'border-cb-red' : 'border-cb-border hover:border-cb-text-muted',
              className,
            )}
            {...props}
          />
          {suffix && (
            <span className="absolute right-3 text-cb-text-muted text-sm font-medium">{suffix}</span>
          )}
        </div>
        {error && <p className="text-xs text-cb-red">{error}</p>}
      </div>
    )
  }
)
Input.displayName = 'Input'
export default Input
