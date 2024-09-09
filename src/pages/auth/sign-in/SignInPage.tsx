import React, { useState } from "react";
import logo from "../../../assets/logo.png";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import AuthWrapper from "../AuthWrapper";
import LabeledInput from "../../../components/labeled-input/LabeledInput";
import Button from "../../../components/button/Button";
import { ButtonType } from "../../../components/button/StyledButton";
import { StyledH3 } from "../../../components/common/text";
import { useSignIn } from "../../../hooks/useSignIn";
import { Author } from "../../../interfaces/user.interface";
import { profile } from "console";
import { ToastType } from "../../../components/toast/Toast";
import ToastPortal from "../../../components/toast/ToastPortal";

const SignInPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { t } = useTranslation();

  const { mutate, isSuccess, isError, error } = useSignIn({
    onSuccess: (data: any) => {
      localStorage.setItem('token', data?.token)

      navigate('/home');
    },
    onMutate: () => {
      localStorage.clear()
    },

  });

  const handleSubmit = (event: any) => {
    event.preventDefault();
    mutate({email, password});
  };

  return (
    <AuthWrapper>
      <div className={"border"}>
        <div className={"container"}>
          <div className={"header"}>
            <img src={logo} alt={"Twitter Logo"} />
            <StyledH3>{t("title.login")}</StyledH3>
          </div>
          <div className={"input-container"}>
            <LabeledInput
              required
              placeholder={"Enter user..."}
              title={t("input-params.username")}
              error={isError}
              onChange={(e) => setEmail(e.target.value)}
            />
            <LabeledInput
              type="password"
              required
              placeholder={"Enter password..."}
              title={t("input-params.password")}
              error={isError}
              onChange={(e) => setPassword(e.target.value)}
            />
            <p className={"error-message"}>{error && t("error.login")}</p>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <Button
              text={t("buttons.login")}
              buttonType={ButtonType.FOLLOW}
              size={"MEDIUM"}
              onClick={handleSubmit}
            />
            <Button
              text={t("buttons.register")}
              buttonType={ButtonType.OUTLINED}
              size={"MEDIUM"}
              onClick={() => navigate("/sign-up")}
            />
          </div>
        </div>
      </div>
      {isError && <ToastPortal message={error.message} type={ToastType.ERROR} />}
       
    </AuthWrapper>
  );
};

export default SignInPage;
