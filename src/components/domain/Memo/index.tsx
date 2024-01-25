import { useState, useMemo, useCallback } from "react";
import dayjs from "dayjs";
import DateArea from "./components/DateArea";
import Diabetes from "components/domain/Memo/DiabetesList";
import SideBtnMenu from "components/common/SideBtnMenu";
import alertHandler from "utils/functions/alertHandler";
import { ROUTER_PATH } from "constants/router_path";
import { Container } from "styles/common";
import { MemoContents, MemoHeader } from "./styles";

const MemoList = () => {
  const { SAVE_MEMO_DIABETES } = ROUTER_PATH;
  const [curDate, setCurDate] = useState(dayjs());
  const [today] = useState(dayjs().format("YYYY-MM"));

  const currentDate = useMemo(
    () =>
      `${curDate.year()}년 ${
        curDate.month() < 9 ? "0" + (curDate.month() + 1) : curDate.month() + 1
      }월`,
    [curDate]
  );

  const incrementDate = useCallback(() => {
    const today_ = Number(today.split("-").join(""));
    const curDate_ = Number(curDate.format("YYYY-MM").split("-").join(""));
    if (today_ <= curDate_) {
      alertHandler.onDefaultAlert({
        msg: "이번달까지만 조회 가능합니다."
      });
      return;
    }
    setCurDate(curDate.add(1, "month"));
  }, [curDate, today]);

  const decrementDate = useCallback(() => {
    setCurDate(curDate.subtract(1, "month"));
  }, [curDate]);

  const menuItem = useMemo(
    () => [
      {
        id: 1,
        path: `${SAVE_MEMO_DIABETES}`,
        label: "당수치 기록"
      }
      // ,
      // {
      //   id: 2,
      //   path: `${SAVE_MEMO_DIET}`,
      //   label: "식단 기록"
      // }
    ],
    [SAVE_MEMO_DIABETES]
  );

  return (
    <Container>
      <MemoHeader>
        <h1 className="memo-title">
          <span>기록 내역</span>
        </h1>
        {/* <Submenu /> */} {/* <-- 식단 기능 추가후 활성화 --> */}
        <DateArea
          currentDate={currentDate}
          incrementDate={incrementDate}
          decrementDate={decrementDate}
        />
        <br />
      </MemoHeader>
      <MemoContents>
        {/* 아래 주석은 식단 CRUD 개발하면 활성화하기 */}
        {/* <Routes>
          <Route
            path="diabetes"
            element={<Diabetes diabetesInfo={processData} />}
          />
          <Route path="diet" element={<Diet />} />
        </Routes> */}
        <Diabetes curDate={curDate} />
      </MemoContents>
      <SideBtnMenu menuItem={menuItem} />
    </Container>
  );
};

export default MemoList;
