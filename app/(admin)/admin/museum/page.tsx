import Innercard from '@/components/feature/card/inner-card';
import Maincard from '@/components/feature/card/main-card';
import TrendCard from '@/components/feature/card/trend-card';
import { SearchTable } from '@/components/feature/input/search-table';
import { Breadcrumb } from '@/components/layout/breadcrumb'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Bank } from 'iconsax-reactjs';
import { JSX } from 'react'
import { MuseumTabbar } from './_components/museum-tabbar';
import Pagination from '@/components/feature/lib/pagination';
import { Showing } from '@/components/feature/lib/showing';
import { MuseumCard } from './_components/museum-card';

export default function MusuemAdminPage(): JSX.Element {
    const breadcrumbs = ["Home", "Museum"];

    return (
        <>
            <Breadcrumb main="User Management" items={breadcrumbs} />
            <Maincard>
                <div className="grid grid-cols-3 w-full gap-7">
                    <TrendCard title="Total Museums" amount={1534} icon={<Bank />} percent={5.5} />
                    <TrendCard title="New Museums" amount={48} icon={<Bank />} percent={10} />
                </div>

                <Innercard>
                    <MuseumTabbar />
                    <div className="flex w-full justify-between gap-5 mt-7">
                        <Select name="category">
                            <SelectTrigger className="w-60">
                                <SelectValue placeholder="All catetories" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="-1">All catetories</SelectItem>
                                <SelectItem value="1">History</SelectItem>
                                <SelectItem value="2">Art</SelectItem>
                                <SelectItem value="3">Science</SelectItem>
                            </SelectContent>
                        </Select>
                        <SearchTable />
                    </div>
                    {/* Museum Lists */}
                    <MuseumCard />
                    <div className="flex w-full justify-between items-center gap-5 pt-7">
                        <Pagination />
                        <Showing />
                    </div>
                </Innercard>
            </Maincard>
        </>
    )
}
