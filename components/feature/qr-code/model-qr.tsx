    import { Dialog, DialogContent, DialogTrigger, DialogTitle } from "@/components/ui/dialog"
    import { Button } from "@/components/ui/button"
    import QrCode from "./qr-code"
    import { VisuallyHidden } from "@radix-ui/react-visually-hidden"

    export function MdodelQr() {
        return (
            <Dialog>
                <DialogTrigger  asChild>
                    <Button
                        className="w-full bg-primary-700 text-white py-3 rounded-lg font-medium hover:bg-red-700 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                    >
                        Book now
                    </Button>
                </DialogTrigger>
                <DialogContent  
                    className="sm:max-w-4xl bg-white"
                    onPointerDownOutside={(e) => e.preventDefault()}
                    onEscapeKeyDown={(e) => e.preventDefault()}
                >
                    {/* Visually hidden DialogTitle to satisfy accessibility requirements */}
                    <DialogTitle asChild>
                        <VisuallyHidden>QR Code Modal</VisuallyHidden>
                    </DialogTitle>
                    <QrCode />
                </DialogContent>
            </Dialog>
        )
    }
