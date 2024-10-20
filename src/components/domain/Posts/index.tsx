import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import axios from "axios";
import PostItem from "./PostItem";
import { useInfiniteQuery } from "@tanstack/react-query";
import { IContentsResponse } from "models/data";
import {
  EmptyPostItemWrap,
  ErrprPostItemWrap,
  PostCardWrap,
  PostItemWrap
} from "./styles";
import alertHandler from "utils/functions/alertHandler";

interface IProps {
  params: string;
  showTotal?: boolean;
  fetcher: (page: string, context: string) => Promise<any>;
  queryKey?: string;
}
const Posts = ({ params, queryKey, fetcher }: IProps) => {
  const listSize = 10; //한 페이지에 보여질 게시글 수
  const { ref, inView } = useInView();

  const {
    data,
    error,
    isSuccess,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage
  } = useInfiniteQuery<IContentsResponse>({
    queryKey: [queryKey],
    queryFn: ({ pageParam = 1 }) => fetcher(pageParam, params),
    staleTime: 1000 * 60, // 1분간 refetch 안함
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.contents?.length === listSize
        ? allPages.length + 1
        : undefined;
    }
  });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage]);
  const renderContext = () => {
    if (isSuccess) {
      return data.pages.map((page) => {
        if (page.contents === null) {
          return (
            <PostCardWrap key="0">
              <EmptyPostItemWrap>컨텐츠가 존재하지 않습니다.</EmptyPostItemWrap>
            </PostCardWrap>
          );
        } else {
          console.log({ page });
          return page.contents?.map((post) => (
            <PostCardWrap
              key={post._id}
              ref={page.contents?.length !== listSize ? null : ref}
            >
              <PostItem {...post} />
              {page.contents?.length !== listSize && (
                <PostItemWrap>더 이상 불러올 컨텐츠가 없습니다. </PostItemWrap>
              )}
            </PostCardWrap>
          ));
        }
      });
    }
    if (axios.isAxiosError(error)) {
      console.log(error);
      let errorMessage = "";
      if (error.response?.status === 400 || error.response?.status === 403) {
        errorMessage = error.response?.data?.msg;
      }
      if (error.response?.status === 500) {
        errorMessage = "서버 에러, 잠시후 다시 시작해주세요";
      }
      return (
        <PostCardWrap>
          <ErrprPostItemWrap>{errorMessage}</ErrprPostItemWrap>
        </PostCardWrap>
      );
    }
  };

  console.log(data?.pages[0].contents);
  return (
    <>
      {renderContext()}
      {isFetchingNextPage && (
        <h3 style={{ position: "fixed", top: 10, left: 10, zIndex: 99 }}>
          Loading...
        </h3>
      )}
    </>
  );
};

export default Posts;
