import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  FormWrap,
  InputGroup,
  InputName,
  InputWrap,
  Valid,
  FrmBtnContainer,
  FormBtn
} from "pages/SignUp/styles";
import { useCreateUser } from "hooks/service/mutator";
import alertHandler from "utils/functions/alertHandler";
import { checkemailApi } from "utils/apis/userApis";
import { useNavigate } from "react-router-dom";
import { checkValidation } from "utils/functions/validation";
import { Link } from "react-router-dom";

const SignUpForm = () => {
  const navigate = useNavigate();
  const isFormValue = useRef(false);
  const [inputs, setInputs] = useState({
    email: "",
    nickname: "",
    password: "",
    passwordCheck: ""
  });

  const [isEmail, setIsEmail] = useState(false);
  const [isPw, setIsPw] = useState(false);
  const [isFocus, setIsFocus] = useState({
    isEmail: false,
    isPw: false
  });

  const [isCheckEmail, setIsCheckEmail] = useState(false);
  const [isCheckPw, setIsCheckPw] = useState(false);
  const [isCompleteState, setIsCompleteState] = useState(false);
  const [isComplete, setIsComplete] = useState({
    isCompleteEmail: false,
    isCompletePw: false,
    isCompleteNickname: false
  });

  const { email, password, passwordCheck, nickname } = inputs;

  useEffect(() => {
    const result = Object.values(isComplete).every((item) => !!item);
    setIsCompleteState(result);
  }, [isComplete]);

  const onFormChange = useCallback(
    (e: any) => {
      setInputs({
        ...inputs,
        [e.target.name]: e.target.value.trim()
      });
      isFormValue.current = true;
    },
    [inputs]
  );

  const onClickCheckEmail = useCallback(async () => {
    if (isEmail) {
      try {
        const res = await checkemailApi<string>(email);
        console.log(res);
        alertHandler.onToast({ msg: res.msg });
        setIsCheckEmail(true);
        setIsComplete({
          ...isComplete,
          isCompleteEmail: true
        });
      } catch (error: any) {
        if (error.status === 409) {
          alertHandler.onToast({ msg: error.data.msg, icon: "warning" });
          setIsCheckEmail(false);
          setIsComplete({
            ...isComplete,
            isCompleteEmail: false
          });
        } else {
          alertHandler.onToast({
            msg: "서버 오류, 잠시후 시도해주세요",
            icon: "error"
          });
          setIsCheckEmail(false);
          setIsComplete({
            ...isComplete,
            isCompleteEmail: false
          });
        }
        return;
      }
    } else {
      alertHandler.onToast({ msg: "이메일을 입력해주세요!" });
      setIsComplete({
        ...isComplete,
        isCompleteEmail: false
      });
    }
  }, [email, isComplete, isEmail]);

  const checkPw = (p1: string, p2: string) => p1 === p2;
  const onClickCheckPw = useCallback(() => {
    const isCheck = password && checkPw(password, passwordCheck);
    if (isCheck) {
      alertHandler.onToast({ msg: "비밀번호가 일치합니다." });
      setIsCheckPw(true);
      setIsComplete({
        ...isComplete,
        isCompletePw: true
      });
    } else {
      alertHandler.onToast({
        msg: "비밀번호가 일치하지 않습니다.",
        icon: "warning"
      });
      setIsCheckPw(false);
      setIsComplete({
        ...isComplete,
        isCompletePw: false
      });
      setInputs({
        ...inputs,
        password: "",
        passwordCheck: ""
      });
    }
  }, [inputs, isComplete, password, passwordCheck]);

  const mutation = useCreateUser();

  const onSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const userInfo = {
        email,
        password,
        nickname
      };
      if (isCheckEmail && isCheckPw && nickname) {
        console.log("회원가입하기");
        mutation.mutate(userInfo);
        navigate("/");
      }
    },
    [email, isCheckEmail, isCheckPw, mutation, nickname, password, navigate]
  );
  return (
    <FormWrap>
      <form onSubmit={onSubmit}>
        <InputGroup>
          <InputName htmlFor="email">이메일</InputName>
          <InputWrap>
            <input
              type="email"
              id="email"
              name="email"
              required
              disabled={isCheckEmail}
              placeholder="이메일을 입력해주세요"
              autoComplete="off"
              onChange={onFormChange}
              onFocus={() =>
                setIsFocus({
                  ...isFocus,
                  isEmail: true
                })
              }
              onBlur={(e) => setIsEmail(checkValidation(e))}
              value={email}
            />
            <div className="buttonWrap">
              <FormBtn
                className={`${isCheckEmail && "not-allowed"}`}
                top="0px"
                type="button"
                disabled={isCheckEmail}
                onClick={onClickCheckEmail}
              >
                중복확인
              </FormBtn>
            </div>
            {isFocus.isEmail && (
              <Valid className={`valid ${isEmail ? "success" : "error"}`}>
                {isEmail
                  ? "이메일 형식이 올바릅니다."
                  : "이메일 형식이 올바르지 않습니다."}
              </Valid>
            )}
          </InputWrap>
        </InputGroup>
        <InputGroup>
          <InputName htmlFor="pw">비밀번호</InputName>
          <InputWrap>
            <input
              type="password"
              id="password"
              name="password"
              required
              className="input-width"
              placeholder="비밀번호를 입력해주세요"
              disabled={isCheckPw}
              onChange={onFormChange}
              onBlur={(e) => setIsPw(checkValidation(e))}
              onFocus={() =>
                setIsFocus({
                  ...isFocus,
                  isPw: true
                })
              }
              value={password}
              autoComplete="off"
            />
            {isFocus.isPw && (
              <Valid className={`valid ${isPw ? "success" : "error"}`}>
                {isPw
                  ? "비밀 번호 형식이 올바릅니다."
                  : "문자와 특수문자 조합의 6 ~ 24자리를 입력"}
              </Valid>
            )}
          </InputWrap>
        </InputGroup>
        <InputGroup>
          <InputName htmlFor="passwordCheck">비밀번호 확인</InputName>
          <InputWrap>
            <input
              type="password"
              id="passwordCheck"
              name="passwordCheck"
              required
              placeholder="비밀번호 확인해주세요"
              disabled={isCheckPw}
              onChange={onFormChange}
              value={passwordCheck}
              autoComplete="off"
            />
            <FormBtn
              className={`${isCheckPw && "not-allowed"}`}
              top="0"
              type="button"
              onClick={onClickCheckPw}
              disabled={isCheckPw}
            >
              비밀번호 확인
            </FormBtn>
          </InputWrap>
        </InputGroup>
        <InputGroup>
          <InputName htmlFor="nickname">닉네임</InputName>
          <InputWrap>
            <input
              type="text"
              required
              id="nickname"
              className="input-width"
              name="nickname"
              placeholder="닉네임을 입력해주세요"
              onBlur={(e) =>
                String(e.target.value).length !== 0
                  ? setIsComplete({
                      ...isComplete,
                      isCompleteNickname: true
                    })
                  : setIsComplete({
                      ...isComplete,
                      isCompleteNickname: false
                    })
              }
              onChange={onFormChange}
              value={nickname}
              autoComplete="off"
            />
          </InputWrap>
        </InputGroup>
        <FrmBtnContainer top={"-20px"}>
          <button
            type="reset"
            style={{ width: "152px" }}
            onClick={(e) => {
              e.preventDefault();
              console.log("취소");
              setInputs({
                ...inputs,
                email: "",
                password: "",
                passwordCheck: "",
                nickname: ""
              });
              console.log(password);
              navigate("/");
            }}
          >
            취소하기
          </button>
          <button
            className={`${isCompleteState ? "" : "not-allowed"}`}
            type="submit"
            disabled={!isCompleteState}
            style={{ width: "152px" }}
          >
            회원가입
          </button>
          <div className="auth-msg">
            <span>
              회원이 이신가요? &nbsp;
              <Link to="/login">로그인</Link>하기
            </span>
          </div>
        </FrmBtnContainer>
      </form>
    </FormWrap>
  );
};

export default SignUpForm;
