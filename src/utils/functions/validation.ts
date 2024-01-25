export const checkValidation = (
  e: React.FocusEvent<HTMLInputElement, Element>
): boolean => {
  const { name, value } = e.target;
  const isValidProps = {
    isValidEmail:
      /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{3,6}(?:\.[a-z]{2})?)$/,
    isPw: /(?=.*[a-zA-ZS])(?=.*?[#?!@$%^&*-]).{6,24}/
  };
  let isValidCheck = false;

  switch (name) {
    case "email":
      // setIsEmail(isValidProps["isValidEmail"].test(value));
      isValidCheck = isValidProps["isValidEmail"].test(value);
      break;
    case "password":
      // setIsPw(isValidProps["isPw"].test(value.trim()));
      isValidCheck = isValidProps["isPw"].test(value.trim());
      break;
    default:
      isValidCheck = false;
      break;
  }

  return isValidCheck;
};
