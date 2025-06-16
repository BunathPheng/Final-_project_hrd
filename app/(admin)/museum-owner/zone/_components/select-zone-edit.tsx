import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";



export default function SelectZoneEdit() {
    return (
        <>
            <Select name="category">
                <SelectTrigger className="w-full">
                    <SelectValue placeholder="History" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="1">History</SelectItem>
                    <SelectItem value="2">Art</SelectItem>
                    <SelectItem value="3">Science</SelectItem>
                </SelectContent>
            </Select>
        </>
    )
}
