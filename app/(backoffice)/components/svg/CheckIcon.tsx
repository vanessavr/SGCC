import React, { CSSProperties, ReactNode } from 'react'

interface Props {
    children?: ReactNode
    style?: CSSProperties
    className?: string
}

export default function CheckIcon({ children, className, ...props }: Props) {
    return (
        <svg className={`${className} size-20 `} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
        </svg>
    )
}
