import styled from "@emotion/styled";

export const BollSpinnerWrap = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  .boll_sheet {
    height: 200px;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .boll {
    background-color: #dd8241;
    border-radius: 50%;
    width: 20px;
    height: 20px;
    margin-left: 20px;
    animation: bounce 1s infinite;
  }
  .boll:nth-of-type(1) {
    animation-delay: -0.2s;
  }
  .boll:nth-of-type(2) {
    animation-delay: -0.4s;
  }
  .boll:nth-of-type(3) {
    animation-delay: -0.6s;
  }

  @keyframes bounce {
    0%,
    100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(20px);
    }
  }
`;

export const OvalSpinnerWrap = styled.div`
  width: 100%;
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  justify-content: center;
  align-items: center;

  .oval {
    display: inline-block;
    border: 3px solid #f3f3f3; /* Light grey */
    border-top: 3px solid #6ea9ce; /* Blue */
    border-radius: 50%;
    width: 80px;
    height: 80px;
    animation: spin 1s linear infinite;
    margin: 13px 10px;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
