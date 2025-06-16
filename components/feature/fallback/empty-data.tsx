import { Bank } from "iconsax-reactjs";

export const EmptyData: React.FC<{ title?: string, description?: string, icon?: React.ReactNode }> = ({
    title = "No museums found",
    description = "Try adjusting your search criteria or filters.",
    icon = <Bank size={40} className="[&>*]:stroke-grey-800" />
}) => (
    <>
        <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="w-24 h-24 bg-grey-50 rounded-full flex items-center justify-center mb-4">
                {icon}
            </div>
            <h3 className="text-h6 font-medium text-grey-800 mb-2">{title}</h3>
            <p className="text-grey-500">{description}</p>
        </div>
    </>
);
