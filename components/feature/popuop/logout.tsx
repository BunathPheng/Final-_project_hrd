"use client"
import { signOut } from "next-auth/react";
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
import { LogoutCurve } from "iconsax-reactjs"
export function Logout() {

  const handleLogout = async () => {
    await signOut({ 
        callbackUrl: '/',
        redirect: true 
      })
  };
    return (
        <Dialog>
            <DialogTrigger asChild >

                <div className="flex items-center gap-2 px-6 py-2 cursor-pointer hover:bg-grey-50 rounded-md">
                    <LogoutCurve size={24} color="#B50000" />
                    <span className="text-p2 text-primary-700">Logout</span>
                </div>
            </DialogTrigger>
            <DialogContent
                className="sm:max-w-sm bg-white [&>button]:hidden"
                onPointerDownOutside={(e) => e.preventDefault()}
                onEscapeKeyDown={(e) => e.preventDefault()}
            >
                <DialogHeader>
                    <DialogTitle className="text-grey-900 pb-3 text-center">Are you sure you want to log out ?</DialogTitle>
                </DialogHeader>

                <DialogFooter className="space-x-3 mt-3 mx-auto">
                    <DialogClose asChild>
                        <Button size={"md"} variant={"outline"}>Cancel</Button>
                    </DialogClose>
                    <DialogClose asChild>
                        <Button size={"md"} className="px-6" onClick={handleLogout}>Logout</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
