/* eslint-disable @typescript-eslint/no-explicit-any */
import { useId } from "react";

const ToggleCheckbox: React.FC<{ [key: string]: any }> = ({ ...props }) => {
    const uniqueId = useId(); // ensures a unique ID per component

    return (
        <label htmlFor={uniqueId} className="cursor-pointer relative flex items-center rounded-full w-12 h-6 p-0.5 group/checkout">
            <input type="checkbox" id={uniqueId} {...props} className="sr-only peer" />
            <div className="absolute top-0 left-0 w-full h-full transition-colors bg-grey-50 peer-checked:bg-primary-700 rounded-full group-focus-within/checkout:ring-1 ring-primary-50"></div>
            <div className="w-5 h-5 rounded-full bg-white shadow-xs transition-all translate-0 peer-checked:translate-x-[1.45rem]"></div>
        </label>
    );
}

export default ToggleCheckbox;
