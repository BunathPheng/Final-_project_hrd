/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState, useCallback, useRef, useEffect } from "react";
import {
    GoogleMap,
    useLoadScript,
    Marker,
} from "@react-google-maps/api";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Gps } from "iconsax-reactjs";
import { AnimatedSection } from "@/components/feature/animation/animation-section";

// Props
type LatLng = {
    lat: number;
    lng: number;
};

type AddressSuggestion = {
    placeId: string;
    description: string;
};

type MapPickerProps = {
    onLocationSelect?: (coords: LatLng, address?: string) => void;
    initialLocation?: LatLng; // Add initial location prop
};

const libraries: ("places")[] = ["places"];

// Helper function to round coordinates to 8 decimal places
const roundToEightDecimals = (coord: number): number => {
    return Math.round(coord * 100000000) / 100000000;
};

// Helper function to format LatLng with 8 decimal places
const formatLatLng = (position: LatLng): LatLng => {
    return {
        lat: roundToEightDecimals(position.lat),
        lng: roundToEightDecimals(position.lng)
    };
};

export const MapPickerMuseumRegister: React.FC<MapPickerProps> = ({ 
    onLocationSelect, 
    initialLocation 
}) => {
    // Use useLoadScript hook instead of LoadScript component
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
        libraries: libraries,
        preventGoogleFontsLoading: true, // Prevents loading Google Fonts
    });

    const [selectedPosition, setSelectedPosition] = useState<LatLng | null>(
        initialLocation ? formatLatLng(initialLocation) : null
    );

    console.log("selectedPosition", selectedPosition);

    const [selectedAddress, setSelectedAddress] = useState<string>("");
    const [mapCenter, setMapCenter] = useState<LatLng>(
        initialLocation ? formatLatLng(initialLocation) : {
            lat: roundToEightDecimals(11.5658595),
            lng: roundToEightDecimals(104.9265715)
        }
    );
    const [isLoadingAddress, setIsLoadingAddress] = useState(false);
    const [addressSuggestions, setAddressSuggestions] = useState<AddressSuggestion[]>([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [hasInitialized, setHasInitialized] = useState(false);

    const mapRef = useRef<google.maps.Map | null>(null);
    const geocoderRef = useRef<google.maps.Geocoder | null>(null);
    const placesServiceRef = useRef<google.maps.places.AutocompleteService | null>(null);
    const placesDetailsServiceRef = useRef<google.maps.places.PlacesService | null>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const mapOptions = {
        disableDefaultUI: false,
        zoomControl: true,
        streetViewControl: false,
        mapTypeControl: true,
        fullscreenControl: true,
    };
    
    // Handle initial location prop changes
    useEffect(() => {
        if (initialLocation && (!selectedPosition || 
            selectedPosition.lat !== initialLocation.lat || 
            selectedPosition.lng !== initialLocation.lng)) {
            const formattedLocation = formatLatLng(initialLocation);
            setSelectedPosition(formattedLocation);
            setMapCenter(formattedLocation);
            
            // Get address for initial location if geocoder is available
            if (geocoderRef.current) {
                getAddressFromCoords(formattedLocation).then(address => {
                    setSelectedAddress(address);
                });
            }
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [initialLocation]);

    // Move getAddressFromCoords BEFORE autoSelectInitialLocation
    const getAddressFromCoords = useCallback(async (position: LatLng) => {
        if (!geocoderRef.current) return "";

        setIsLoadingAddress(true);

        return new Promise<string>((resolve) => {
            geocoderRef.current!.geocode(
                { location: position },
                (results, status) => {
                    setIsLoadingAddress(false);
                    if (status === "OK" && results && results[0]) {
                        const address = results[0].formatted_address;
                        resolve(address);
                    } else {
                        resolve("");
                    }
                }
            );
        });
    }, []);

    // Auto-select initial location (current location or fallback)
    const autoSelectInitialLocation = useCallback(async () => {
        if (hasInitialized) return;

        // If we have an initial location, use it and get its address
        if (initialLocation) {
            const formattedLocation = formatLatLng(initialLocation);
            const address = await getAddressFromCoords(formattedLocation);
            setSelectedAddress(address);
            onLocationSelect?.(formattedLocation, address);
            setHasInitialized(true);
            return;
        }

        setHasInitialized(true);
        setIsLoadingAddress(true);

        // Try to get current location first
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    const pos = formatLatLng({
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    });

                    setMapCenter(pos);
                    setSelectedPosition(pos);

                    // Get address for current location
                    const address = await getAddressFromCoords(pos);
                    setSelectedAddress(address);
                    setIsLoadingAddress(false);

                    // Call callback
                    onLocationSelect?.(pos, address);
                },
                async () => {
                    // Geolocation denied or failed - use fallback location
                    const fallbackPos = formatLatLng({
                        lat: 11.5658595,
                        lng: 104.9265715
                    });

                    setMapCenter(fallbackPos);
                    setSelectedPosition(fallbackPos);

                    // Get address for fallback location
                    const address = await getAddressFromCoords(fallbackPos);
                    setSelectedAddress(address);
                    setIsLoadingAddress(false);

                    // Call callback
                    onLocationSelect?.(fallbackPos, address);
                },
                {
                    enableHighAccuracy: true,
                    timeout: 10000, // 10 second timeout
                    maximumAge: 300000 // 5 minutes cache
                }
            );
        } else {
            // Geolocation not supported - use fallback location
            const fallbackPos = formatLatLng({
                lat: 11.5658595,
                lng: 104.9265715
            });

            setMapCenter(fallbackPos);
            setSelectedPosition(fallbackPos);

            // Get address for fallback location
            const address = await getAddressFromCoords(fallbackPos);
            setSelectedAddress(address);
            setIsLoadingAddress(false);

            // Call callback
            onLocationSelect?.(fallbackPos, address);
        }
    }, [hasInitialized, getAddressFromCoords, onLocationSelect, initialLocation]);

    // Initialize services when map loads
    const onMapLoad = useCallback((map: google.maps.Map) => {
        mapRef.current = map;
        geocoderRef.current = new google.maps.Geocoder();
        placesServiceRef.current = new google.maps.places.AutocompleteService();
        placesDetailsServiceRef.current = new google.maps.places.PlacesService(map);

        // Auto-select location after map loads
        if (!hasInitialized) {
            autoSelectInitialLocation();
        }
    }, [hasInitialized, autoSelectInitialLocation]);

    // Auto-initialize when component mounts (fallback if map doesn't load)
    useEffect(() => {
        const timer = setTimeout(() => {
            if (!hasInitialized && isLoaded) {
                autoSelectInitialLocation();
            }
        }, 2000); // Wait 2 seconds for map to load

        return () => clearTimeout(timer);
    }, [autoSelectInitialLocation, hasInitialized, isLoaded]);

    // Function to get place suggestions with debouncing
    const getPlaceSuggestions = useCallback((input: string) => {
        if (!placesServiceRef.current || input.length < 3) {
            setAddressSuggestions([]);
            setShowSuggestions(false);
            return;
        }

        placesServiceRef.current.getPlacePredictions(
            {
                input,
                componentRestrictions: { country: 'kh' }, // Cambodia - change as needed
                types: ['establishment', 'geocode'], // Faster response with specific types
            },
            (predictions, status) => {
                if (status === google.maps.places.PlacesServiceStatus.OK && predictions) {
                    const suggestions = predictions.slice(0, 5).map(prediction => ({ // Limit to 5 suggestions for faster loading
                        placeId: prediction.place_id,
                        description: prediction.description,
                    }));
                    setAddressSuggestions(suggestions);
                    setShowSuggestions(true);
                } else {
                    setAddressSuggestions([]);
                    setShowSuggestions(false);
                }
            }
        );
    }, []);

    // Function to get place details and set location
    const selectPlaceFromSuggestion = useCallback((placeId: string, description: string) => {
        if (!placesDetailsServiceRef.current) return;

        // Immediately hide suggestions and update address for faster UI response
        setShowSuggestions(false);
        setSelectedAddress(description);
        setIsLoadingAddress(true);

        placesDetailsServiceRef.current.getDetails(
            {
                placeId,
                fields: ['geometry'] // Only request geometry for faster response
            },
            (place, status) => {
                setIsLoadingAddress(false);
                if (status === google.maps.places.PlacesServiceStatus.OK && place?.geometry?.location) {
                    const position = formatLatLng({
                        lat: place.geometry.location.lat(),
                        lng: place.geometry.location.lng(),
                    });

                    setSelectedPosition(position);
                    setMapCenter(position);

                    // Call callback
                    onLocationSelect?.(position, description);
                }
            }
        );
    }, [onLocationSelect]);

    // Function to search address when Enter is pressed
    const searchAddress = useCallback(async () => {
        if (!selectedAddress.trim() || !geocoderRef.current) return;

        setIsLoadingAddress(true);
        setShowSuggestions(false);

        geocoderRef.current.geocode(
            { address: selectedAddress },
            (results, status) => {
                setIsLoadingAddress(false);
                if (status === "OK" && results && results[0]) {
                    const position = formatLatLng({
                        lat: results[0].geometry.location.lat(),
                        lng: results[0].geometry.location.lng(),
                    });

                    setSelectedPosition(position);
                    setMapCenter(position);
                    setSelectedAddress(results[0].formatted_address);

                    // Call callback
                    onLocationSelect?.(position, results[0].formatted_address);
                } else {
                    // If direct geocoding fails, try using the first suggestion if available
                    if (addressSuggestions.length > 0) {
                        selectPlaceFromSuggestion(addressSuggestions[0].placeId, addressSuggestions[0].description);
                    }
                }
            }
        );
    }, [selectedAddress, addressSuggestions, selectPlaceFromSuggestion, onLocationSelect]);

    const handleMapClick = useCallback(
        async (event: google.maps.MapMouseEvent) => {
            if (!event.latLng) return;
            const position = formatLatLng({
                lat: event.latLng.lat(),
                lng: event.latLng.lng(),
            });

            setSelectedPosition(position);
            setShowSuggestions(false);

            // Get address for the selected position
            const address = await getAddressFromCoords(position);
            setSelectedAddress(address);

            // Call callback
            onLocationSelect?.(position, address);
        },
        [onLocationSelect, getAddressFromCoords]
    );

    const handleMarkerDragEnd = useCallback(
        async (event: google.maps.MapMouseEvent) => {
            if (!event.latLng) return;
            const position = formatLatLng({
                lat: event.latLng.lat(),
                lng: event.latLng.lng(),
            });

            setSelectedPosition(position);

            // Get address for the new position
            const address = await getAddressFromCoords(position);
            setSelectedAddress(address);

            // Call callback
            onLocationSelect?.(position, address);
        },
        [onLocationSelect, getAddressFromCoords]
    );

    const getCurrentLocation = () => {
        if (navigator.geolocation) {
            setIsLoadingAddress(true);
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    const pos = formatLatLng({
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    });
                    setMapCenter(pos);
                    setSelectedPosition(pos);
                    setShowSuggestions(false);

                    // Get address for current location
                    const address = await getAddressFromCoords(pos);
                    setSelectedAddress(address);

                    // Call callback
                    onLocationSelect?.(pos, address);
                },
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                (error) => {
                    setIsLoadingAddress(false);
                },
                {
                    enableHighAccuracy: true,
                    timeout: 10000,
                    maximumAge: 300000
                }
            );
        }
    };

    // Handle manual address input change
    const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSelectedAddress(value);

        // Get suggestions when typing
        if (value.length >= 3) {
            getPlaceSuggestions(value);
        } else {
            setShowSuggestions(false);
            setAddressSuggestions([]);
        }
    };

    // Handle key press events
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            if (showSuggestions && addressSuggestions.length > 0) {
                // If suggestions are showing, select the first one
                selectPlaceFromSuggestion(addressSuggestions[0].placeId, addressSuggestions[0].description);
            } else {
                // Otherwise, search for the typed address
                searchAddress();
            }
        } else if (e.key === 'Escape') {
            // Hide suggestions when Escape is pressed
            setShowSuggestions(false);
        }
    };

    // Handle input focus
    const handleInputFocus = () => {
        if (selectedAddress.length >= 3 && addressSuggestions.length > 0) {
            setShowSuggestions(true);
        }
    };

    // Handle input blur (with delay to allow clicking on suggestions)
    const handleInputBlur = () => {
        setTimeout(() => {
            setShowSuggestions(false);
        }, 150);
    };

    // Close suggestions when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (inputRef.current && !inputRef.current.contains(event.target as Node)) {
                setShowSuggestions(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // Handle loading and error states
    if (loadError) {
        return <div className="self-center justify-self-center">Error loading Google Maps</div>;
    }

    if (!isLoaded) {
        return <div className="self-center justify-self-center">Loading Google Maps...</div>;
    }

    return (
        <div style={{ width: "100%" }}>
            <div className="grid gap-5">
                <fieldset className="flex w-full items-center justify-between gap-5">
                    <div className="flex items-center gap-5 w-full">
                        <div className="flex-1 relative" ref={inputRef}>
                            <Input
                                type="text"
                                name="searchAddress"
                                placeholder={
                                    isLoadingAddress
                                        ? (hasInitialized ? "Loading address..." : "Getting your location...")
                                        : "Enter your location or use current location"
                                }
                                value={selectedAddress}
                                onChange={handleAddressChange}
                                onKeyDown={handleKeyDown}
                                onFocus={handleInputFocus}
                                onBlur={handleInputBlur}
                                disabled={isLoadingAddress}
                                className="pr-16"
                            />

                            {/* Address Suggestions Dropdown */}
                            {showSuggestions && addressSuggestions.length > 0 && (
                                <div className="absolute top-full left-0 right-0 z-50 w-full bg-white border border-grey-200 rounded-md shadow-lg max-h-60 overflow-y-auto">
                                    {addressSuggestions.map((suggestion, index) => (
                                        <button
                                            key={suggestion.placeId}
                                            className={`flex w-full px-4 py-2 hover:bg-grey-100 cursor-pointer text-sm border-b border-grey-100 last:border-b-0 ${index === 0 ? 'bg-grey-50' : ''
                                                }`}
                                            onClick={() => selectPlaceFromSuggestion(suggestion.placeId, suggestion.description)}
                                        >
                                            {suggestion.description}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                        <Button
                            type="button"
                            onClick={getCurrentLocation}
                            size={"icon"}
                            className="h-12 w-12"
                            disabled={isLoadingAddress}
                        >
                            <Gps size={32} />
                        </Button>
                    </div>
                </fieldset>

                {/* Google Map */}
                <AnimatedSection animation="fade-up">
                    <div className="w-full rounded-sm border border-grey-400 overflow-hidden">
                        <GoogleMap
                            ref={mapRef as any}
                            mapContainerStyle={{ width: "100%", height: "300px" }}
                            center={mapCenter}
                            zoom={15}
                            options={mapOptions}
                            onClick={handleMapClick}
                            onLoad={onMapLoad}
                        >
                            {selectedPosition && (
                                <Marker
                                    icon={{
                                        url: "/icon/user-marker.png",
                                        size: new google.maps.Size(40, 40),
                                        scaledSize: new google.maps.Size(40, 40)
                                    }}
                                    position={selectedPosition}
                                    draggable={true}
                                    onDragEnd={handleMarkerDragEnd}
                                />
                            )}
                        </GoogleMap>
                    </div>
                </AnimatedSection>
            </div>
        </div>
    );
};