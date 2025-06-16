"use client"

import { ArrowDown2 } from "iconsax-reactjs";
import { useState, useEffect, useRef } from "react";

type FAQItemProps = {
    question: string;
    answer: string;
}

export const FAQItem: React.FC<FAQItemProps> = ({ question, answer }) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const contentRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLParagraphElement>(null);

    // Handle resizing dynamically
    useEffect(() => {
        const content = contentRef.current;
        if (!content) return;

        const handleResize = () => {
            if (isOpen && textRef.current) {
                content.style.height = `${textRef.current.scrollHeight}px`;
            }
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, [isOpen]);

    // Hide and show answer
    const toggleAnswer = () => {
        const content = contentRef.current;
        const text = textRef.current;

        if (!content || !text) return;

        const height = isOpen ? 0 : text.scrollHeight;
        content.style.height = `${height}px`;
        setIsOpen(!isOpen);
    }

    return (
        <div className="bg-white shadow-100 rounded-lg overflow-hidden">
            {/* Question (Heading) */}
            <button
                type="button"
                className="flex justify-between items-center w-full p-5 text-left focus:outline-none"
                onClick={toggleAnswer}
            >
                <span className={`text-s1 transition-all ${isOpen ? "text-primary-700" : "text-grey-900"}`}>{question}</span>
                <ArrowDown2 size={24} className={`transition-all duration-500 ${isOpen ? "rotate-180 [&>*]:stroke-primary-700" : "[&>*]:stroke-grey-400"}`} />
            </button>

            {/* Answer (Content) */}
            <div ref={contentRef} className="transition-all duration-500 overflow-hidden bg-grey-50 h-0">
                <p ref={textRef} className="text-p1 px-5 py-7 text-grey-800">{answer}</p>
            </div>
        </div>
    );
};
