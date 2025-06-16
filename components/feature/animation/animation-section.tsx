"use client"

import dynamic from 'next/dynamic'
import type { ReactNode } from "react"

interface AnimatedSectionProps {
    children: ReactNode
    animation?: string
    delay?: number
    duration?: number
    className?: string
}

const AnimatedSectionClient: React.FC<AnimatedSectionProps> = ({
    children,
    animation = "fade-right",
    delay = 0,
    duration = 800,
    className = "",
}) => {
    return (
        <div
            data-aos={animation}
            data-aos-delay={delay}
            data-aos-duration={duration}
            className={className}
        >
            {children}
        </div>
    )
}

// Loading fallback component
const LoadingFallback = () => <div></div>

export const AnimatedSection = dynamic(() => Promise.resolve(AnimatedSectionClient), {
    ssr: false,
    loading: LoadingFallback,
})
