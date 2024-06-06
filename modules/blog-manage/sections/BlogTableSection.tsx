"use client";

import { SearchBar } from "@/common/components/searchbar";
import BlogDataTable from "../components/BlogDataTable";
import { Box, Pagination } from "@mui/material";
import { useSearchParams } from "next/navigation";
import React, { SetStateAction, useEffect, useState } from "react";
import { blogApi } from "@/clientApi/blog";
import { BaseResponse } from "@/interfaces/response.interface";
import { Post } from "@/interfaces/blog.interface";
import PaginationBlog from "../components/Pagination";
import { useRouter } from 'next/navigation';
import  debounce from "lodash.debounce";


const BlogTableSection: React.FC = () => {
    const router = useRouter();
    const [page, setPage] = useState<number>(1);
    const [search, setSearch] = useState<string>('');
    const [limit, setLimit] = useState<number>(6);
    const [metaData, setMetaData] = useState<Record<string, any> | null>(null);
    const [listPost, setListPost] = useState<Post[] | null>(null)
    let pageParam = useSearchParams().get('page');
    let searchParam = useSearchParams().get('search');

    useEffect(() => {
      if(pageParam !== null && pageParam !== '' && pageParam!==page.toString()) {
        setPage(parseInt(pageParam));
      }
      if(searchParam !== null && searchParam !== '' && searchParam !== search) {
        setSearch(searchParam);
      }
    },[])

    useEffect (() => {
      const params = `?${search.trim()!==''? 'keyword='+search.trim()+'&' : ''}page=${page}&limit=${limit}`;

      const paramsClient = `?${search.trim()!==''? 'search='+search.trim()+'&' : ''}page=${page}`;
      const newUrlClient = `${window.location.pathname}${paramsClient.toString()}`;
      router.push(newUrlClient);

      getList(params);
    },[page])

    useEffect (() => {
      const params = `?${search.trim()!==''? 'keyword='+search.trim()+'&' : ''}page=${page}&limit=${limit}`;

      const paramsClient = `?${search.trim()!==''? 'search='+search.trim()+'&' : ''}page=${page}`;
      const newUrlClient = `${window.location.pathname}${paramsClient.toString()}`; 
      router.push(newUrlClient);

      if(search.trim()!=='') {
        searchList(params)
      }else {
        getList(params);
      }
    },[search])

    const handlePageChange = (page: number) => {
      setPage(page);  
    };

    const handleSearchChange = debounce((value: string | null) => {
      if(value === null) {
        setSearch('');
      } else {
        setSearch(value);
      }
    },500)

    const getList = (params:string) => {
      blogApi.getListPost({ params: params }).then((data) => {
        let dataResponse: BaseResponse<any> = data.payload as BaseResponse<any>;
        setListPost(dataResponse.data);
        setMetaData(dataResponse.metadata);
      }).catch((error) => {
        console.error(error);
      });
    }

    const searchList = (params:string) => {
      blogApi.searchPost({ params: params }).then((data) => {
        let dataResponse: BaseResponse<any> = data.payload as BaseResponse<any>;
        console.log('dataResponse',dataResponse);
        setListPost(dataResponse.data);
        setMetaData(dataResponse.metadata);
      }).catch((error) => {
        console.error(error);
      });
    }

    const handleAction = (fetch:boolean) => {
      if(fetch) {
        const params = `?${search.trim()!==''? 'keyword='+search.trim()+'&' : ''}page=${page}&limit=${limit}`;
        getList(params);
      }
    }
  return (
    <>
      <Box width="100%" mb={5} display="flex" justifyContent="end">
        <SearchBar onChange={handleSearchChange}/>
      </Box>
      <BlogDataTable data={listPost} onAction={(e)=>handleAction(e)}/>
      {metaData && (
        <Box sx={{
          display: 'flex',
          justifyContent: 'end',
          mt: 5
        }}>
          <PaginationBlog
            totalPages={metaData.total_page}
            currentPage={page}
            limit={limit}
            onChange={handlePageChange}
          />
        </Box>
      )}
    </>
  );
};

export default BlogTableSection;
