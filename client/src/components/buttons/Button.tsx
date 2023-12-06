import clsx from 'clsx';
import React from 'react';
import { twMerge } from 'tailwind-merge';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'solid' | 'outlined' | 'ghost';
}

const Button = ({ variant = 'solid', className, ...props }: ButtonProps) => {
  const classes = twMerge(
    'px-5 py-3 font-medium text-sm rounded-lg text-content-1 bg-primary-orange disabled:text-content-disabled',
    clsx({
        'text-content-2 hover:text-content-1 bg-transparent border border-outline': variant === 'outlined',
        'hover:bg-primary-orange-hover disabled:bg-neutral-light': variant === 'solid',
        'bg-transparent p-0 text-primary-orange': variant === 'ghost'
    }),
    className
  )
  return (
    <button {...props} className={classes} />
  )
}

export default Button