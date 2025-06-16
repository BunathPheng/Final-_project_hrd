import { ArrowRight2 } from "iconsax-reactjs";

type BreadcrumbProps = {
    main: string;
    items: string[]
};

export const Breadcrumb: React.FC<BreadcrumbProps> = ({ main, items }) => {
    return (
        <>
            <div className="py-3 border-t border-gray-100 px-7 flex gap-3.5 items-center shadow-sm">
                <h6 className="text-s1">{main}</h6>
                <span className="text-grey-100 text-xl">|</span>
                <div className="inline-flex items-center gap-2">
                    {items && items.map((item, idx) => (
                        <div key={idx} className="w-fit flex items-center gap-2">
                            <h6 className={`text-s2 ${idx == items.length - 1 ? "text-grey-400" : ""}`}>{item}</h6 >
                            {idx != items.length - 1 &&
                                <ArrowRight2 color="var(--color-grey-400)" variant="Outline" size={16} />
                            }
                        </div>
                    ))}
                </div>
            </div >
        </>
    );
}
