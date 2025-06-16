'use client';

import { Pause, Play } from 'iconsax-reactjs';
import { useState, useRef, useEffect, useCallback } from 'react';

interface TextToSpeechProps {
    text: string;
    autoPlay?: boolean;
    service?: 'browser' | 'playht';
    voice?: string;
    speed?: number;
    color?: string;
}

export default function TextToSpeech({
    text,
    autoPlay = false,
    service = 'browser',
    voice = 'default',
    speed = 1
}: TextToSpeechProps) {
    const [isPlaying, setIsPlaying] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [error, setError] = useState<string | null>(null);
    const [audioUrl, setAudioUrl] = useState<string | null>(null);

    const audioRef = useRef<HTMLAudioElement | null>(null);
    const speechRef = useRef<SpeechSynthesisUtterance | null>(null);
    const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);

    // Format time as MM:SS
    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    // Calculate estimated duration for browser TTS
    const estimateSpeechDuration = useCallback((text: string, speed: number) => {
        // Average speaking rate: ~150 words per minute at normal speed
        const wordsPerMinute = 150 * speed;
        const wordCount = text.trim().split(/\s+/).length;
        return (wordCount / wordsPerMinute) * 60;
    }, []);

    // Browser Speech Synthesis
    const speakWithBrowser = useCallback(() => {
        if (!('speechSynthesis' in window)) {
            setError('Speech synthesis not supported');
            return;
        }

        window.speechSynthesis.cancel();

        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = speed;
        utterance.volume = 1;

        // Set voice if specified
        if (voice !== 'default') {
            const voices = window.speechSynthesis.getVoices();
            const selectedVoice = voices.find(v =>
                v.name.toLowerCase().includes(voice.toLowerCase()) ||
                v.lang.includes(voice)
            );
            if (selectedVoice) {
                utterance.voice = selectedVoice;
            }
        }

        // Calculate estimated duration
        const estimatedDuration = estimateSpeechDuration(text, speed);
        setDuration(estimatedDuration);

        utterance.onstart = () => {
            setIsPlaying(true);
            setCurrentTime(0);

            // Start progress tracking
            progressIntervalRef.current = setInterval(() => {
                setCurrentTime(prev => {
                    const newTime = prev + 0.1;
                    return newTime >= estimatedDuration ? estimatedDuration : newTime;
                });
            }, 100);
        };

        utterance.onend = () => {
            setIsPlaying(false);
            setCurrentTime(estimatedDuration);
            if (progressIntervalRef.current) {
                clearInterval(progressIntervalRef.current);
                progressIntervalRef.current = null;
            }
        };

        utterance.onerror = () => {
            setError('Speech synthesis failed');
            setIsPlaying(false);
            if (progressIntervalRef.current) {
                clearInterval(progressIntervalRef.current);
                progressIntervalRef.current = null;
            }
        };

        speechRef.current = utterance;
        window.speechSynthesis.speak(utterance);
    }, [text, speed, voice, estimateSpeechDuration]);

    // API-based TTS Generation (PlayHT)
    const generateSpeechAPI = useCallback(async () => {
        if (!text.trim()) {
            setError('No text to read');
            return;
        }

        setIsLoading(true);
        setError(null);

        try {
            // Step 1: Generate speech
            const generateResponse = await fetch('/api/playht/generate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    text,
                    voice,
                    speed,
                }),
            });

            if (!generateResponse.ok) {
                const errorData = await generateResponse.json().catch(() => ({}));
                throw new Error(errorData.error || 'Failed to generate speech');
            }

            const { transcriptionId } = await generateResponse.json();

            // Step 2: Poll for completion
            await pollForAudio(transcriptionId);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to generate speech');
            setIsLoading(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [text, voice, speed]);

    // Poll for PlayHT audio completion
    const pollForAudio = async (transcriptionId: string) => {
        const maxAttempts = 30;
        let attempts = 0;

        const poll = async (): Promise<void> => {
            if (attempts >= maxAttempts) {
                throw new Error('Audio generation timeout');
            }

            try {
                const response = await fetch(`/api/playht/status/${transcriptionId}`);

                if (!response.ok) {
                    throw new Error('Failed to check status');
                }

                const data = await response.json();

                if (data.status === 'completed' && data.output?.url) {
                    setAudioUrl(data.output.url);
                    playAudio(data.output.url);
                    setIsLoading(false);
                } else if (data.status === 'error') {
                    throw new Error('Audio generation failed');
                } else {
                    attempts++;
                    setTimeout(poll, 1000); // Poll every second
                }
            } catch (err) {
                setIsLoading(false);
                throw err;
            }
        };

        await poll();
    };

    // Play audio file
    const playAudio = useCallback((url: string) => {
        if (audioRef.current) {
            audioRef.current.src = url;
            audioRef.current.playbackRate = speed;

            audioRef.current.play()
                .then(() => {
                    setIsPlaying(true);
                })
                .catch(() => setError('Failed to play audio'));
        }
    }, [speed]);

    // Toggle play/pause
    const togglePlayback = useCallback(() => {
        if (service === 'browser') {
            if (isPlaying) {
                window.speechSynthesis.pause();
                setIsPlaying(false);
                if (progressIntervalRef.current) {
                    clearInterval(progressIntervalRef.current);
                    progressIntervalRef.current = null;
                }
            } else {
                if (window.speechSynthesis.paused) {
                    window.speechSynthesis.resume();
                    setIsPlaying(true);
                    // Resume progress tracking
                    progressIntervalRef.current = setInterval(() => {
                        setCurrentTime(prev => {
                            const newTime = prev + 0.1;
                            return newTime >= duration ? duration : newTime;
                        });
                    }, 100);
                } else {
                    speakWithBrowser();
                }
            }
        } else {
            if (audioRef.current) {
                if (isPlaying) {
                    audioRef.current.pause();
                } else {
                    if (audioUrl) {
                        audioRef.current.play();
                    } else {
                        generateSpeechAPI();
                    }
                }
            }
        }
    }, [service, isPlaying, audioUrl, speakWithBrowser, generateSpeechAPI, duration]);

    // Audio event handlers for API-based services
    useEffect(() => {
        const audio = audioRef.current;
        if (!audio || service === 'browser') return;

        const handleTimeUpdate = () => {
            setCurrentTime(audio.currentTime);
        };

        const handleLoadedMetadata = () => {
            setDuration(audio.duration || 0);
        };

        const handleEnded = () => {
            setIsPlaying(false);
            setCurrentTime(audio.duration || 0);
        };

        const handlePause = () => {
            setIsPlaying(false);
        };

        const handlePlay = () => {
            setIsPlaying(true);
        };

        const handleError = () => {
            setError('Audio playback failed');
            setIsPlaying(false);
        };

        audio.addEventListener('timeupdate', handleTimeUpdate);
        audio.addEventListener('loadedmetadata', handleLoadedMetadata);
        audio.addEventListener('ended', handleEnded);
        audio.addEventListener('pause', handlePause);
        audio.addEventListener('play', handlePlay);
        audio.addEventListener('error', handleError);

        return () => {
            audio.removeEventListener('timeupdate', handleTimeUpdate);
            audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
            audio.removeEventListener('ended', handleEnded);
            audio.removeEventListener('pause', handlePause);
            audio.removeEventListener('play', handlePlay);
            audio.removeEventListener('error', handleError);
        };
    }, [service]);

    // Auto-play functionality
    useEffect(() => {
        if (autoPlay && text.trim()) {
            const timer = setTimeout(() => {
                if (service === 'browser') {
                    speakWithBrowser();
                } else {
                    generateSpeechAPI();
                }
            }, 100);
            return () => clearTimeout(timer);
        }
    }, [autoPlay, text, service, speakWithBrowser, generateSpeechAPI]);

    // Cleanup
    useEffect(() => {
        return () => {
            if (service === 'browser') {
                window.speechSynthesis.cancel();
                if (progressIntervalRef.current) {
                    clearInterval(progressIntervalRef.current);
                }
            }
            if (audioUrl) {
                URL.revokeObjectURL(audioUrl);
            }
        };
    }, [service, audioUrl]);

    // Calculate progress percentage
    const progressPercentage = duration > 0 ? (currentTime / duration) * 100 : 0;

    return (
        <div className="flex items-center border border-white text-white rounded-full px-4 py-2 shadow-lg w-full max-w-xs mx-auto">
            {/* Play/Pause Button */}
            <button
                onClick={togglePlayback}
                disabled={isLoading}
                className="flex items-center justify-center w-8 h-8 mr-2 disabled:opacity-50 cursor-pointer"
                title={isPlaying ? 'Pause' : 'Play'}
            >
                {isLoading ? (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                ) : isPlaying ? (
                    <Pause size={20} className="[&>*]:stroke-white" />
                ) : (
                    <Play size={20} className="[&>*]:stroke-white" />
                )}
            </button>

            {/* Progress Bar */}
            <div className="flex-1 relative">
                <div className="h-0.5 border border-white rounded-full overflow-hidden">
                    <div
                        className="h-full bg-white rounded-full transition-all duration-300 ease-out"
                        style={{ width: `${progressPercentage}%` }}
                    />
                </div>
                {/* Progress Dot */}
                <div
                    className="absolute top-1/2 w-1.5 h-1.5 mt-[3px] bg-white rounded-full -translate-y-1/2 transition-all duration-300 ease-out"
                    style={{ left: `${progressPercentage}%`, transform: 'translate(-50%, -50%)' }}
                />
            </div>

            {/* Duration Display */}
            <div className="ml-2 text-p1 min-w-[3rem] text-right">
                {formatTime(duration)}
            </div>

            {/* Error Display */}
            {error && null}
            {/* <div className="absolute top-full left-0 right-0 mt-2 p-2 bg-red-500 text-white text-xs rounded">
                {error}
            </div> */}

            {/* Hidden Audio Element */}
            <audio ref={audioRef} className="hidden" preload="metadata" />
        </div>
    );
}
