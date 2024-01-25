import { useLocation } from "react-router-dom";
import NavMenu from "components/common/NavMenu";
import FormDiabetes from "./FormDiabetes";
import { getDiabetesFindById } from "utils/apis/diabetesApis";
import { ROUTER_PATH } from "constants/router_path";
import { DIABETES_KEY } from "constants/query_key";
import { useAPIByIdQuery } from "hooks/service/queries";
import { IDiabetesInfo, IDiabetesResponse } from "models/data";
import { Container } from "styles/common";
import { EditBody, EditHeader } from "./styles";

const EditMemo = () => {
  const { pathname, state: DiabetesId } = useLocation();
  const { data, isError } = useAPIByIdQuery<IDiabetesResponse>(
    DiabetesId,
    DIABETES_KEY,
    getDiabetesFindById
  );
  const mode = pathname.split("/")[1];
  const { SAVE_MEMO_DIABETES, SAVE_MEMO_DIET } = ROUTER_PATH;
  const subMenus = [
    { id: 1, label: "당수치 기록", url: `${SAVE_MEMO_DIABETES}` },
    { id: 2, label: "식단 기록", url: `${SAVE_MEMO_DIET}` }
  ];

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
    <Container>
      <EditHeader>
        <div className="memo-title">
          <span>당수치 {mode === "create" ? "기록하기" : "수정하기"}</span>
        </div>
        <NavMenu
          lists={subMenus}
          bgColor="#f1f3f5"
          style={{
            display: "none", // TODO:식단 CRUD 구현할 때 활성화
            boxShadow: "0px 0px 12px -3px rgb(0 0 0 / 30%)"
          }}
        />
      </EditHeader>
      <EditBody>
        {mode === "create" ? (
          <FormDiabetes data={null} />
        ) : (
          data && (
            <FormDiabetes
              mode="update"
              data={data.diabetesInfo as IDiabetesInfo}
            />
          )
        )}
      </EditBody>
      {/* 
       식단 CRUD 개발후 활성화
      <EditBody>
        <Outlet />
      </EditBody> */}
    </Container>
  );
};

export default EditMemo;
