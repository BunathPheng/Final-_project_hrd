"use client"

import Innercard from "@/components/feature/card/inner-card";
import { CloseCircle, EmptyWallet, TickCircle } from "iconsax-reactjs";
import { AddAccount } from "./add-account";
import { useEffect, useState } from "react";
import { Disconnect } from "./disconnect";

export function WebillForm() {
    const [isConnect, setIsConnect] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    // Function to check localStorage and update state
    const checkConnectionStatus = () => {
        try {
            const webillConnection = localStorage.getItem("connect-webill");
            setIsConnect(webillConnection === "true");
        } catch (error) {
            console.error("Error reading from localStorage:", error);
            setIsConnect(false);
        }
    };

    useEffect(() => {
        checkConnectionStatus();
        setIsLoading(false);
    }, []);

    const handleConnect = () => {
        try {
            localStorage.setItem("connect-webill", "true");
            setIsConnect(true);
        } catch (error) {
            console.error("Error saving to localStorage:", error);
        }
    };

    const handleDisconnect = () => {
        try {
            localStorage.removeItem("connect-webill");
            setIsConnect(false);
        } catch (error) {
            console.error("Error removing from localStorage:", error);
        }
    };

    // Show loading state during hydration
    if (isLoading) {
        return (
            <Innercard>
                <div className="grid w-full gap-5">
                    <div className="flex gap-5 items-center justify-between w-full">
                        <div className="grid gap-1">
                            <div className="flex items-center gap-2">
                                <EmptyWallet size={28} className="[&>*]:stroke-grey-900" />
                                <h4 className="text-h4 text-grey-900">WeBill365 Information</h4>
                            </div>
                            <p className="text-p1 text-grey-600">Loading...</p>
                        </div>
                    </div>
                </div>
            </Innercard>
        );
    }

    return (
        <>
            <Innercard>
                <div className="grid w-full gap-5">
                    <div className="flex gap-5 items-center justify-between w-full">
                        <div className="grid gap-1">
                            <div className="flex items-center gap-2">
                                <EmptyWallet size={28} className="[&>*]:stroke-grey-900" />
                                <h4 className="text-h4 text-grey-900">WeBill365 Information</h4>
                            </div>
                            <p className="text-p1 text-grey-600">Manage Webill Information for room payment</p>
                        </div>

                        {!isConnect && <AddAccount onConnect={handleConnect} />}
                        {isConnect && <Disconnect onDisconnect={handleDisconnect} />}
                    </div>

                    {!isConnect && (
                        <div className="border border-grey-400 bg-grey-50 rounded-md p-5 flex items-center gap-5">
                            <CloseCircle size={45} className="[&>*]:stroke-primary-700" />
                            <div className="grid gap-1">
                                <h6 className="text-s1 text-grey-900">Not connected</h6>
                                <p className="text-p1 text-grey-600">Please connect your WeBill365 account in order to receive monthly payments from renters.</p>
                            </div>
                        </div>
                    )}

                    {isConnect && (
                        <div className="border border-grey-400 bg-grey-50 rounded-md p-5 flex items-center gap-5">
                            <TickCircle size={45} className="[&>*]:stroke-green" />
                            <div className="grid gap-1">
                                <h6 className="text-s1 text-grey-900">Account Connected</h6>
                                <p className="text-p1 text-grey-600">Your account is successfully connected for payment. You can now receive monthly payments from renters.</p>
                            </div>
                        </div>
                    )}
                </div>
            </Innercard>
        </>
    );
}
