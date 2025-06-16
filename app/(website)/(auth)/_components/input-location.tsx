"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Location } from "iconsax-reactjs"
import { MapPickerMuseumRegister } from "./map-picker-museum"

type LatLng = {
    lat: number;
    lng: number;
};

type LocationData = {
    address: string;
    coords: LatLng;
};

interface InputLocationProps {
    onLocationChange?: (location: LocationData) => void;
    initialValue?: LocationData;
    error?: string;
}

export function InputLocation({ 
    onLocationChange, 
    initialValue,
    error 
}: InputLocationProps) {
    const [selectedLocation, setSelectedLocation] = useState<LocationData | null>(
        initialValue || null
    );
    const [inputValue, setInputValue] = useState(initialValue?.address || "");
    const [isOpen, setIsOpen] = useState(false);

    // Update local state when initialValue changes (for form restoration)
    useEffect(() => {
        if (initialValue) {
            setSelectedLocation(initialValue);
            setInputValue(initialValue.address);
        }
    }, [initialValue]);

    // Handle location selection from map
    const handleLocationSelect = (coords: LatLng, address?: string) => {
        const locationData: LocationData = {
            coords,
            address: address || ""
        };
        setSelectedLocation(locationData);
    };
    

    // Handle save button click
    const handleSave = () => {
        if (selectedLocation) {
            setInputValue(selectedLocation.address);
            // Notify parent component about the location change
            onLocationChange?.(selectedLocation);
            setIsOpen(false);
        }
    };

    // Handle cancel button click
    const handleCancel = () => {
        // Reset to current input value if cancelled
        if (selectedLocation && selectedLocation.address !== inputValue) {
            setSelectedLocation({ 
                ...selectedLocation, 
                address: inputValue 
            });
        }
        setIsOpen(false);
    };
   
    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <div className="flex flex-col w-full gap-2">
                    <Label htmlFor="LocationMuseum">
                        Location Museum <span className="text-red-500">*</span>
                    </Label>
                    <Input
                        id="LocationMuseum"
                        name="LocationMuseum"
                        type="text"
                        placeholder="Click to select location"
                        value={inputValue}
                        readOnly
                        startIcon={<Location className="h-5 w-5 text-gray-400" />}
                        className={error ? "border-red-500" : ""}
                    />
                    {error && (
                        <p className="text-red-500 text-sm">
                            {error}
                        </p>
                    )}
                </div>
            </DialogTrigger>
            <DialogContent
                className="sm:max-w-2xl bg-white [&>button]:hidden"
                onPointerDownOutside={(e) => e.preventDefault()}
                onEscapeKeyDown={(e) => e.preventDefault()}
            >
                <DialogHeader>
                    <DialogTitle className="text-grey-900 pb-3">Choose Location</DialogTitle>
                </DialogHeader>
                <MapPickerMuseumRegister 
                    onLocationSelect={handleLocationSelect}
                    initialLocation={selectedLocation?.coords}
                />
                <DialogFooter className="space-x-3 mt-3">
                    <Button 
                        size={"md"} 
                        variant={"outline"}
                        onClick={handleCancel}
                    >
                        Cancel
                    </Button>
                    <Button 
                        size={"md"} 
                        className="px-6"
                        onClick={handleSave}
                        disabled={!selectedLocation}
                    >
                        Save
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}