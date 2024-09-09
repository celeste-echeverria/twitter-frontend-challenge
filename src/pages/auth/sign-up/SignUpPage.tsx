import type { ChangeEvent } from "react";
import React, { useState } from "react";
import logo from "../../../assets/logo.png";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import AuthWrapper from "../../../pages/auth/AuthWrapper";
import LabeledInput from "../../../components/labeled-input/LabeledInput";
import Button from "../../../components/button/Button";
import { ButtonType } from "../../../components/button/StyledButton";
import { StyledH3 } from "../../../components/common/text";
import { SignInData, SignUpData } from "../../../interfaces/auth.interface";
import { useSignUp } from "../../../hooks/useSignUp";
import { useMutation } from "@tanstack/react-query";
import { authAxios } from "../../../api/axiosConfig";
import ToastPortal from "../../../components/toast/ToastPortal";
import { ToastType } from "../../../components/toast/Toast";


const SignUpPage = () => {

  const [data, setData] = useState<SignUpData>({name: '', username: '', email: '', password: '', confirmPassword: ''});
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleChange =
    (prop: string) => (event: ChangeEvent<HTMLInputElement>) => {
      setData({ ...data, [prop]: event.target.value });
  };

  const { confirmPassword, ...requestData } = data;

  const { mutate, isSuccess, isError, error } = useSignUp()

  const handleSubmit = (event: any) => {
    event.preventDefault();
    mutate(requestData);
  };

  return (
    <AuthWrapper>
      <div className={"border"}>
        <div className={"container"}>
          <div className={"header"}>
            <img src={logo} alt="Twitter Logo" />
            <StyledH3>{t("title.register")}</StyledH3>
          </div>
          <div className={"input-container"}>
            <LabeledInput
              required
              placeholder={"Enter name..."}
              title={t("input-params.name")}
              error={isError}
              onChange={handleChange("name")}
            />
            <LabeledInput
              required
              placeholder={"Enter username..."}
              title={t("input-params.username")}
              error={isError}
              onChange={handleChange("username")}
            />
            <LabeledInput
              required
              placeholder={"Enter email..."}
              title={t("input-params.email")}
              error={isError}
              onChange={handleChange("email")}
            />
            <LabeledInput
              type="password"
              required
              placeholder={"Enter password..."}
              title={t("input-params.password")}
              error={isError}
              onChange={handleChange("password")}
            />
            <LabeledInput
              type="password"
              required
              placeholder={"Confirm password..."}
              title={t("input-params.confirm-password")}
              error={isError}
              onChange={handleChange("confirmPassword")}
            />
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <Button
              text={t("buttons.register")}
              buttonType={ButtonType.FOLLOW}
              size={"MEDIUM"}
              onClick={handleSubmit}
            />
            <Button
              text={t("buttons.login")}
              buttonType={ButtonType.OUTLINED}
              size={"MEDIUM"}
              onClick={() => navigate("/sign-in")}
            />
          </div>
        </div>
      </div>
      {isError && <ToastPortal message={error.message} type={ToastType.ERROR} />}
    </AuthWrapper>
  );
};

export default SignUpPage;
