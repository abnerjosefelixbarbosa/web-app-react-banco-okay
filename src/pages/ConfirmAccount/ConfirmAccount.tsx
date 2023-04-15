import { Alert, Button, Container, TextField } from "@mui/material";
import "./ConfirmAccount.css";
import { useState } from "react";
import { useIMask } from "react-imask";
import { useLocation, useNavigate } from "react-router-dom";
import { Account } from "./../../models/Account";

const PasswordMask = () => {
  const [optsPassword, setOptsPassword] = useState({
    mask: String("0000"),
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

const checkAccount = (account: Account) => {
  if (account.password === "" || account.password?.length !== 4)
    return "conta invalida";

  return "conta valida";
};

export const ConfirmAccount = () => {
  const [mesage, setMesage] = useState<string>("");
  const [showElement, setShowElement] = useState<boolean>(false);
  const location = useLocation();
  const navigate = useNavigate();
  const refPassword = PasswordMask();
  const [account1, setAccount1] = useState<Account>({
    ...location.state.account1,
  });
  const [account2, setAccount2] = useState<Account>({
    ...location.state.account2,
  });
  const [accountData, setAccountData] = useState<Account>({
    ...location.state.data,
  });

  const handConfirm = () => {
    const data: Account = {
      password: refPassword.current?.value,
    };

    const accountChecked = checkAccount(data);
    if (accountChecked !== "conta valida") showMesage(accountChecked);
  };

  const handBack = () =>
    navigate("/transfer", {
      state: {
        account1: account1,
        account2: account2,
        data: accountData,
      },
      replace: true,
    });

  const showMesage = (value: string) => {
    setMesage(value);
    setShowElement(true);
  };

  return (
    <>
      <div className="confirm-account">
        <header>
          <div className="bar-header"></div>
        </header>

        <section>
          <Container className="container-confirm" maxWidth="xs">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handConfirm();
              }}
            >
              <div className="container-header-form-confirm">
                {showElement ? (
                  <div id="alert-error">
                    <Alert variant="filled" severity="error">
                      <span>{mesage}</span>
                    </Alert>
                  </div>
                ) : null}
              </div>
              <br />
              <div className="container-body-form-confirm">
                <div>
                  <TextField
                    fullWidth
                    label="senha:"
                    id="senha"
                    size="small"
                    variant="filled"
                    type={"text"}
                    inputRef={refPassword}
                  />
                </div>
              </div>
              <br />
              <div className="container-footer-form-confirm">
                <div className="center">
                  <Button
                    type="submit"
                    variant="contained"
                    className="button-confirm"
                  >
                    Confirmar
                  </Button>
                </div>
                <br />
                <div className="center">
                  <Button
                    type="button"
                    variant="contained"
                    className="button-back"
                    onClick={() => handBack()}
                  >
                    Voltar
                  </Button>
                </div>
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
