import { Alert, Button, Container, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useIMask } from "react-imask";
import { useNavigate } from "react-router-dom";
import { AccountService } from "../../services/AccountService";
import { AccountValidation } from "../../utils/AccountValidation";
import "./FormLogin.css";

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

  const accountValidationLogin = () => {
    const resultValidationLogin = AccountValidation().login(cpf, password);
    if (resultValidationLogin !== "") {
      showMensage(resultValidationLogin);
    } else {
      accountServiceLogin();
    }
  };

  const accountServiceLogin = async () => {
    await AccountService()
      .login(cpf, password)
      .then((value) => {
        if (typeof value === "string") {
          showMensage(value);
        } else {
          navigate("/selection", { state: value });
        }
      });
  };

  const showMensage = (value: string) => {
    const mensage: any = document.getElementById("mensage");
    mensage.innerHTML = value;
    document.getElementById("alert-error")?.classList.remove("hidden");
    setTimeout(() => {
      hiddenMensage();
    }, 2000);
  };

  const hiddenMensage = () => {
    document.getElementById("alert-error")?.classList.add("hidden");
  };

  return (
    <>
      <Container className="container-login" maxWidth="xs">
        <div id="alert-error" className="hidden">
          <Alert variant="filled" severity="error">
            <span id="mensage"></span>
          </Alert>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            //949.612.154-30
            //481228
            accountValidationLogin();
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
