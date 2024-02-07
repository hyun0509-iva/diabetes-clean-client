import { useState, useCallback, useRef } from "react";
import userState from "store/userState";
import { useCreateContents, useupdateContents } from "hooks/service/mutator";
import { useNavigate } from "react-router-dom";
import alertHandler, { alertMessage } from "utils/functions/alertHandler";
import ImageUpload from "../ImageUpload";
import Button from "components/common/Button";
import { ROUTER_PATH } from "constants/router_path";

import { ButtonGroup } from "components/domain/EditMemo/FormDiabetes/styles";
import { IContents } from "models/data";
import Textarea from "components/common/Textarea";
import { FormWrap, InputGroup, LabelWrap } from "../styles";
import { MdImage } from "react-icons/md";
import { MAX_FILES_COUNT } from "constants/variables";

const { STORY } = ROUTER_PATH;

interface Props {
  mode: "create" | "update";
  data?: IContents | null;
}

const ContentsForm = ({ mode, data }: Props) => {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const navigate = useNavigate();
  const createMutation = useCreateContents();
  const updateMutation = useupdateContents();
  const { userInfo } = userState();
  const userId = userInfo?._id as string;
  const [content, setContent] = useState((data?.content as string) || "");
  const [imageUrl, setImageUrl] = useState((data?.imageUrl as string) || "");
  const [imageName, setimageName] = useState((data?.imageName as string) || "");
  const [thumbnail, setThumbnail] = useState<string | Array<string> | null>(
    imageUrl || ""
  );

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

  /* 컨텐츠 추가 */
  const createContents = useCallback(
    (writer: string, content: string, imageName: string, imageUrl: string) => {
      createMutation.mutate({
        writer: writer,
        content,
        imageName,
        imageUrl
      });
    },
    []
  );

  /* 컨텐츠 수정 */
  const updateContents = useCallback((contentsId: string, content: string) => {
    updateMutation.mutate({
      contentsId: contentsId as string,
      content
    });
  }, []);

  const onSubmitContent = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (content !== "") {
        mode === "create"
          ? createContents(userId, content, imageName, imageUrl)
          : updateContents(data?._id as string, content);
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
      <Textarea
        ref={textAreaRef}
        value={content}
        onChange={onChangeContent}
        rows={13}
        placeholder={content || "댓글을 입력해주세요."}
      />
      <InputGroup>
        <LabelWrap>
          <label>
            이미지 추가
            <span className="img_icon">
              <MdImage fontSize={20} color="#9a9a9a" />
            </span>
            <span className="img_count">
              {thumbnail?.length} / {MAX_FILES_COUNT}
            </span>
          </label>
        </LabelWrap>
        <ImageUpload
          imageUrl={data?.imageUrl as Array<string> | string}
          setImgUrl={setImageUrl}
          setImgFileName={setimageName}
          thumbnail={thumbnail}
          setThumbnail={setThumbnail}
        />
      </InputGroup>
      <ButtonGroup>
        <Button type="button" context="취소하기" onClick={onCancal} />
        <Button type="submit" context="게시하기" />
      </ButtonGroup>
    </FormWrap>
  );
};

export default ContentsForm;
