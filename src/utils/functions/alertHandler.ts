import Swal, { SweetAlertIcon, SweetAlertPosition } from "sweetalert2";
import widthReactCount from "sweetalert2-react-content";

interface AlertType {
  title?: string | HTMLElement | JQuery | undefined;
  msg?: string;
  html?: string | HTMLElement | JQuery | undefined;
  pos?: SweetAlertPosition;
  icon?: SweetAlertIcon;
}

class AlertHandler {
  reactSwal = widthReactCount(Swal);
  alertMessage = {
    sucessMsg: "성공적으로 등록되었습니다.",
    delMsg: "기록이 삭제되었습니다.",
    cancelMsg: "취소되었습니다."
  };

  onDefaultAlert(props?: AlertType) {
    const swal = this.reactSwal.fire({
      title: props?.title,
      text: props?.msg,
      html: props?.html,
      position: props?.pos || "center",
      showCancelButton: false,
      confirmButtonColor: "#3085d6",
      confirmButtonText: "확인"
    });
    return swal;
  }
  onConfirm(props?: AlertType) {
    const swal = this.reactSwal.fire({
      title: props?.title,
      text: props?.msg,
      html: props?.html,
      position: "top",
      icon: props?.icon,
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      confirmButtonText: "확인",
      cancelButtonText: "취소",
      reverseButtons: true // 버튼 순서 거꾸로
    });
    return swal;
  }
  onToast(props?: AlertType) {
    const Toast = this.reactSwal.mixin({
      toast: true,
      position: props?.pos || "top-end",
      showConfirmButton: false,
      timerProgressBar: true,
      timer: 2000,
      didOpen: (toast) => {
        toast.addEventListener("mouseenter", this.reactSwal.stopTimer);
        toast.addEventListener("mouseleave", this.reactSwal.resumeTimer);
      }
    });
    Toast.fire({
      icon: props?.icon || "success",
      text: props?.msg
    });
  }
}

export const { alertMessage } = new AlertHandler();
export default new AlertHandler();
