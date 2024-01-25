import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import axios from "axios";
import PostItem from "./PostItem";
import { useInfiniteQuery } from "@tanstack/react-query";
import { IContentsResponse } from "models/data";
import { ErrprPostItemWrap, PostCardWrap } from "./styles";

interface IProps {
  params: string;
  showTotal?: boolean;
  fetcher: (page: string, context: string) => Promise<IContentsResponse>;
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
      return lastPage.contents.length === listSize
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
      return data.pages.map((page) =>
        page.contents.map((post) => {
          return (
            <div key={post._id}>
              <PostCardWrap
                key={post._id}
                ref={page.contents?.length === listSize ? ref : null}
              >
                <PostItem {...post} />
              </PostCardWrap>
            </div>
          );
        })
      );
    } else {
      if (axios.isAxiosError(error)) {
        console.log(error);
        let errorMessage = "";
        if (error.response?.status === 404 || error.response?.status === 403) {
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
    }
  };

  return (
    <>
      {renderContext()}
      {isFetchingNextPage && (
        <h3 style={{ position: "fixed", top: 10, left: 10 }}>Loading...</h3>
      )}
    </>
  );
};

export default Posts;
