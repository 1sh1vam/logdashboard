import React from 'react'
import { twMerge } from 'tailwind-merge'

const ContentBox = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement> ) => {
  const classes = twMerge(
    'bg-neutral-light rounded-lg',
    className
  )
  return (
    <div {...props} className={classes} />
  )
}

export default ContentBox