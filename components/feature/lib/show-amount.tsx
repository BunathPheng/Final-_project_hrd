import { PaginationProps } from "@/types/response";

const defaultPagination = {
    totalItems: 100,
    totalPages: 10,
    currentPage: 1,
    pageSize: 10,
    hasNextPage: 0,
    hasPreviousPage: 0,
    nextPage: null,
    previousPage: 2,
    firstPage: 1,
    lastPage: 1
};

export const ShowAmount: React.FC<{ paging?: PaginationProps }> = ({ paging = defaultPagination }) => {
    const startItem = (paging.pageSize || 0) * ((paging.currentPage || 1) - 1) + 1;
    const endItem = (paging.pageSize || 0) * ((paging.currentPage || 1));

    return (
        <>
            <p className="text-p1 text-grey-900">
                <span>Showing </span>
                <span>{startItem <= paging.totalItems ? startItem : paging.totalItems} </span>
                <span>to </span>
                <span>{endItem <= paging.totalItems ? endItem : paging.totalItems} </span>
                <span>of </span>
                <span>{paging.totalItems} </span>
                <span>items </span>
            </p>
        </>
    );
};
