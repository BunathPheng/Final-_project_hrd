"use client"

import * as React from "react"
import { CalendarIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Calendars } from "@/components/ui/calendar"
import { Input } from "@/components/ui/input"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

interface DatePickerProps {
    id?: string;
    name?: string;
    disabled?: boolean;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onBlur?: () => void;
    placeholder?: string;
    className?: string;
    value?: string | null; // for controlled component
    defaultValue?: string; // for initial value
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any; // for spreading additional props
}

function formatDate(date: Date | undefined) {
    if (!date) {
        return ""
    }

    return date.toLocaleDateString("en-US", {
        day: "2-digit",
        month: "long",
        year: "numeric",
    })
}

function isValidDate(date: Date | undefined) {
    if (!date) {
        return false
    }
    return !isNaN(date.getTime())
}

export const DatePicker = React.forwardRef<HTMLInputElement, DatePickerProps>(({
    id = "date",
    name = "",
    disabled = false,
    onChange,
    onBlur,
    placeholder = "Select date",
    className = "",
    value: controlledValue,
    defaultValue,
    ...props
}, ref) => {
    const [open, setOpen] = React.useState(false)

    // Initialize date from controlled value, defaultValue, or default
    const getInitialDate = () => {
        if (controlledValue) {
            const date = new Date(controlledValue);
            return isValidDate(date) ? date : undefined;
        }
        if (defaultValue) {
            const date = new Date(defaultValue);
            return isValidDate(date) ? date : undefined;
        }
        return undefined;
    };

    const [date, setDate] = React.useState<Date | undefined>(getInitialDate)
    const [month, setMonth] = React.useState<Date | undefined>(date || new Date())
    const [inputValue, setInputValue] = React.useState(
        controlledValue ? formatDate(getInitialDate()) : formatDate(date)
    )

    // Update internal state when controlled value changes
    React.useEffect(() => {
        if (controlledValue !== undefined) {
            const newDate = controlledValue ? new Date(controlledValue) : undefined;
            if (isValidDate(newDate) || !controlledValue) {
                setDate(newDate);
                setInputValue(formatDate(newDate));
            }
        }
    }, [controlledValue]);

    const handleDateSelect = (selectedDate: Date | undefined) => {
        setDate(selectedDate);
        const formatted = formatDate(selectedDate);
        setInputValue(formatted);
        setOpen(false);

        // Call onChange with synthetic event for React Hook Form
        if (onChange) {
            const syntheticEvent = {
                target: {
                    name: name || "",
                    value: formatted
                }
            } as React.ChangeEvent<HTMLInputElement>;

            onChange(syntheticEvent);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputVal = e.target.value;
        setInputValue(inputVal);

        const parsedDate = new Date(inputVal);
        if (isValidDate(parsedDate)) {
            setDate(parsedDate);
            setMonth(parsedDate);
        }

        // Call onChange with the original event
        if (onChange) {
            onChange(e);
        }
    };

    return (
        <div className="flex flex-col gap-3">
            <div className="relative flex gap-2">
                <Input
                    ref={ref}
                    id={id}
                    name={name}
                    value={inputValue}
                    placeholder={placeholder}
                    className={`bg-background pr-10 ${className}`}
                    disabled={disabled}
                    onChange={handleInputChange}
                    onBlur={onBlur}
                    onKeyDown={(e) => {
                        if (e.key === "ArrowDown" && !disabled) {
                            e.preventDefault()
                            setOpen(true)
                        }
                    }}
                    {...props}
                />
                <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                        <Button
                            id="date-picker"
                            variant="ghost"
                            className="absolute top-1/2 right-2 size-6 -translate-y-1/2"
                            disabled={disabled}
                        >
                            <CalendarIcon className="size-3.5" />
                            <span className="sr-only">Select date</span>
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent
                        className="w-auto overflow-hidden p-0"
                        align="end"
                        alignOffset={-8}
                        sideOffset={10}
                    >
                        <Calendars
                            mode="single"
                            selected={date}
                            captionLayout="dropdown"
                            month={month}
                            onMonthChange={setMonth}
                            onSelect={handleDateSelect}
                            disabled={disabled}
                        />
                    </PopoverContent>
                </Popover>
            </div>
        </div>
    )
});

DatePicker.displayName = "DatePicker"
