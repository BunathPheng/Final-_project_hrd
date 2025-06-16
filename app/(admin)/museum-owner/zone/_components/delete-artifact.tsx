"use client"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Trash } from "iconsax-reactjs"
import { useState } from "react"

interface DeleteArtifactProps {
    artifactId?: string;
    onDelete?: (artifactId: string) => void;
}

export function DeleteArtifact({ artifactId, onDelete }: DeleteArtifactProps) {
    const [isDeleting, setIsDeleting] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const handleDelete = async () => {
        if (!artifactId) return;
        
        setIsDeleting(true);
        
        try {
            // Mock API call - simulate network delay
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            // Simulate successful deletion
            console.log(`Mock: Artifact ${artifactId} deleted successfully`);
            
            // Call the onDelete callback to update parent component
            onDelete?.(artifactId);
            
            // Close the dialog
            setIsOpen(false);
            
        } catch (error) {
            console.error('Error deleting artifact:', error);
            // Handle error (show toast, etc.)
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <div className="flex w-full justify-end">
                    <Button size={'sm'} className="px-3 font-normal">
                        <Trash size={16} color="#fff" className="[&>*]:stroke-2 text-p4" />
                    </Button>
                </div>
            </DialogTrigger>
            <DialogContent
                className="sm:max-w-sm bg-white [&>button]:hidden"
                onPointerDownOutside={(e) => e.preventDefault()}
                onEscapeKeyDown={(e) => e.preventDefault()}
            >
                <DialogHeader>
                    <DialogTitle className="text-grey-900 text-center">Delete Artifact</DialogTitle>
                </DialogHeader>
                <p className="text-p1 text-center">
                    Are you sure you want to delete this artifact? 
                </p>
                <DialogFooter className="space-x-3 mt-3 justify-center mx-auto">
                    <DialogClose asChild>
                        <Button size={"md"} variant={"outline"} disabled={isDeleting}>
                            Cancel
                        </Button>
                    </DialogClose>
                    <Button 
                        size={"md"} 
                        className="px-6" 
                        onClick={handleDelete}
                        disabled={isDeleting}
                    >
                        {isDeleting ? "Deleting..." : "Delete"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}