"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Key, Link, MoneyForbidden, User } from "iconsax-reactjs"
import Image from "next/image"

interface AddAccountProps {
    onConnect?: () => void
}

export function AddAccount({ onConnect }: AddAccountProps) {
    const [open, setOpen] = useState(false)
    const [formData, setFormData] = useState({
        accountName: '',
        accountNo: '',
        clientId: '',
        clientSecret: ''
    })
    const [errors, setErrors] = useState({
        accountName: '',
        accountNo: '',
        clientId: '',
        clientSecret: ''
    })
    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleInputChange = (field: string, value: string) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }))

        // Clear error when user starts typing
        if (errors[field as keyof typeof errors]) {
            setErrors(prev => ({
                ...prev,
                [field]: ''
            }))
        }
    }

    const validateForm = () => {
        const newErrors = {
            accountName: '',
            accountNo: '',
            clientId: '',
            clientSecret: ''
        }

        if (!formData.accountName.trim()) {
            newErrors.accountName = 'Account Name is required'
        }
        if (!formData.accountNo.trim()) {
            newErrors.accountNo = 'Account No is required'
        }
        if (!formData.clientId.trim()) {
            newErrors.clientId = 'Client ID is required'
        }
        if (!formData.clientSecret.trim()) {
            newErrors.clientSecret = 'Client Secret is required'
        }

        setErrors(newErrors)
        return !Object.values(newErrors).some(error => error !== '')
    }

    const handleSubmit = async () => {
        if (!validateForm()) {
            return
        }

        setIsSubmitting(true)

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 500))

            // Here you would make your actual API call
            console.log('Form submitted:', formData)

            // Set localStorage
            localStorage.setItem("connect-webill", "true")

            // Call parent callback to trigger re-render
            onConnect?.()

            // Reset form and close dialog on success
            setFormData({
                accountName: '',
                accountNo: '',
                clientId: '',
                clientSecret: ''
            })
            setErrors({
                accountName: '',
                accountNo: '',
                clientId: '',
                clientSecret: ''
            })
            setOpen(false)

        } catch (error) {
            console.error('Submission failed:', error)
            // Handle error (you could set a general error state here)
        } finally {
            setIsSubmitting(false)
        }
    }

    const handleOpenChange = (newOpen: boolean) => {
        if (!newOpen) {
            // Reset form when dialog is closed
            setFormData({
                accountName: '',
                accountNo: '',
                clientId: '',
                clientSecret: ''
            })
            setErrors({
                accountName: '',
                accountNo: '',
                clientId: '',
                clientSecret: ''
            })
        }
        setOpen(newOpen)
    }

    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogTrigger asChild>
                <Button size={'md'} className="bg-grey-300">
                    <Link size={20} />
                    Connect WeBill365
                </Button>
            </DialogTrigger>
            <DialogContent
                className="max-h-screen overflow-auto sm:max-w-lg bg-white"
                onPointerDownOutside={(e) => e.preventDefault()}
                onEscapeKeyDown={(e) => e.preventDefault()}
            >
                <DialogHeader>
                    <DialogTitle className="text-center text-grey-900">
                        <Image src={"/banner/webill365_logo.svg"} width={20} height={40} alt="webill" className="w-28" />
                    </DialogTitle>
                    <DialogDescription className="text-p1 text-grey-600 pb-3">
                        Enter the correct info below to change WeBill365 account
                    </DialogDescription>
                </DialogHeader>
                <div className="grid w-full gap-5">
                    <div className="grid gap-2">
                        <Label>Account Name <span className="text-red-500">*</span></Label>
                        <Input
                            placeholder="Enter Account Name"
                            startIcon={<User className="h-5 w-5 text-gray-400" />}
                            value={formData.accountName}
                            onChange={(e) => handleInputChange('accountName', e.target.value)}
                            className={errors.accountName ? 'border-red-500 focus:border-red-500' : ''}
                        />
                        {errors.accountName && (
                            <span className="text-red-500 text-sm">{errors.accountName}</span>
                        )}
                    </div>
                    <div className="grid gap-2">
                        <Label>Account No <span className="text-red-500">*</span></Label>
                        <Input
                            type="password"
                            placeholder="Enter Account No"
                            startIcon={<MoneyForbidden className="h-5 w-5 text-gray-400" />}
                            togglePassword={true}
                            value={formData.accountNo}
                            validationMode="number"
                            onChange={(e) => handleInputChange('accountNo', e.target.value)}
                            className={errors.accountNo ? 'border-red-500 focus:border-red-500' : ''}
                        />
                        {errors.accountNo && (
                            <span className="text-red-500 text-sm">{errors.accountNo}</span>
                        )}
                    </div>
                    <div className="grid gap-2">
                        <Label>Client ID <span className="text-red-500">*</span></Label>
                        <Input
                            placeholder="Enter Client ID"
                          
                            startIcon={<User className="h-5 w-5 text-gray-400" />}
                            value={formData.clientId}
                            onChange={(e) => handleInputChange('clientId', e.target.value)}
                            className={errors.clientId ? 'border-red-500 focus:border-red-500' : ''}
                        />
                        {errors.clientId && (
                            <span className="text-red-500 text-sm">{errors.clientId}</span>
                        )}
                    </div>
                    <div className="grid gap-2">
                        <Label>Client Secret <span className="text-red-500">*</span></Label>
                        <Input
                            type="password"
                            placeholder="Enter Client Secret"
                            startIcon={<Key className="h-5 w-5 text-gray-400" />}
                            togglePassword={true}
                            value={formData.clientSecret}
                            onChange={(e) => handleInputChange('clientSecret', e.target.value)}
                            className={errors.clientSecret ? 'border-red-500 focus:border-red-500' : ''}
                        />
                        {errors.clientSecret && (
                            <span className="text-red-500 text-sm">{errors.clientSecret}</span>
                        )}
                    </div>
                </div>
                <DialogFooter className="space-x-3 mt-3">
                    <Button
                        onClick={handleSubmit}
                        disabled={isSubmitting}
                        className="px-6 w-full"
                    >
                        {isSubmitting ? 'Submitting...' : 'Submit'}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
