// use for client
import { Pagination } from '@mui/material';

import React from 'react';

interface PaginationProps {
    totalPages: number;
    currentPage: number;
    limit: number;
    onChange: (page: number) => void;
}

const PaginationBlog: React.FC<PaginationProps> = ({ totalPages, currentPage, limit, onChange }) => {
    
    if(totalPages <= 1){
        return null;
    }
    return (
        <Pagination 
            count={totalPages} 
            page={currentPage} 
            onChange={(event, page)=> onChange(page)} 
            color="primary"
            siblingCount={1}
            boundaryCount={1}
            hidePrevButton
            hideNextButton
            shape='rounded'
            variant='outlined'
        />
    );
};

export default PaginationBlog;