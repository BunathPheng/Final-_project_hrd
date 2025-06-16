"use client";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Scan } from "iconsax-reactjs";
import { Html5QrcodeScanner } from "html5-qrcode";
import { useEffect, useState, useRef } from "react";

export function ScanQR() {
    const [scanResult, setScanResult] = useState<string | null>(null);
    const [isOpen, setIsOpen] = useState(false);
    const scannerRef = useRef<Html5QrcodeScanner | null>(null);

    useEffect(() => {
        // Create scanner when dialog opens (but don't auto-start camera)
        if (isOpen && !scanResult) {
            const timer = setTimeout(() => {
                const element = document.getElementById("reader");
                if (element && !scannerRef.current) {
                    scannerRef.current = new Html5QrcodeScanner(
                        "reader",
                        {
                            qrbox: {
                                width: 250,
                                height: 250,
                            },
                            fps: 5,
                            // This shows the selection interface without auto-starting
                            rememberLastUsedCamera: true,
                            showTorchButtonIfSupported: true,
                        },
                        false // This parameter controls verbose logging, set to false
                    );

                    function success(result: string) {
                        if (scannerRef.current) {
                            scannerRef.current.clear().catch(console.error);
                            scannerRef.current = null;
                        }
                        setScanResult(result);
                    }

                    function error(err: string) {
                        console.warn(err);
                    }

                    // Render the scanner interface (this shows the selection screen)
                    scannerRef.current.render(success, error);
                }
            }, 100);

            return () => clearTimeout(timer);
        }

        // Cleanup when dialog closes or result is found
        if ((!isOpen || scanResult) && scannerRef.current) {
            scannerRef.current.clear().catch(console.error);
            scannerRef.current = null;
        }
    }, [isOpen, scanResult]);

    const handleScanAnother = () => {
        setScanResult(null);
    };

    const handleClose = () => {
        setScanResult(null);
        setIsOpen(false);
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button size={"sm"} className="px-3 font-normal">
                    <Scan
                        size={16}
                        color="#fff"
                        className="[&>*]:stroke-2 text-p4"
                    />
                    Scan QR
                </Button>
            </DialogTrigger>
            <DialogContent
                className="sm:max-w-md bg-white"
                onPointerDownOutside={(e) => e.preventDefault()}
                onEscapeKeyDown={(e) => e.preventDefault()}
            >
                <DialogHeader>
                    <DialogTitle className="text-center text-s2 text-grey-900 pb-3">
                        Scan QR
                    </DialogTitle>
                    <DialogDescription className="text-center text-p1 text-grey-800">
                        {scanResult
                            ? "QR Code scanned successfully!"
                            : "Position the QR code in front of the camera"}
                    </DialogDescription>
                </DialogHeader>

                <div className="grid w-full gap-4">
                    {scanResult ? (
                        // Show scan result
                        <div className="text-center space-y-4">
                            <div className="p-4 bg-green-50 rounded-lg border">
                                <p className="text-p1 font-medium text-green-800 mb-2">
                                    Scanned Result:
                                </p>
                                <a
                                    href={scanResult}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-600 hover:text-blue-800 underline break-all"
                                >
                                    {scanResult}
                                </a>
                            </div>
                            <div className="flex gap-2">
                                <Button
                                    variant="outline"
                                    onClick={handleScanAnother}
                                    className="flex-1"
                                >
                                    Scan Another
                                </Button>
                                <Button
                                    onClick={handleClose}
                                    className="flex-1"
                                >
                                    Done
                                </Button>
                            </div>
                        </div>
                    ) : (
                        // Show scanner interface (with selection screen first)
                        <div
                            id="reader"
                            style={{ width: "100%", minHeight: "350px" }}
                        ></div>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
}
