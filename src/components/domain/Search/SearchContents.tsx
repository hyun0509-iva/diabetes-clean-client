import { useSearchParams } from "react-router-dom";
import { getSearchContentsAPI } from "utils/apis/contents";
import { StoryWarp } from "components/domain/Feed/styles";
import SearchPost from "components/common/Posts";

const SearchContents = () => {
  const [query] = useSearchParams();
  const keyword = query.get("keyword");
  return (
    <StoryWarp className="search-results">
      <SearchPost
        queryKey={`search_post/${keyword}`}
        showTotal={true}
        params={keyword as string}
        fetcher={getSearchContentsAPI}
      />
    </StoryWarp>
  );
};

export default SearchContents;
