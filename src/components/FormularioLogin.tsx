import { Alert, Button, Container, TextField } from "@mui/material";
import { useState } from "react";
import { useIMask } from "react-imask";
import { Customer } from "./../models/Customer";
import { AccountService } from "../services/AccountService";
import { AccountValidation } from "../utils/AccountValidation";
import { Account } from "../models/Account";

const MascaraSenha = () => {
  const [optsSenha, setOptsSenha] = useState({
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
  } = useIMask(optsSenha);

  return ref;
};

const MascaraCpf = () => {
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

export const FormularioLogin = () => {
  const refCpf = MascaraCpf();
  const refSenha = MascaraSenha();
  let customer: Customer = {
    cpf: refCpf.current?.value,
    password: refSenha.current?.value,
  };
  let account: Account = {};

  const login = (e: any) => {
    e.preventDefault();
    //949.612.154-30
    //481228

    const accountValidation = AccountValidation();
    const accountService = AccountService();
    const login = accountValidation.login(customer.cpf, customer.password);
    if (login !== "") {
      console.log(login);
    } else {
      accountService.login(customer.cpf, customer.password).then((value) => {
        if (typeof value === "string") {
          console.log(value);
        } else if (typeof value === "object") {
          account = { ...value };
          console.log(account);
        }
        
      });
    }
  };

  return (
    <>
      <Container className="container_login" maxWidth="xs">
        <div className="center titulo">
          <h1>Login</h1>
        </div>

        <form onSubmit={login}>
          <div>
            <TextField
              fullWidth
              label="cpf"
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
              label="senha"
              id="senha"
              size="small"
              variant="standard"
              type={"text"}
              inputRef={refSenha}
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
