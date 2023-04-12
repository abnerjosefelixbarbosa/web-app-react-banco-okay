import axios from "axios";
import { BASE_URL } from "../../utils/request";
import { Account } from "../../models/Account";
import { Customer } from "../../models/Customer";
import { useIMask } from "react-imask";
import { useEffect, useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import { Alert, Button, Container, TextField } from "@mui/material";

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

const checkFormLogin = (customer: Customer) => {
  if (customer.cpf === "") return "cpf invalido";
  if (customer.password === "") return "senha invalido";

  return "login verificado";
};

const requestFormLogin = async (customer: Customer) => {
  return await axios
    .post(`${BASE_URL}/accounts/login-account-by-cpf-and-password`, customer)
    .then((response) => {
      const account: Account = { ...response.data };
      return account;
    })
    .catch((e) => {
      const mesage: string = e.response.data;
      return mesage;
    });
};

export const Login = () => {
  const navigate = useNavigate();
  const refCpf = CpfMask();
  const refPassword = PasswordMask();
  const [mesage, setMesage] = useState<string>("");
  const [showElement, setShowElement] = useState<boolean>(false);

  //949.612.154-30
  //481228
  const handLogin = () => {
    const data: Customer = {
      cpf: refCpf.current?.value,
      password: refPassword.current?.value,
    };

    const loginChecked = checkFormLogin(data);
    if (loginChecked !== "login verificado") showMesage(loginChecked);
    else {
      hiddenMesage();
      requestFormLogin(data)
      .then((value) => {
        if (typeof value === "string") showMesage(value);
        else navigate("/selection", { state: value });
      });
    }
  };

  const showMesage = (value: string) => {
    setMesage(value);
    setShowElement(true);
  };

  const hiddenMesage = () => setShowElement(false);

  return (
    <>
      <div className="Login">
        <header>
          <div className="bar-header"></div>
        </header>
        <section>
          <Container className="container-login" maxWidth="xs">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handLogin();
              }}
            >
              <div className="container-form-login-header">
                {showElement ? (
                  <div id="alert-error">
                    <Alert variant="filled" severity="error">
                      <span>{mesage}</span>
                    </Alert>
                  </div>
                ) : null}
              </div>
              <div className="container-form-login-body">
                <div>
                  <TextField
                    fullWidth
                    label="cpf:"
                    id="cpf"
                    size="small"
                    variant="filled"
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
                    variant="filled"
                    type={"password"}
                    inputRef={refPassword}
                  />
                </div>
              </div>
              <div className="container-form-login-botton center">
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
        </section>
        <footer>
          <div className="bar-footer"></div>
        </footer>
      </div>
    </>
  );
};
