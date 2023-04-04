import { Alert, Button, Container, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useIMask } from "react-imask";
import { useNavigate } from "react-router-dom";
import { checkFormLogin } from "../../utils/AccountValidation";
//import { AccountService } from "../../services/AccountService";
//import { AccountValidation } from "../../utils/AccountValidation";
import "./FormLogin.css";
import { Customer } from "./../../models/Customer";
import { loginFormRequest } from "../../services/AccountService";

const PasswordMask = () => {
  const [optsPassword, setOptsPassword] = useState({
    mask: String("000000"),
  });

  const {
    ref,
    maskRef,
    value,
    setValue,
    unmaskedValue,
    setUnmaskedValue,
    typedValue,
    setTypedValue,
  } = useIMask(optsPassword);

  return ref;
};

const CpfMask = () => {
  const [optsCpf, setOptsCpf] = useState({
    mask: String("000.000.000-00"),
  });

  const {
    ref,
    maskRef,
    value,
    setValue,
    unmaskedValue,
    setUnmaskedValue,
    typedValue,
    setTypedValue,
  } = useIMask(optsCpf);

  return ref;
};

export const FormLogin = () => {
  const navigate = useNavigate();
  const refCpf = CpfMask();
  const refPassword = PasswordMask();
  const cpf = refCpf.current?.value;
  const password = refPassword.current?.value;
  const [mesage, setMesage] = useState<string>("");
  const [showElement, setShowElement] = useState<boolean>(false);

  //949.612.154-30
  //481228
  const login = () => {
    const customer: Customer = {
      cpf: cpf,
      password: password,
    };

    const loginChecked = checkFormLogin(customer);
    if (loginChecked !== "login verificado") showMesage(loginChecked);
    else {
      loginFormRequest(customer).then((value) => {
        if (typeof value === "string") showMesage(value);
        else navigate("/selection", { state: value });
      });
    }
  };

  const showMesage = (value: string) => {
    setMesage(value);
    setShowElement(true);
    setTimeout(() => {
      hiddenMesage();
    }, 2000);
  };

  const hiddenMesage = () => {
    setShowElement(false);
  };

  return (
    <>
      <Container className="container-login" maxWidth="xs">
        {showElement ? (
          <div id="alert-error">
            <Alert variant="filled" severity="error">
              <span>{mesage}</span>
            </Alert>
          </div>
        ) : null}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            login();
          }}
        >
          <div>
            <TextField
              fullWidth
              label="cpf:"
              id="cpf"
              size="small"
              variant="standard"
              type={"text"}
              inputRef={refCpf}
            />
          </div>
          <div>
            <TextField
              fullWidth
              label="senha:"
              id="password"
              size="small"
              variant="standard"
              type={"text"}
              inputRef={refPassword}
            />
          </div>
          <br />
          <div>
            <Button
              type="submit"
              variant="contained"
              className="button-login"
              fullWidth
            >
              Logar
            </Button>
          </div>
        </form>
      </Container>
    </>
  );
};
