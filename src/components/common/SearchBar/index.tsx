import { useEffect, useCallback, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdSearch, MdClear } from "react-icons/md";
import { SearchForm } from "./styles";
import alertHandler from "utils/functions/alertHandler";

const SearchBar = () => {
  const [searchText, setSearchText] = useState("");
  const [isClick, setIsClick] = useState(false);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (searchText.length) {
      setIsClick(true);
    }
  }, [searchText]);

  const onCleanIcon = useCallback(() => {
    if (inputRef.current) {
      setIsClick(false);
      (inputRef.current as HTMLInputElement).value = "";
    }
  }, []);

  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  }, []);

  const onSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (searchText) {
        navigate(`/search?keyword=${searchText}`);
      } else {
        alertHandler.onToast({
          msg: "검색어를 입력해주세요!",
          icon: "warning"
        });
      }
    },
    [navigate, searchText]
  );

  return (
    <SearchForm onSubmit={onSubmit}>
      <div className="search-inner">
        <div className="input-wrap">
          <input
            ref={inputRef}
            onChange={onChange}
            type="search"
            name="search"
            placeholder="검색어를 입력해주세요"
            autoComplete="off"
          />
          <span
            className={`clear-btn ${searchText.length && isClick ? "on" : ""}`}
            onClick={onCleanIcon}
          >
            <MdClear />
          </span>
        </div>
        <button type="submit" className="search-icon">
          <MdSearch width={"100%"} size={25} color="gray" />
        </button>
      </div>
    </SearchForm>
  );
};

export default SearchBar;
