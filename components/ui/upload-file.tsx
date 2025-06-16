/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState, useEffect, useId, useRef, forwardRef } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { SmartImage } from "../feature/fallback/smart-image";

interface DefaultImage {
    url: string;
    name?: string;
    size?: string; // Display size like "2.5 MB"
}

interface FileUploadProps {
    title?: string;
    description?: string;
    acceptedFileTypes?: string;
    maxFileSize?: string;
    onFileUpload?: (files: File[]) => void;
    className?: string;
    multiple?: boolean;
    maxFiles?: number;
    maxFileSizeBytes?: number;
    required?: boolean;
    id?: string; // Optional custom ID
    defaultImages?: DefaultImage[]; // Array of default images with metadata
    name?: string; // For react-hook-form
    onChange?: (files: FileList | null) => void; // For react-hook-form
    onBlur?: () => void; // For react-hook-form
    value?: FileList | null; // For react-hook-form
}

const FileUpload = forwardRef<HTMLInputElement, FileUploadProps>(({
    title = "Upload Image",
    acceptedFileTypes = "PNG, JPG, JPEG, and WEBP",
    onFileUpload,
    className = "",
    multiple = false,
    maxFiles = 5,
    maxFileSizeBytes = 5 * 1024 * 1024, // 5MB default
    required = false,
    id: customId,
    defaultImages = [],
    name,
    onChange,
    onBlur,
    value
}, ref) => {
    const generatedId = useId();
    const componentId = customId || generatedId;
    const inputId = `dropzone-file-${componentId}`;

    const [files, setFiles] = useState<File[]>([]);
    const [isUploading, setIsUploading] = useState(false);
    const [error, setError] = useState<string>("");
    const [previews, setPreviews] = useState<{ [key: string]: string }>({});
    const [defaultPreviews, setDefaultPreviews] = useState<{ [key: string]: DefaultImage }>({});
    const [isDragOver, setIsDragOver] = useState(false);
    const previewsRef = useRef<{ [key: string]: string }>({});
    const dragCounterRef = useRef(0);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Combine refs for react-hook-form compatibility
    const inputRef = ref || fileInputRef;

    const validateFile = (file: File): string | null => {
        // Check file size
        if (file.size > maxFileSizeBytes) {
            return `File "${file.name
                }" exceeds maximum size of ${formatFileSize(maxFileSizeBytes)}`;
        }

        // Check file type
        const allowedTypes = [
            "image/png",
            "image/jpg",
            "image/jpeg",
            "image/webp",
        ];
        if (!allowedTypes.includes(file.type)) {
            return `File "${file.name}" is not a supported image type`;
        }

        return null;
    };

    const createPreview = (file: File): Promise<string> => {
        return new Promise((resolve) => {
            const reader = new FileReader();
            reader.onload = (e) => resolve(e.target?.result as string);
            reader.readAsDataURL(file);
        });
    };

    const generateFileKey = (file: File, componentId: string): string => {
        return `${componentId}-${file.name}-${file.size}-${file.lastModified}`;
    };

    // Helper function to create FileList from File array
    const createFileList = (filesArray: File[]): FileList => {
        const dt = new DataTransfer();
        filesArray.forEach(file => dt.items.add(file));
        return dt.files;
    };

    // Initialize default images on component mount
    useEffect(() => {
        if (defaultImages.length > 0) {
            const defaultPreviewsObj: { [key: string]: DefaultImage } = {};
            defaultImages.forEach((defaultImage, index) => {
                const key = `default-${index}`;
                defaultPreviewsObj[key] = defaultImage;
            });
            setDefaultPreviews(defaultPreviewsObj);
        }
    }, [defaultImages]);

    const handleRemoveDefaultImage = (key: string) => {
        setDefaultPreviews(prev => {
            const updated = { ...prev };
            delete updated[key];
            return updated;
        });
    };

    // Get total count including default images
    const getTotalCount = () => {
        return files.length + Object.keys(defaultPreviews).length;
    };

    // Get available slots for new uploads
    const getAvailableSlots = () => {
        return maxFiles - getTotalCount();
    };

    const clearFileInput = () => {
        const fileInput = typeof inputRef === 'function' ? null : inputRef?.current;
        if (fileInput) {
            fileInput.value = "";
        }
    };

    const processFiles = async (selectedFiles: File[]) => {
        setError("");

        if (!multiple && selectedFiles.length > 1) {
            setError("Only one file can be uploaded");
            return;
        }

        if (multiple && getTotalCount() + selectedFiles.length > maxFiles) {
            setError(`Maximum ${maxFiles} files allowed (currently have ${getTotalCount()})`);
            return;
        }

        // Validate each file
        for (const file of selectedFiles) {
            const validationError = validateFile(file);
            if (validationError) {
                setError(validationError);
                return;
            }
        }

        // For single file mode, replace existing files
        // For multiple file mode, check for duplicates only among current files
        let newFiles = selectedFiles;

        if (multiple) {
            // Check for duplicate files only among currently selected files
            newFiles = selectedFiles.filter(
                (newFile) =>
                    !files.some(
                        (existingFile) =>
                            existingFile.name === newFile.name &&
                            existingFile.size === newFile.size &&
                            existingFile.lastModified === newFile.lastModified
                    )
            );

            if (newFiles.length !== selectedFiles.length) {
                setError("Some files were already selected");
            }
        }

        // Create previews for new files
        const newPreviews: { [key: string]: string } = {};
        for (const file of newFiles) {
            const fileKey = generateFileKey(file, componentId);
            const preview = await createPreview(file);
            newPreviews[fileKey] = preview;
        }

        let finalFiles: File[];

        // For single file mode, replace existing files but keep defaults
        if (!multiple) {
            // Clean up old previews
            Object.values(previews).forEach(url => {
                if (url.startsWith('blob:')) {
                    URL.revokeObjectURL(url);
                }
            });
            setPreviews(newPreviews);
            previewsRef.current = newPreviews;
            setFiles(newFiles);
            finalFiles = newFiles;
        } else {
            // For multiple files, add to existing
            const updatedPreviews = { ...previews, ...newPreviews };
            setPreviews(updatedPreviews);
            previewsRef.current = updatedPreviews;
            setFiles((prev) => {
                const updated = [...prev, ...newFiles];
                return updated;
            });
            finalFiles = [...files, ...newFiles];
        }

        // Call react-hook-form onChange if provided
        if (onChange) {
            const fileList = createFileList(finalFiles);
            onChange(fileList);
        }

        // Call optional onFileUpload callback
        if (onFileUpload) {
            onFileUpload(finalFiles);
        }
    };

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFiles = Array.from(e.target.files || []);
        await processFiles(selectedFiles);
        // Don't clear the input here as it interferes with react-hook-form
    };

    // Drag and Drop handlers
    const handleDragEnter = (e: React.DragEvent<HTMLLabelElement>) => {
        e.preventDefault();
        e.stopPropagation();
        dragCounterRef.current++;
        if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
            setIsDragOver(true);
        }
    };

    const handleDragLeave = (e: React.DragEvent<HTMLLabelElement>) => {
        e.preventDefault();
        e.stopPropagation();
        dragCounterRef.current--;
        if (dragCounterRef.current === 0) {
            setIsDragOver(false);
        }
    };

    const handleDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const handleDrop = async (e: React.DragEvent<HTMLLabelElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragOver(false);
        dragCounterRef.current = 0;

        if (isUploading) return;

        const droppedFiles = Array.from(e.dataTransfer.files);
        // Filter for image files only
        const imageFiles = droppedFiles.filter(file => file.type.startsWith('image/'));

        if (imageFiles.length > 0) {
            await processFiles(imageFiles);
        } else if (droppedFiles.length > 0) {
            setError("Please drop only image files");
        }
    };

    const formatFileSize = (bytes: number): string => {
        if (bytes === 0) return "0 Bytes";
        const k = 1024;
        const sizes = ["Bytes", "KB", "MB", "GB"];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
    };

    const handleRemoveFile = (index: number) => {
        const fileToRemove = files[index];
        const fileKey = generateFileKey(fileToRemove, componentId);

        // Remove preview and revoke blob URL
        setPreviews(prev => {
            const updated = { ...prev };
            const url = updated[fileKey];
            if (url && url.startsWith('blob:')) {
                URL.revokeObjectURL(url);
            }
            delete updated[fileKey];
            previewsRef.current = updated;
            return updated;
        });

        const updatedFiles = files.filter((_, i) => i !== index);
        setFiles(updatedFiles);
        setError("");

        // Update react-hook-form
        if (onChange) {
            const fileList = createFileList(updatedFiles);
            onChange(fileList);
        }

        if (onFileUpload) {
            onFileUpload(updatedFiles);
        }
    };

    const handleRemoveAllFiles = () => {
        // Clean up all preview URLs
        Object.values(previews).forEach(url => {
            if (url.startsWith('blob:')) {
                URL.revokeObjectURL(url);
            }
        });

        setFiles([]);
        setPreviews({});
        previewsRef.current = {};
        setError("");

        // Also clear default images
        setDefaultPreviews({});

        // Update react-hook-form
        if (onChange) {
            onChange(null);
        }

        if (onFileUpload) {
            onFileUpload([]);
        }
    };

    // Cleanup previews when component unmounts
    useEffect(() => {
        return () => {
            Object.values(previewsRef.current).forEach(url => {
                if (url.startsWith('blob:')) {
                    URL.revokeObjectURL(url);
                }
            });
        };
    }, []);

    // Reset component state when required props change
    useEffect(() => {
        // Clean up existing previews
        Object.values(previews).forEach(url => {
            if (url.startsWith('blob:')) {
                URL.revokeObjectURL(url);
            }
        });

        setFiles([]);
        setPreviews({});
        previewsRef.current = {};
        setError("");
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [multiple, maxFiles, maxFileSizeBytes, inputId]);

    return (
        <div className={className}>
            {/* Label */}
            <label
                htmlFor={inputId}
                className="block text-s2 font-medium text-grey-900 mb-3"
            >
                {title} <span className="text-red-500">{required ? "*" : ""}</span>
            </label>

            {/* Upload Area */}
            <div className="mt-1">
                <label
                    htmlFor={inputId}
                    className={`flex flex-col items-center justify-center w-full h-40 border-2 border-dashed rounded-md cursor-pointer bg-white transition-all duration-200 ${isDragOver
                        ? 'border-primary-700 bg-primary-50'
                        : 'border-grey-300 hover:bg-slate-light hover:border-grey-400'
                        } ${isUploading ? 'pointer-events-none opacity-50' : ''}`}
                    onDragEnter={handleDragEnter}
                    onDragLeave={handleDragLeave}
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <UploadIcon className={`w-8 h-8 mb-4 transition-colors ${isDragOver ? 'text-primary-700' : 'text-grey-400'
                            }`} />
                        <p className={`mb-2 text-lg transition-colors ${isDragOver ? 'text-primary-700' : 'text-grey-900'
                            }`}>
                            <span className="font-semibold">
                                {isDragOver ? 'Drop files here' : 'Click to upload'}
                            </span>{" "}
                            {!isDragOver && 'or drag and drop'}
                        </p>
                        <p className={`text-sm transition-colors ${isDragOver ? 'text-primary-700' : 'text-grey-500'
                            }`}>
                            {acceptedFileTypes}
                        </p>
                        {multiple && !isDragOver && (
                            <p className="text-xs text-grey-400 mt-1">
                                You can select multiple files ({getAvailableSlots()} slots available)
                            </p>
                        )}
                    </div>
                    <input
                        ref={inputRef}
                        id={inputId}
                        name={name}
                        type="file"
                        className="hidden"
                        onChange={handleFileChange}
                        onBlur={onBlur}
                        disabled={isUploading}
                        accept="image/*"
                        multiple={multiple}
                    />
                </label>
            </div>

            {/* Error Message */}
            {error && (
                <div className="mt-2 p-3 bg-primary-50 border border-primary-100 rounded-md">
                    <p className="text-sm text-primary-700">{error}</p>
                </div>
            )}

            {/* File Preview */}
            {(files.length > 0 || Object.keys(defaultPreviews).length > 0) && (
                <div className="mt-4 space-y-2">
                    <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-grey-700">
                            Files ({getTotalCount()}{multiple ? `/${maxFiles}` : ""})
                        </p>
                        {getTotalCount() > 1 && (
                            <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={handleRemoveAllFiles}
                                disabled={isUploading}
                                className="text-red-700 border-red-700 hover:bg-red-700"
                            >
                                Remove All
                            </Button>
                        )}
                    </div>

                    <div className="max-h-[20rem] overflow-auto space-y-2">
                        {/* Show default images first */}
                        {Object.entries(defaultPreviews).map(([key, defaultImage]) => (
                            <div
                                key={key}
                                className="p-3 bg-grey-50 rounded-md border border-grey-200"
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3 flex-1 min-w-0">
                                        {/* Image Preview */}
                                        <div className="w-12 h-12 rounded-md overflow-hidden bg-grey-200 flex-shrink-0">
                                            <SmartImage
                                                src={defaultImage.url}
                                                width={48}
                                                height={48}
                                                alt={defaultImage.name || ""}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>

                                        {/* File Info */}
                                        <div className="flex-1 min-w-0">
                                            <p className="font-medium text-grey-900 truncate">
                                                {defaultImage.name || "Current Image"}
                                            </p>
                                            {defaultImage.size && (
                                                <p className="text-sm text-grey-500">
                                                    {defaultImage.size} • Existing
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                    {/* Remove Button */}
                                    <div className="ml-4">
                                        <Button
                                            type="button"
                                            variant="outline"
                                            size="sm"
                                            onClick={() => handleRemoveDefaultImage(key)}
                                            disabled={isUploading}
                                        >
                                            Remove
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        ))}

                        {/* Show uploaded files */}
                        {files.map((file, index) => {
                            const fileKey = generateFileKey(file, componentId);
                            const previewUrl = previews[fileKey];

                            return (
                                <div
                                    key={fileKey}
                                    className="p-3 bg-grey-50 rounded-md border border-grey-200"
                                >
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3 flex-1 min-w-0">
                                            {/* Image Preview */}
                                            <div className="w-12 h-12 rounded-md overflow-hidden bg-grey-200 flex-shrink-0">
                                                {previewUrl ? (
                                                    <Image
                                                        src={previewUrl}
                                                        width={48}
                                                        height={48}
                                                        alt={file.name}
                                                        className="w-full h-full object-cover"
                                                    />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center">
                                                        <UploadIcon className="w-6 h-6 text-grey-400" />
                                                    </div>
                                                )}
                                            </div>

                                            {/* File Info */}
                                            <div className="flex-1 min-w-0">
                                                <p className="font-medium text-grey-900 truncate">
                                                    {file.name}
                                                </p>
                                                <p className="text-sm text-grey-500">
                                                    {formatFileSize(file.size)}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Remove Button */}
                                        <div className="ml-4">
                                            <Button
                                                type="button"
                                                variant="outline"
                                                size="sm"
                                                onClick={() => handleRemoveFile(index)}
                                                disabled={isUploading}
                                            >
                                                Remove
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
});

FileUpload.displayName = "FileUpload";

function UploadIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="17 8 12 3 7 8" />
            <line x1="12" x2="12" y1="3" y2="15" />
        </svg>
    );
}

export default FileUpload;
