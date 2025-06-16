import {CalendarRemove} from "iconsax-reactjs";

// Main skeleton component with grid layout
export const EmptyEvent: React.FC<{ title?: string, description?: string }> = ({
    title = "No events found",
    description = "Try adjusting your search criteria or filters.",
}) => (
    <>
        <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="w-24 h-24 bg-grey-50 rounded-full flex items-center justify-center mb-4">
                <CalendarRemove size="40" className="[&>*]:stroke-grey-800" />
            </div>
            <h3 className="text-h6 font-medium text-grey-800 mb-2">{title}</h3>
            <p className="text-grey-500">{description}</p>
        </div>
    </>
);
