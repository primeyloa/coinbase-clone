import { ButtonHTMLAttributes, ReactNode } from 'react'
import { clsx } from 'clsx'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'dark' | 'secondary' | 'ghost' | 'danger' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  children: ReactNode
  loading?: boolean
  fullWidth?: boolean
}

export default function Button({
  variant = 'primary',
  size = 'md',
  children,
  loading = false,
  fullWidth = false,
  className,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      className={clsx(
        'inline-flex items-center justify-center font-semibold rounded-full transition-all duration-200 focus:outline-none active:scale-[0.97]',
        {
          'bg-cb-blue hover:bg-cb-blue-dark text-white': variant === 'primary',
          'bg-cb-black hover:bg-gray-800 text-white': variant === 'dark',
          'bg-cb-gray hover:bg-cb-gray-200 text-cb-text border border-cb-border': variant === 'secondary',
          'hover:bg-cb-gray text-cb-text-secondary hover:text-cb-text': variant === 'ghost',
          'bg-cb-red/10 hover:bg-cb-red/20 text-cb-red border border-cb-red/30': variant === 'danger',
          'border border-cb-border text-cb-text hover:bg-cb-gray': variant === 'outline',
          'px-4 py-2 text-sm': size === 'sm',
          'px-6 py-3 text-sm': size === 'md',
          'px-8 py-4 text-base': size === 'lg',
          'w-full': fullWidth,
          'opacity-50 cursor-not-allowed pointer-events-none': disabled || loading,
        },
        className,
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
      )}
      {children}
    </button>
  )
}
