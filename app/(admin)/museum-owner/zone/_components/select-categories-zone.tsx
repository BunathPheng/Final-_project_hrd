import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";



export default function SelectCategoriesZone() {
    return (
        <>
            <Select name="category">
                <SelectTrigger className="w-full">
                    <SelectValue placeholder="All catetories" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="2">Art</SelectItem>
                    <SelectItem value="3">History</SelectItem>
                </SelectContent>
            </Select>
        </> 
    )
}