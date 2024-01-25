import { useState, useEffect } from "react";
import dayjs from "dayjs";
import { useAPIByIdQuery } from "hooks/service/queries";
import { IDiabetesInfo, IDiabetesResponse } from "models/data";
import { ISortedData, getSortedData } from "utils/functions/getSortedData";
import { getDiabetes } from "utils/apis/diabetesApis";
import { getThisMonthData } from "utils/functions/getThisMonthData";
import { DIABETES_KEY } from "constants/query_key";
import userState from "store/userState";
import DiabetesItem from "components/domain/Memo/DiabetesItem";
import {
  DiabetesListWrap,
  DiabetesItemWrap,
  DiabetesItemContainer
} from "components/domain/Memo/styles";

interface Props {
  curDate: dayjs.Dayjs;
}
const DiabetesList = ({ curDate }: Props) => {
  const [processData, setProcessData] = useState<ISortedData>({});
  const { userInfo } = userState();
  const userId = userInfo?._id as string;
  const datas = Object.entries(processData);

  const {
    data: diabetesData,
    isError,
    isLoading
  } = useAPIByIdQuery<IDiabetesResponse>(userId, DIABETES_KEY, getDiabetes);
  const diabetesInfo = diabetesData?.diabetesInfo as IDiabetesInfo[];
  useEffect(() => {
    const thisMonthData =
      diabetesInfo && getThisMonthData(diabetesInfo, curDate);

    if (thisMonthData) {
      const data = getSortedData(thisMonthData);
      setProcessData(data);
    }
  }, [curDate, diabetesData, diabetesInfo]);

  if (isLoading) return <div>당수치 내역을 불러오는중입니다.</div>;
  if (isError) return <div>데이터를 가져오는 실패했어요</div>;

  return (
    <DiabetesListWrap className="diabetes-wrap">
      {datas.length ? (
        datas.map((data, idx) => (
          <DiabetesItemContainer key={idx} className="diabetes-container">
            <div className="date">
              <span>{data[0]}</span>
            </div>
            <div className="context">
              {data[1].map((data) => (
                <DiabetesItem key={data._id} {...data} />
              ))}
            </div>
          </DiabetesItemContainer>
        ))
      ) : (
        <DiabetesItemWrap>기록한 내역이 없습니다.</DiabetesItemWrap>
      )}
    </DiabetesListWrap>
  );
};

export default DiabetesList;
