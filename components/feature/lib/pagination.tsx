"use client";

import {
    Pagination as Page,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious
} from "@/components/ui/pagination";
import { PaginationMode, PaginationProps } from "@/types/response";
import { usePathname, useSearchParams } from "next/navigation";

const defaultPagination = {
    totalItems: 0,
    totalPages: 1,
    currentPage: 1,
    pageSize: 10,
    hasNextPage: 0,
    hasPreviousPage: 0,
    nextPage: null,
    previousPage: null,
    firstPage: 1,
    lastPage: 1
};

const Pagination: React.FC<{
    paging?: PaginationProps,
    scroll?: boolean,
    mode?: PaginationMode
}> = ({
    paging = defaultPagination,
    scroll = true,
    mode = 'default'
}) => {
        const pathname = usePathname();
        const searchParams = useSearchParams();
        const params = new URLSearchParams(searchParams.toString());

        // Define the param key based on the mode
        const paramKey =
            mode === 'ongoing' ? 'ongoing_page' :
                mode === 'upcoming' ? 'upcoming_page' :
                    'page';

        const generateHref = (pageNumber: number | string | null | undefined) => {
            if (!pageNumber || typeof pageNumber === 'string') return "#";
            const newParams = new URLSearchParams(params.toString());
            newParams.set(paramKey, String(pageNumber));
            return `${pathname}?${newParams.toString()}`;
        };

        const currentPage = paging.currentPage;
        const totalPages = paging.totalPages;

        const generatePageNumbers = () => {
            const pages = [];

            if (typeof totalPages === "number") {
                if (totalPages <= 5) {
                    for (let i = 1; i <= totalPages; i++) {
                        pages.push(i);
                    }
                } else {
                    if (currentPage <= 3) {
                        pages.push(1, 2, 3, '...', totalPages);
                    } else if (currentPage >= totalPages - 2) {
                        pages.push(1, '...', totalPages - 2, totalPages - 1, totalPages);
                    } else {
                        pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
                    }
                }
            }

            return pages;
        };

        const pageNumbers = generatePageNumbers();

        return (
            <>
                {totalPages > 0 && (
                    <div className="flex w-fit items-center">
                        <Page>
                            <PaginationContent>
                                {/* Previous Button */}
                                <PaginationItem>
                                    <PaginationPrevious
                                        href={generateHref(paging.previousPage)}
                                        scroll={scroll}
                                        className={paging.hasPreviousPage ? "" : "opacity-50 pointer-events-none"}
                                    />
                                </PaginationItem>

                                {/* Page Numbers */}
                                {pageNumbers.map((page, index) => (
                                    <PaginationItem key={index}>
                                        {page === '...' ? (
                                            <PaginationEllipsis />
                                        ) : (
                                            <PaginationLink
                                                href={generateHref(page)}
                                                isActive={page === currentPage}
                                                scroll={scroll}
                                                className={page === currentPage ? "pointer-events-none" : ""}
                                            >
                                                {page}
                                            </PaginationLink>
                                        )}
                                    </PaginationItem>
                                ))}

                                {/* Next Button */}
                                <PaginationItem>
                                    <PaginationNext
                                        href={generateHref(paging.nextPage)}
                                        scroll={scroll}
                                        className={paging.hasNextPage ? "" : "opacity-50 pointer-events-none"}
                                    />
                                </PaginationItem>
                            </PaginationContent>
                        </Page>
                    </div>
                )}
            </>
        );
    };

export default Pagination;
