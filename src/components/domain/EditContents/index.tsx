import { useLocation } from "react-router-dom";
import ContentsForm from "components/domain/EditContents/ContentsForm";
import { IContentsDetailResponse } from "models/data";
import { CONTENTS_KEY } from "constants/query_key";
import { useAPIByIdQuery } from "hooks/service/queries";
import { getContentsFindById } from "utils/apis/contents";
import { Container } from "styles/common";
import { EditHeader, EditBody } from "./styles";

const EditContents = () => {
  const { pathname, state: contentsId } = useLocation();
  const { data, isError } = useAPIByIdQuery<IContentsDetailResponse>(
    contentsId,
    CONTENTS_KEY,
    getContentsFindById
  );
  const mode = pathname.split("/")[1];
  console.log({ data, mode });
  if (isError) {
    return (
      <div>
        당수치 데이터를 불러오는데 실패했습니다.
        <br />
        네트워크를 확인해주세요!
      </div>
    );
  }
  return (
    <div className="form-wrap">
      <Container>
        <EditHeader>
          <div className="contents-title">
            <span>
              컨텐츠 {`${mode === "create" ? "작성하기" : "수정하기"}`}
            </span>
          </div>
        </EditHeader>
        <EditBody>
          {mode === "create" ? (
            <ContentsForm mode="create" />
          ) : (
            data && <ContentsForm mode="update" data={data.contentsInfo} />
          )}
        </EditBody>
      </Container>
    </div>
  );
};

export default EditContents;
