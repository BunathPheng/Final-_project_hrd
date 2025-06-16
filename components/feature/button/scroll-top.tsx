"use client";

import { useState, useEffect, FC } from 'react';
import { ArrowUp2 } from 'iconsax-reactjs';

const ScrollToTop: FC = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsVisible(window.pageYOffset > 300);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    if (!isVisible) return null;

    return (
        <button
            onClick={scrollToTop}
            className={`
                fixed bottom-8 right-8 w-12 h-12
                bg-primary-700 hover:bg-primary-800
                text-white rounded-full
                shadow-lg hover:shadow-xl
                transition-all duration-300
                flex items-center justify-center
                z-50 cursor-pointer group
            `}
            aria-label="Scroll to top"
        >
            <ArrowUp2 size={22} className="[&>*]:stroke-3" />
        </button>
    );
};

export default ScrollToTop;
