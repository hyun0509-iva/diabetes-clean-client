import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import Input from "components/common/Input";
import userState from "store/userState";
import { useCreateDiabetes } from "hooks/service/mutator";
import { ISelectedSlotItem, selectedSlotItem } from "libs/slotItem";
import alertHandler, { alertMessage } from "utils/functions/alertHandler";
import {
  ButtonGroup,
  FormWrap,
  InputGroup,
  InputWrap,
  LabelWrap,
  Select,
  TextareaGroup,
  UnitTextWrap
} from "./styles";
import Button from "components/common/Button";
import { useInput } from "hooks/common/useInput";
import { IDiabetesInfo, IDiabetesRequest } from "models/data";
import useUpdateDiabetes from "hooks/service/mutator/diabetes/useUpdateDiabetes";
import modalState from "store/modalState";

interface Props {
  mode: string;
  data: IDiabetesInfo | null;
}
const FormDiabetes = ({ mode, data }: Props) => {
  const date = (data?.createdAt as string)?.split(" ")[0];
  const time = (data?.createdAt as string)?.split(" ")[1];
  const { closeModal } = modalState();
  const { userInfo } = userState();
  const userId = userInfo?._id as string;
  const createMutate = useCreateDiabetes();
  const updateMudate = useUpdateDiabetes();
  const navigate = useNavigate();

  const [sugarLevel, , onChangeSugarLevel] = useInput<string>(
    String(data?.sugar_level ?? "")
  );
  const [writtenDate, , onChangeWrittenDate] = useInput(
    date || dayjs().format("YYYY-MM-DD")
  );
  const [writtenTime, , onChangeWrittenTime] = useInput(
    time || dayjs().format("HH:mm")
  );

  const [slot, setSlot] = useState<string>(data?.slot as string);
  const [inutMemo, setInutMemo] = useState<string>(data?.note as string);

  const onChangeMemo = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setInutMemo(e.target.value);
    },
    [setInutMemo]
  );

  const onChnageSlot = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setSlot(e.target.value);
    },
    []
  );

  const onCancal = useCallback(() => {
    alertHandler
      .onConfirm({
        icon: "warning",
        html: (
          <p>
            페이지를 떠나면 기록한 내용이 모두 없어집니다.
            <br />
            그래도 떠나시겠습니까?
          </p>
        )
      })
      .then((result) => {
        if (result.isConfirmed) {
          navigate(-1);
          closeModal();
        } else if (result.isDismissed) {
          alertHandler.onToast({ msg: alertMessage.cancelMsg });
          closeModal();
        }
      });
  }, [closeModal, navigate]);

  const onWriteMemo = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const createdAt: string = dayjs(`${writtenDate} ${writtenTime}`).format(
        "YYYY-MM-DD HH:mm:ss"
      );
      const insertData: IDiabetesRequest = {
        writer: userId,
        sugar_level: Number(sugarLevel),
        slot,
        note: inutMemo as string,
        createdAt
      };

      if (sugarLevel && slot) {
        console.log(insertData);
        if (mode === "create") {
          createMutate.mutate(insertData);
        } else {
          updateMudate.mutate({
            diabetesId: data?._id as string,
            diabetesData: insertData
          });
        }
      } else {
        const text = !sugarLevel
          ? "당수치를 입력해주세요"
          : "시간대를 입력해주세요";
        alertHandler.onToast({ msg: text, icon: "info" });
      }
    },
    [
      writtenDate,
      writtenTime,
      userId,
      sugarLevel,
      slot,
      inutMemo,
      mode,
      createMutate,
      updateMudate,
      data?._id
    ]
  );

  return (
    <FormWrap onSubmit={onWriteMemo}>
      <InputGroup>
        <LabelWrap>
          <label>날짜</label>
        </LabelWrap>
        <InputWrap>
          <Input
            type="date"
            value={writtenDate}
            onChange={onChangeWrittenDate}
            required
          />
        </InputWrap>
      </InputGroup>
      <InputGroup>
        <LabelWrap>
          <label>시간</label>
        </LabelWrap>
        <InputWrap>
          <Input
            type="time"
            value={writtenTime}
            onChange={onChangeWrittenTime}
            required
          />
        </InputWrap>
      </InputGroup>
      <InputGroup>
        <LabelWrap>
          <label>시간대</label>
        </LabelWrap>
        <InputWrap>
          <Select onChange={onChnageSlot} value={slot}>
            {selectedSlotItem.map(({ id, slot, dec }: ISelectedSlotItem) => (
              <option key={id} value={slot}>
                {dec}
              </option>
            ))}
          </Select>
        </InputWrap>
      </InputGroup>
      <InputGroup>
        <LabelWrap>
          <label>당수치</label>
        </LabelWrap>
        <InputWrap>
          <Input
            value={sugarLevel}
            maxLength={3}
            placeholder="당수치를 입력해주세요"
            pattern="[0-9]+"
            onChange={onChangeSugarLevel}
            required
          />
        </InputWrap>
        <UnitTextWrap>
          <span>mg/dl</span>
        </UnitTextWrap>
      </InputGroup>
      <TextareaGroup>
        <textarea
          value={inutMemo}
          placeholder="오늘 당관리는 어떠셨나요?"
          onChange={onChangeMemo}
        />
      </TextareaGroup>
      <ButtonGroup>
        <Button type="button" context="취소하기" onClick={onCancal} />
        <Button
          type="submit"
          context={mode === "create" ? "작성하기" : "수정하기"}
        />
      </ButtonGroup>
    </FormWrap>
  );
};

FormDiabetes.defaultProps = {
  mode: "create"
};

export default FormDiabetes;
