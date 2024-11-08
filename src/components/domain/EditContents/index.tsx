import { useLocation } from "react-router-dom";
import ContentsForm from "components/domain/EditContents/ContentsForm";
import { IContentsDetailResponse } from "models/data";
import { QUERY_KEY } from "constants/query_key";
import { useAPIByParamQuery } from "hooks/service/queries";
import { getContentsFindByIdAPI } from "utils/apis/contents";
import { EditHeader, EditContent, EditContentsWrap } from "./styles";

const { CONTENTS_KEY } = QUERY_KEY;

const EditContents = () => {
  const { pathname, state: contentsId } = useLocation();
  const { data, isError } = useAPIByParamQuery<IContentsDetailResponse>(
    contentsId,
    CONTENTS_KEY,
    getContentsFindByIdAPI
  );
  const mode = pathname.split("/")[1];
  if (isError) {
    return (
      <div>
        당수치 데이터를 불러오는데 실패했습니다.
        <br />
        네트워크를 확인해주세요!
      </div>
    );
  }
  console.log({ data });
  return (
    <div className="form-wrap">
      <EditContentsWrap>
        <EditHeader>
          <div className="contents-title">
            <span>
              컨텐츠 {`${mode === "create" ? "작성하기" : "수정하기"}`}
            </span>
          </div>
        </EditHeader>
        <EditContent>
          {mode === "create" ? (
            <ContentsForm mode="create" />
          ) : (
            data && <ContentsForm mode="update" data={data.contents} />
          )}
        </EditContent>
      </EditContentsWrap>
    </div>
  );
};

export default EditContents;
