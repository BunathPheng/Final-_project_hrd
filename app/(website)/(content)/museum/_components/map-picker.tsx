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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useRouter, useSearchParams } from 'next/navigation';

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
    onLocationSelect?: (coords: LatLng, address?: string, distance?: string) => void;
};

const libraries: ("places")[] = ["places"];

export const MapPicker: React.FC<MapPickerProps> = ({ onLocationSelect }) => {
    const router = useRouter();
    const searchParams = useSearchParams();

    // Use useLoadScript hook instead of LoadScript component
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
        libraries: libraries,
        preventGoogleFontsLoading: true,
    });

    const [selectedPosition, setSelectedPosition] = useState<LatLng | null>(null);
    const [selectedAddress, setSelectedAddress] = useState<string>("");
    const [selectedDistance, setSelectedDistance] = useState<string>("5");
    const [mapCenter, setMapCenter] = useState<LatLng>({
        lat: 11.5658595,
        lng: 104.9265715
    });
    const [isLoadingAddress, setIsLoadingAddress] = useState(false);
    const [addressSuggestions, setAddressSuggestions] = useState<AddressSuggestion[]>([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [hasInitialized, setHasInitialized] = useState(false);
    const [locationError, setLocationError] = useState<string>("");

    const mapRef = useRef<google.maps.Map | null>(null);
    const geocoderRef = useRef<google.maps.Geocoder | null>(null);
    const placesServiceRef = useRef<google.maps.places.AutocompleteService | null>(null);
    const placesDetailsServiceRef = useRef<google.maps.places.PlacesService | null>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const circleRef = useRef<google.maps.Circle | null>(null);

    const mapOptions = {
        disableDefaultUI: false,
        zoomControl: true,
        streetViewControl: false,
        mapTypeControl: true,
        fullscreenControl: true,
    };

    // Circle options - memoized to prevent unnecessary re-renders
    const circleOptions = React.useMemo(() => ({
        strokeColor: "#b50000",
        strokeOpacity: 1,
        strokeWeight: 2,
        fillColor: "#b50000",
        fillOpacity: 0.1,
        clickable: false,
        draggable: false,
        editable: false,
        geodesic: false,
        zIndex: 1
    }), []);

    // Function to remove existing circle and create a new one
    const updateCircle = useCallback((position: LatLng, distance: string) => {
        if (!mapRef.current) return;

        // Remove previous circle if it exists
        if (circleRef.current) {
            circleRef.current.setMap(null);
            circleRef.current = null;
        }

        // Create new circle
        const newCircle = new google.maps.Circle({
            center: position,
            radius: parseFloat(distance) * 1000,
            map: mapRef.current,
            ...circleOptions
        });

        circleRef.current = newCircle;
    }, [circleOptions]);

    // Enhanced geolocation function with retry logic
    const getCurrentLocationWithRetry = useCallback(async (maxRetries: number = 2): Promise<GeolocationPosition> => {
        for (let attempt = 0; attempt < maxRetries; attempt++) {
            try {
                const position = await new Promise<GeolocationPosition>((resolve, reject) => {
                    navigator.geolocation.getCurrentPosition(
                        resolve,
                        reject,
                        {
                            enableHighAccuracy: true,
                            timeout: 15000,
                            maximumAge: attempt === 0 ? 0 : 60000
                        }
                    );
                });
                console.log(`Geolocation attempt ${attempt + 1} success:`, {
                    coords: position.coords,
                    accuracy: position.coords.accuracy,
                    timestamp: new Date(position.timestamp).toLocaleString()
                });
                if (position.coords.accuracy && position.coords.accuracy > 100 && attempt < maxRetries - 1) {
                    console.log(`Location accuracy poor (${position.coords.accuracy}m), retrying...`);
                    await new Promise(resolve => setTimeout(resolve, 1000));
                    continue;
                }
                return position;
            } catch (error) {
                console.log(`Geolocation attempt ${attempt + 1} failed:`, error);
                if (attempt === maxRetries - 1) throw error;
                await new Promise(resolve => setTimeout(resolve, 1000));
            }
        }
        throw new Error('All geolocation attempts failed');
    }, []);

    // Function to update URL with current location and distance
    const updateURL = useCallback((position: LatLng, distance: string) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set('lat', position.lat.toFixed(6));
        params.set('lng', position.lng.toFixed(6));
        params.set('distance', distance);
        router.push(`?${params.toString()}`, { scroll: false });
    }, [router, searchParams]);

    // Initialize from URL parameters
    useEffect(() => {
        const lat = searchParams.get('lat');
        const lng = searchParams.get('lng');
        const distance = searchParams.get('distance');
        if (lat && lng) {
            const position = {
                lat: parseFloat(lat),
                lng: parseFloat(lng)
            };
            setSelectedPosition(position);
            setMapCenter(position);
        }
        if (distance) {
            setSelectedDistance(distance);
        }
    }, [searchParams]);

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
                        console.log("Geocoder failed due to: " + status);
                        resolve("");
                    }
                }
            );
        });
    }, []);

    // Auto-select initial location
    const autoSelectInitialLocation = useCallback(async () => {
        if (hasInitialized) return;

        const urlLat = searchParams.get('lat');
        const urlLng = searchParams.get('lng');
        if (urlLat && urlLng) {
            const position = {
                lat: parseFloat(urlLat),
                lng: parseFloat(urlLng)
            };
            const address = await getAddressFromCoords(position);
            setSelectedAddress(address);
            updateCircle(position, selectedDistance);
            onLocationSelect?.(position, address, selectedDistance);
            setHasInitialized(true);
            return;
        }

        setHasInitialized(true);
        setIsLoadingAddress(true);
        setLocationError("");

        if (navigator.geolocation) {
            try {
                const position = await getCurrentLocationWithRetry(2);
                const pos = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                };
                setMapCenter(pos);
                setSelectedPosition(pos);
                const address = await getAddressFromCoords(pos);
                setSelectedAddress(address);
                setIsLoadingAddress(false);
                updateURL(pos, selectedDistance);
                updateCircle(pos, selectedDistance);
                onLocationSelect?.(pos, address, selectedDistance);
            } catch (error: any) {
                console.log("Geolocation failed:", error);
                setLocationError(getGeolocationErrorMessage(error));
                const fallbackPos = {
                    lat: 11.5658595,
                    lng: 104.9265715
                };
                setMapCenter(fallbackPos);
                setSelectedPosition(fallbackPos);
                const address = await getAddressFromCoords(fallbackPos);
                setSelectedAddress(address);
                setIsLoadingAddress(false);
                updateURL(fallbackPos, selectedDistance);
                updateCircle(fallbackPos, selectedDistance);
                onLocationSelect?.(fallbackPos, address, selectedDistance);
            }
        } else {
            console.log("Geolocation not supported, using fallback location");
            setLocationError("Geolocation is not supported by this browser");
            const fallbackPos = {
                lat: 11.5658595,
                lng: 104.9265715
            };
            setMapCenter(fallbackPos);
            setSelectedPosition(fallbackPos);
            const address = await getAddressFromCoords(fallbackPos);
            setSelectedAddress(address);
            setIsLoadingAddress(false);
            updateURL(fallbackPos, selectedDistance);
            updateCircle(fallbackPos, selectedDistance);
            onLocationSelect?.(fallbackPos, address, selectedDistance);
        }
    }, [hasInitialized, getAddressFromCoords, onLocationSelect, selectedDistance, updateURL, searchParams, getCurrentLocationWithRetry, updateCircle]);

    // Helper function to get user-friendly error messages
    const getGeolocationErrorMessage = (error: any): string => {
        if (error?.code) {
            switch (error.code) {
                case 1:
                    return "Location access denied. Please enable location permissions and try again.";
                case 2:
                    return "Location unavailable. Please check your GPS/location settings.";
                case 3:
                    return "Location request timed out. Please try again.";
                default:
                    return "Unable to get your location. Using default location.";
            }
        }
        return "Location detection failed. Using default location.";
    };

    // Initialize services when map loads
    const onMapLoad = useCallback((map: google.maps.Map) => {
        mapRef.current = map;
        geocoderRef.current = new google.maps.Geocoder();
        placesServiceRef.current = new google.maps.places.AutocompleteService();
        placesDetailsServiceRef.current = new google.maps.places.PlacesService(map);
        if (!hasInitialized) autoSelectInitialLocation();
    }, [hasInitialized, autoSelectInitialLocation]);

    // Auto-initialize when component mounts
    useEffect(() => {
        const timer = setTimeout(() => {
            if (!hasInitialized && isLoaded) autoSelectInitialLocation();
        }, 2000);
        return () => clearTimeout(timer);
    }, [autoSelectInitialLocation, hasInitialized, isLoaded]);

    // Function to get place suggestions
    const getPlaceSuggestions = useCallback((input: string) => {
        if (!placesServiceRef.current || input.length < 3) {
            setAddressSuggestions([]);
            setShowSuggestions(false);
            return;
        }
        placesServiceRef.current.getPlacePredictions(
            {
                input,
                componentRestrictions: { country: 'kh' },
                types: ['establishment', 'geocode'],
            },
            (predictions, status) => {
                if (status === google.maps.places.PlacesServiceStatus.OK && predictions) {
                    const suggestions = predictions.slice(0, 5).map(prediction => ({
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

    // Function to select place from suggestion
    const selectPlaceFromSuggestion = useCallback((placeId: string, description: string) => {
        if (!placesDetailsServiceRef.current) return;
        setShowSuggestions(false);
        setSelectedAddress(description);
        setIsLoadingAddress(true);
        placesDetailsServiceRef.current.getDetails(
            {
                placeId,
                fields: ['geometry']
            },
            (place, status) => {
                setIsLoadingAddress(false);
                if (status === google.maps.places.PlacesServiceStatus.OK && place?.geometry?.location) {
                    const position = {
                        lat: place.geometry.location.lat(),
                        lng: place.geometry.location.lng(),
                    };
                    setSelectedPosition(position);
                    setMapCenter(position);
                    updateURL(position, selectedDistance);
                    updateCircle(position, selectedDistance);
                    onLocationSelect?.(position, description, selectedDistance);
                } else {
                    console.log("Place details request failed due to: " + status);
                }
            }
        );
    }, [onLocationSelect, selectedDistance, updateURL, updateCircle]);

    // Function to search address
    const searchAddress = useCallback(async () => {
        if (!selectedAddress.trim() || !geocoderRef.current) return;
        setIsLoadingAddress(true);
        setShowSuggestions(false);
        geocoderRef.current.geocode(
            { address: selectedAddress },
            (results, status) => {
                setIsLoadingAddress(false);
                if (status === "OK" && results && results[0]) {
                    const position = {
                        lat: results[0].geometry.location.lat(),
                        lng: results[0].geometry.location.lng(),
                    };
                    setSelectedPosition(position);
                    setMapCenter(position);
                    setSelectedAddress(results[0].formatted_address);
                    updateURL(position, selectedDistance);
                    updateCircle(position, selectedDistance);
                    onLocationSelect?.(position, results[0].formatted_address, selectedDistance);
                } else {
                    console.log("Geocoder failed due to: " + status);
                    if (addressSuggestions.length > 0) {
                        selectPlaceFromSuggestion(addressSuggestions[0].placeId, addressSuggestions[0].description);
                    }
                }
            }
        );
    }, [selectedAddress, addressSuggestions, selectPlaceFromSuggestion, onLocationSelect, selectedDistance, updateURL, updateCircle]);

    const handleMapClick = useCallback(
        async (event: google.maps.MapMouseEvent) => {
            if (!event.latLng) return;
            const position = {
                lat: event.latLng.lat(),
                lng: event.latLng.lng(),
            };
            setSelectedPosition(position);
            setShowSuggestions(false);
            const address = await getAddressFromCoords(position);
            setSelectedAddress(address);
            updateURL(position, selectedDistance);
            updateCircle(position, selectedDistance);
            onLocationSelect?.(position, address, selectedDistance);
        },
        [onLocationSelect, getAddressFromCoords, selectedDistance, updateURL, updateCircle]
    );

    const handleMarkerDragEnd = useCallback(
        async (event: google.maps.MapMouseEvent) => {
            if (!event.latLng) return;
            const position = {
                lat: event.latLng.lat(),
                lng: event.latLng.lng(),
            };
            setSelectedPosition(position);
            const address = await getAddressFromCoords(position);
            setSelectedAddress(address);
            updateURL(position, selectedDistance);
            updateCircle(position, selectedDistance);
            onLocationSelect?.(position, address, selectedDistance);
        },
        [onLocationSelect, getAddressFromCoords, selectedDistance, updateURL, updateCircle]
    );

    // Get current location
    const getCurrentLocation = useCallback(async () => {
        if (!navigator.geolocation) {
            setLocationError("Geolocation is not supported by this browser");
            return;
        }
        setIsLoadingAddress(true);
        setLocationError("");
        try {
            const position = await getCurrentLocationWithRetry(3);
            const pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude,
            };
            setMapCenter(pos);
            setSelectedPosition(pos);
            setShowSuggestions(false);
            const address = await getAddressFromCoords(pos);
            setSelectedAddress(address);
            updateURL(pos, selectedDistance);
            updateCircle(pos, selectedDistance);
            onLocationSelect?.(pos, address, selectedDistance);
        } catch (error: any) {
            console.log("Manual geolocation failed:", error);
            setLocationError(getGeolocationErrorMessage(error));
        } finally {
            setIsLoadingAddress(false);
        }
    }, [getCurrentLocationWithRetry, getAddressFromCoords, updateURL, selectedDistance, onLocationSelect, updateCircle]);

    // Handle distance change
    const handleDistanceChange = (value: string) => {
        setSelectedDistance(value);
        if (selectedPosition) {
            updateURL(selectedPosition, value);
            updateCircle(selectedPosition, value);
            onLocationSelect?.(selectedPosition, selectedAddress, value);
        }
    };

    // Handle address input change
    const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSelectedAddress(value);
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
                selectPlaceFromSuggestion(addressSuggestions[0].placeId, addressSuggestions[0].description);
            } else {
                searchAddress();
            }
        } else if (e.key === 'Escape') {
            setShowSuggestions(false);
        }
    };

    const handleInputFocus = () => {
        if (selectedAddress.length >= 3 && addressSuggestions.length > 0) {
            setShowSuggestions(true);
        }
    };

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

    // Cleanup circle reference on unmount
    useEffect(() => {
        return () => {
            if (circleRef.current) {
                circleRef.current.setMap(null);
                circleRef.current = null;
            }
        };
    }, []);

    if (loadError) {
        return <div className="self-center justify-self-center">Error loading Google Maps</div>;
    }

    if (!isLoaded) {
        return (
            <div className="w-full h-full min-h-[400px] flex items-center justify-center bg-grey-100">
                <div className="text-center">
                    <div className="animate-spin w-8 h-8 border-4 border-grey-500 border-t-transparent rounded-full mx-auto mb-4"></div>
                    <div className="text-gray-600">
                        {isLoaded ? 'Loading Google Maps...' : 'Initializing map...'}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div style={{ width: "100%", height: "100%" }}>
            <div className="grid gap-5">
                {locationError && (
                    <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 px-4 py-2 rounded-md text-sm">
                        {locationError}
                    </div>
                )}
                <fieldset className="flex flex-wrap sm:flex-nowrap w-full items-center justify-between gap-5">
                    <div className="grow-1 sm:basis-1/2 flex items-center gap-5">
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
                            />
                            {showSuggestions && addressSuggestions.length > 0 && (
                                <div className="absolute top-full left-0 right-0 z-50 w-full bg-white border border-grey-200 rounded-md shadow-lg max-h-60 overflow-y-auto">
                                    {addressSuggestions.map((suggestion, index) => (
                                        <button
                                            key={suggestion.placeId}
                                            className={`flex w-full px-4 py-2 hover:bg-grey-100 cursor-pointer text-sm border-b border-grey-100 last:border-b-0 ${index === 0 ? 'bg-grey-50' : ''}`}
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
                            title="Get current location"
                        >
                            <Gps size={32} />
                        </Button>
                    </div>
                    <div className="flex items-center gap-5">
                        <label htmlFor="distance" className="text-p1">Distance:</label>
                        <Select
                            name="distance"
                            value={selectedDistance}
                            onValueChange={handleDistanceChange}
                        >
                            <SelectTrigger className="w-48">
                                <SelectValue placeholder="Within 5 km" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="1">Within 1 km</SelectItem>
                                <SelectItem value="2">Within 2 km</SelectItem>
                                <SelectItem value="5">Within 5 km</SelectItem>
                                <SelectItem value="10">Within 10 km</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </fieldset>
                <div className="w-full h-[26rem] rounded-sm border border-grey-400 overflow-hidden">
                    <GoogleMap
                        ref={mapRef as any}
                        mapContainerStyle={{ width: "100%", height: "500px" }}
                        center={mapCenter}
                        zoom={12}
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
            </div>
        </div>
    );
};
