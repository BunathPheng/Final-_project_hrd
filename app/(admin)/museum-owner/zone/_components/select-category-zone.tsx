import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ZoneCategoryProps } from "@/types/zone";

export const SelectCategoryZone: React.FC<{ defaultValue?: string | undefined, items: ZoneCategoryProps[] }> = ({ defaultValue = "", items }) => {

    return (
        <>
            <Select name="category" defaultValue={defaultValue}>
                <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Category" />
                </SelectTrigger>
                <SelectContent>
                    {items && items.map(item => (
                        <SelectItem key={item.zoneCategoryId} value={item.zoneCategoryId}>{item.name}</SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </>
    )
}
