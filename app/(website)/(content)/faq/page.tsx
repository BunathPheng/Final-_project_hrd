import { JSX } from "react";
import { FAQItem } from "./_components/faq-item";
import { digitalMuseumFAQ } from "./_content/question";
import HeadingTitle from "@/components/feature/label/heading-title";

export default function FAQPage(): JSX.Element {
    return (
        <>
            <div className="container flex flex-col gap-10 pd-screen mt-12">
                {/* Header */}
                <div className="text-center mb-8">
                    <article className="flex items-center justify-center gap-5">
                        <span className="rounded-full w-full max-w-24 h-0.5 bg-grey-900"></span>
                        <HeadingTitle title="Frequently Asked Questions" />
                        <span className="rounded-full w-full max-w-24 h-0.5 bg-grey-900"></span>
                    </article>
                    <p className="text-p1 mt-4 max-w-3xl mx-auto text-grey-800">
                        Find answers to the most common questions about visiting the museum, exhibits, and collections. Planning a visit and can’t find what you’re looking for? Our visitor services team is here to help.
                    </p>
                </div>

                {/* Accordion */}
                <div className="space-y-8">
                    {digitalMuseumFAQ.map((faq, index) => (
                        <FAQItem key={index} question={faq.question} answer={faq.answer} />
                    ))}
                </div>
            </div>
        </>
    );
}
