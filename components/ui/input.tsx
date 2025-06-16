"use client"
import * as React from "react"
import { cn } from "@/lib/utils"
import { Eye, EyeSlash } from "iconsax-reactjs"

type ValidationMode = "default" | "text" | "number" | "float"

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    startIcon?: React.ReactNode
    endIcon?: React.ReactNode
    className?: string
    togglePassword?: boolean
    isOpen?: boolean
    validationMode?: ValidationMode
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({
        className,
        type,
        startIcon,
        endIcon,
        togglePassword = false,
        isOpen = false,
        validationMode = "default",
        onChange,
        ...props
    }, ref) => {
        const [showPassword, setShowPassword] = React.useState(isOpen)

        const handleTogglePassword = () => {
            setShowPassword((prev) => !prev)
        }

        const passwordEndIcon = (
            <button
                type="button"
                onClick={handleTogglePassword}
                className="text-grey-400 hover:text-grey-600 focus:outline-none"
                aria-label={showPassword ? "Hide password" : "Show password"}
            >
                {showPassword ? <Eye size={20} /> : <EyeSlash size={20} />}
            </button>
        )

        const displayEndIcon = togglePassword ? passwordEndIcon : endIcon
        const inputType = togglePassword && showPassword ? "text" : type

        const filterValue = (value: string) => {
            switch (validationMode) {
                case "text":
                    return value.replace(/[^a-zA-Z]/g, "")
                case "number":
                    return value.replace(/[^0-9]/g, "")
                case "float":
                    // Allow digits, one decimal point, and optional minus sign at the beginning
                    let filtered = value.replace(/[^0-9.-]/g, "")
                    
                    // Ensure only one decimal point
                    const decimalCount = (filtered.match(/\./g) || []).length
                    if (decimalCount > 1) {
                        const firstDecimalIndex = filtered.indexOf('.')
                        filtered = filtered.slice(0, firstDecimalIndex + 1) + filtered.slice(firstDecimalIndex + 1).replace(/\./g, '')
                    }
                    
                    // Ensure minus sign only at the beginning
                    const minusCount = (filtered.match(/-/g) || []).length
                    if (minusCount > 0) {
                        const hasLeadingMinus = filtered.startsWith('-')
                        filtered = filtered.replace(/-/g, '')
                        if (hasLeadingMinus) {
                            filtered = '-' + filtered
                        }
                    }
                    
                    return filtered
                default:
                    return value
            }
        }

        const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const filtered = filterValue(e.target.value)
            e.target.value = filtered
            onChange?.(e)
        }

        return (
            <div className="relative flex items-center w-full">
                {startIcon && (
                    <div className="absolute left-3 flex items-center pointer-events-none text-grey-400">
                        {startIcon}
                    </div>
                )}
                <input
                    type={inputType}
                    ref={ref}
                    data-slot="input"
                    className={cn(
                        "file:text-p1 placeholder:text-grey-400 selection:bg-primary selection:text-primary-foreground border-grey-400 flex h-12 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-p1 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-p1",
                        "focus-visible:border-primary-700 focus-visible:ring-primary-700/50 focus-visible:ring-[3px]",
                        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
                        startIcon && "pl-10",
                        displayEndIcon && "pr-10",
                        className
                    )}
                    onChange={handleInputChange}
                    {...props}
                />
                {displayEndIcon && (
                    <div className="absolute right-3 flex items-center">
                        {displayEndIcon}
                    </div>
                )}
            </div>
        )
    }
)

Input.displayName = "Input"

export { Input }