import { useState, useCallback } from "react";
import userState from "store/userState";
import { useCreateContents, useupdateContents } from "hooks/service/mutator";
import { useNavigate } from "react-router-dom";
import alertHandler, { alertMessage } from "utils/functions/alertHandler";
import ImageUpload from "../ImageUpload";
import Button from "components/common/Button";
import { ROUTER_PATH } from "constants/router_path";

import {
  ButtonGroup,
  FormWrap,
  InputGroup,
  TextareaGroup
} from "components/domain/EditMemo/FormDiabetes/styles";
import { IContents } from "models/data";

const { STORY } = ROUTER_PATH;

interface Props {
  mode: "create" | "update";
  data?: IContents | null;
}

const ContentsForm = ({ mode, data }: Props) => {
  console.log({ data });
  const navigate = useNavigate();
  const createMutation = useCreateContents();
  const updateMutation = useupdateContents();
  const { userInfo } = userState();
  const userId = userInfo?._id as string;
  const [content, setContent] = useState((data?.content as string) || "");
  const [imageUrl, setImageUrl] = useState((data?.imageUrl as string) || "");
  const [imageName, setimageName] = useState((data?.imageName as string) || "");

  const onChangeContent = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setContent(e.target.value);
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
        } else if (result.isDismissed) {
          alertHandler.onToast({ msg: alertMessage.cancelMsg });
        }
      });
  }, [navigate]);

  const onSubmitContent = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      const insertData = {
        writer: userId,
        content,
        imageName,
        imageUrl
      };

      if (content !== "") {
        if (mode === "create") {
          createMutation.mutate(insertData);
        } else {
          /* TODO 우선 이미지 업로드부분은 생략 (구현 완료후 수정)*/
          updateMutation.mutate({
            contentsId: data?._id as string,
            content
          });
        }
        navigate(STORY, { replace: true });
      } else {
        alertHandler.onToast({ msg: "내용을 입력해주세요!", icon: "warning" });
      }
    },
    [
      content,
      createMutation,
      data?._id,
      imageName,
      imageUrl,
      mode,
      navigate,
      updateMutation,
      userId
    ]
  );
  return (
    <FormWrap onSubmit={onSubmitContent}>
      <TextareaGroup>
        <textarea
          placeholder="당신의 이야기를 들려주세요"
          value={content}
          onChange={onChangeContent}
        />
      </TextareaGroup>
      <InputGroup style={{ position: "relative" }}>
        <ImageUpload
          imageUrl={data?.imageUrl as string}
          setImgUrl={setImageUrl}
          setImgFileName={setimageName}
        />
      </InputGroup>
      <ButtonGroup>
        <Button type="button" text="취소하기" onClick={onCancal} />
        <Button type="submit" text="게시하기" />
      </ButtonGroup>
    </FormWrap>
  );
};

export default ContentsForm;
