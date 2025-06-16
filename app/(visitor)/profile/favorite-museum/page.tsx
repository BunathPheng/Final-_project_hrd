import FavoriteMuseum from '@/components/feature/card/favorite-museum';
import { EmptyData } from '@/components/feature/fallback/empty-data';
import Pagination from '@/components/feature/lib/pagination';
import { FavoriteMuseumProps } from '@/types/museum';
import { ApiResponse, PageProps, PaginationProps } from '@/types/response';
import { apiRequest } from '@/utils/api';
import React from 'react';

type FavoriteMuseumComponentProps = {
    items: FavoriteMuseumProps[];
    pagination: PaginationProps;
}

export default async function FavoriteMuseumPage({ searchParams }: PageProps) {
    const resolveSearchParams = await searchParams;
    const page = resolveSearchParams?.page || '1';
    const search = resolveSearchParams?.search || ''; // Fixed: should be 'search' not 'size'

    const response = await apiRequest<ApiResponse<FavoriteMuseumComponentProps>>(
        `/favorites?page=${page}&search=${search}` // Fixed: use 'search' parameter
    );

    console.log("response", response); // Fixed typo

    const museums: FavoriteMuseumProps[] = response?.payload?.items ?? [];
    const paging = response?.payload?.pagination;

    return (
        <section className='bg-white'>
            <h1 className="text-s1 text-grey-900 border-b-1 border-b-grey-100 pb-5 mb-6">
                Favorite Museum
            </h1>

            {/* Always show the component - let it handle empty state internally */}
            <FavoriteMuseum items={museums} />

            {/* Show pagination only if there are items and pagination data */}
            <div className="grid justify-center">
                {museums.length > 0 ? (
                    <Pagination paging={paging} scroll={false} />
                ) : museums.length === 0 ? (
                    <div className="text-center py-8">
                        <EmptyData description='Not found Favorite Museum' />
                    </div>
                ) : null}
            </div>
        </section>
    );
}
