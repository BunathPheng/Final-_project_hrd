import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
    "inline-flex items-center justify-center gap-3 text-[1rem] font-bold leading-[1.25rem] cursor-pointer whitespace-nowrap rounded-md px-4 transition-all disabled:pointer-events-none disabled:opacity-50 shrink-0 [&_svg]:shrink-0 outline-none",
    {
        variants: {
            variant: {
                default: "bg-primary-700 text-white hover:bg-primary-800",
                outline: "border-2 border-primary-700 bg-white text-primary-700 hover:text-white hover:bg-primary-700",
                outlineDate:
                    "border  border-input bg-background shadow-1 hover:bg-accent hover:text-accent-foreground",
                white: "bg-white text-primary-700",
                outlineWhite: "border-2 border-white bg-primary-700 text-white",
                ghost: "bg-grey-50 hover:bg-grey-100 text-grey-900",
                green: "bg-green text-white hover:bg-dark-green",
                greenOutline: "border-2 border-green bg-white text-green hover:text-white hover:bg-green",
            },
            size: {
                default: "h-12",
                md: "h-10",
                sm: "h-8",
                icon: "size-10",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
);

function Button({
    className,
    variant,
    size,
    asChild = false,
    ...props
}: React.ComponentProps<"button"> &
    VariantProps<typeof buttonVariants> & {
        asChild?: boolean;
    }) {
    const Comp = asChild ? Slot : "button";

    return (
        <Comp
            data-slot="button"
            className={cn(buttonVariants({ variant, size, className }))}
            {...props}
        />
    );
}

export { Button, buttonVariants };
