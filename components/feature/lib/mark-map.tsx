/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useEffect, useRef, useState } from 'react';

interface MarkerData {
    id: string;
    position: {
        lat: number | string;
        lng: number | string;
    };
    title?: string;
}

interface GoogleMapProps {
    center: {
        lat: number | string;
        lng: number | string;
    };
    zoom?: number;
    markers?: MarkerData[];
    onError?: (error: Error) => void;
}

declare global {
    interface Window {
        google: any;
        googleMapsLoading?: boolean;
    }
}

export const MarkMap: React.FC<GoogleMapProps> = ({
    center,
    zoom = 10,
    markers = [],
    onError
}) => {
    const mapRef = useRef<HTMLDivElement>(null);
    const [map, setMap] = useState<any>(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const markersRef = useRef<any[]>([]);
    const scriptRef = useRef<HTMLScriptElement | null>(null);

    // Check if Google Maps API is already loaded
    const isGoogleMapsLoaded = () => {
        return typeof window !== 'undefined' &&
            window.google &&
            window.google.maps &&
            window.google.maps.Map;
    };

    // Load Google Maps API
    useEffect(() => {
        // If already loaded, set state and return
        if (isGoogleMapsLoaded()) {
            setIsLoaded(true);
            setIsLoading(false);
            return;
        }

        // Check if API key is available
        if (!process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY) {
            const apiError = new Error('Google Maps API key is not configured');
            setError('Google Maps API key is missing. Please add NEXT_PUBLIC_GOOGLE_MAPS_API_KEY to your environment variables.');
            onError?.(apiError);
            return;
        }

        // Check if script is already loading
        if (window.googleMapsLoading) {
            // Wait for the existing script to load
            const checkLoaded = setInterval(() => {
                if (isGoogleMapsLoaded()) {
                    setIsLoaded(true);
                    setIsLoading(false);
                    clearInterval(checkLoaded);
                }
            }, 100);
            return;
        }

        // Check if script already exists in DOM
        const existingScript = document.querySelector('script[src*="maps.googleapis.com"]');
        if (existingScript) {
            // Script exists but may not be loaded yet
            const checkLoaded = setInterval(() => {
                if (isGoogleMapsLoaded()) {
                    setIsLoaded(true);
                    setIsLoading(false);
                    clearInterval(checkLoaded);
                }
            }, 100);
            return;
        }

        // Load the script
        setIsLoading(true);
        window.googleMapsLoading = true;

        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`;
        script.async = true;
        script.defer = true;
        scriptRef.current = script;

        script.onload = () => {
            if (isGoogleMapsLoaded()) {
                setIsLoaded(true);
                setError(null);
            } else {
                const loadError = new Error('Google Maps API failed to initialize properly');
                setError('Google Maps failed to load properly. Please refresh the page.');
                onError?.(loadError);
            }
            setIsLoading(false);
            window.googleMapsLoading = false;
        };

        script.onerror = () => {
            const loadError = new Error('Failed to load Google Maps API script');
            setError('Failed to load Google Maps. Please check your internet connection and API key.');
            setIsLoading(false);
            window.googleMapsLoading = false;
            onError?.(loadError);
        };

        // Add a timeout for script loading
        const timeout = setTimeout(() => {
            if (!isGoogleMapsLoaded()) {
                const timeoutError = new Error('Google Maps API loading timeout');
                setError('Google Maps is taking too long to load. Please refresh the page.');
                setIsLoading(false);
                window.googleMapsLoading = false;
                onError?.(timeoutError);
            }
        }, 10000); // 10 second timeout

        document.head.appendChild(script);

        return () => {
            clearTimeout(timeout);
            // Don't remove the script on cleanup as it might be used by other components
        };
    }, [onError]);

    // Initialize map
    useEffect(() => {
        if (!isLoaded || !mapRef.current || map) return;

        try {
            // Ensure center has valid coordinates
            const mapCenter = {
                lat: typeof center.lat === 'string' ? parseFloat(center.lat) : center.lat,
                lng: typeof center.lng === 'string' ? parseFloat(center.lng) : center.lng
            };

            // Validate coordinates
            if (isNaN(mapCenter.lat) || isNaN(mapCenter.lng)) {
                throw new Error('Invalid map center coordinates');
            }

            if (mapCenter.lat < -90 || mapCenter.lat > 90) {
                throw new Error('Latitude must be between -90 and 90');
            }

            if (mapCenter.lng < -180 || mapCenter.lng > 180) {
                throw new Error('Longitude must be between -180 and 180');
            }

            const newMap = new window.google.maps.Map(mapRef.current, {
                center: mapCenter,
                zoom: Math.max(1, Math.min(20, zoom)), // Clamp zoom between 1 and 20
                mapTypeControl: true,
                streetViewControl: true,
                fullscreenControl: true,
                zoomControl: true,
            });

            setMap(newMap);
            setError(null);

        } catch (err) {
            const mapError = err instanceof Error ? err : new Error('Failed to initialize map');
            setError(`Map initialization failed: ${mapError.message}`);
            onError?.(mapError);
        }
    }, [isLoaded, center, zoom, map, onError]);

    // Add markers
    useEffect(() => {
        if (!map || !window.google || !isLoaded) return;

        try {
            // Clear existing markers
            markersRef.current.forEach(marker => {
                if (marker && marker.setMap) {
                    marker.setMap(null);
                }
            });
            markersRef.current = [];

            // Add new markers
            markers.forEach((markerData) => {
                try {
                    // Validate marker data
                    if (!markerData.position) {
                        console.warn(`Marker ${markerData.id} has no position`);
                        return;
                    }

                    const markerPosition = {
                        lat: typeof markerData.position.lat === 'string'
                            ? parseFloat(markerData.position.lat)
                            : markerData.position.lat,
                        lng: typeof markerData.position.lng === 'string'
                            ? parseFloat(markerData.position.lng)
                            : markerData.position.lng
                    };

                    // Validate marker coordinates
                    if (isNaN(markerPosition.lat) || isNaN(markerPosition.lng)) {
                        console.warn(`Marker ${markerData.id} has invalid coordinates`);
                        return;
                    }

                    const marker = new window.google.maps.Marker({
                        position: markerPosition,
                        map: map,
                        title: markerData.title || `Marker ${markerData.id}`,
                        animation: window.google.maps.Animation.DROP,
                    });

                    markersRef.current.push(marker);

                } catch (markerError) {
                    console.warn(`Failed to create marker ${markerData.id}:`, markerError);
                }
            });

        } catch (err) {
            const markersError = err instanceof Error ? err : new Error('Failed to add markers');
            console.error('Error adding markers:', markersError);
            onError?.(markersError);
        }
    }, [map, markers, isLoaded, onError]);

    // Cleanup markers on unmount
    useEffect(() => {
        return () => {
            markersRef.current.forEach(marker => {
                if (marker && marker.setMap) {
                    marker.setMap(null);
                }
            });
            markersRef.current = [];
        };
    }, []);

    if (error) {
        return (
            <div className="w-full h-full min-h-[400px] flex items-center justify-center bg-red-50 border border-red-200 rounded-lg">
                <div className="text-center p-6 max-w-md">
                    <div className="text-red-500 text-4xl mb-4">🗺️</div>
                    <h3 className="text-lg font-semibold text-red-800 mb-2">Map Error</h3>
                    <p className="text-red-600 mb-4 text-sm">{error}</p>
                    <button
                        onClick={() => {
                            setError(null);
                            setIsLoaded(false);
                            setIsLoading(true);
                            window.location.reload();
                        }}
                        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors text-sm"
                    >
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    if (isLoading || !isLoaded) {
        return (
            <div className="w-full h-full min-h-[400px] flex items-center justify-center bg-grey-100">
                <div className="text-center">
                    <div className="animate-spin w-8 h-8 border-4 border-grey-500 border-t-transparent rounded-full mx-auto mb-4"></div>
                    <div className="text-gray-600">
                        {isLoading ? 'Loading Google Maps...' : 'Initializing map...'}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full h-full">
            <div
                ref={mapRef}
                className="w-full h-full min-h-[400px] rounded-lg"
            />
        </div>
    );
};
