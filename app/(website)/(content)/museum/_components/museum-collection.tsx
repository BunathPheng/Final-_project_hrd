import HeadingTitle from "@/components/feature/label/heading-title"
import { Label } from "@/components/ui/label";
import { apiRequest } from "@/utils/api";
import { ApiResponse, PageProps } from "@/types/response";
import { SelectCategory } from "./select-category";
import { MuseumItem } from "./museum-item";
import { Searching } from "./searching";
import { Suspense } from "react";
import { ColectionSkeleton } from "./collection-skeleton";

type CategoryProps = {
    museumCategoryId: string;
    name: string;
}

export const MuseumCollection: React.FC<PageProps> = async ({ searchParams }) => {
    const responseCategory = await apiRequest<ApiResponse<CategoryProps[]>>("/museum/categories/museum-category");
    const categories = responseCategory?.payload || [];

    // Create a key that changes when search params change to force Suspense re-trigger
    const resolvedSearchParams = await searchParams;
    const suspenseKey = `${resolvedSearchParams?.category || 'all'}-${resolvedSearchParams?.page || '1'}-${resolvedSearchParams?.search || ''}`;

    return (
        <div className="grid gap-12 w-full pd-screen">
            {/* Museum Collections */}
            <section className="grid gap-10">
                <HeadingTitle title="Museum" highlight="Collections" />
                <div className="flex flex-col gap-8">
                    <div className="flex flex-wrap md:flex-nowrap gap-8">
                        <div className="flex flex-col w-full md::w-3/5 gap-2">
                            <Searching />
                        </div>
                        <div className="w-full md::w-2/5 flex flex-col gap-2">
                            <Label htmlFor="category">
                                Category
                            </Label>
                            <SelectCategory items={categories} />
                        </div>
                    </div>
                </div>
                {/* Museum Items */}
                <Suspense key={suspenseKey} name="MuseumCollection" fallback={<ColectionSkeleton />}>
                    <MuseumItem searchParams={searchParams} />
                </Suspense>
            </section>
        </div>
    )
}
