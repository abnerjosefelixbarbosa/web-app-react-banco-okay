import { Alert, Button, Container, TextField } from "@mui/material";
import { useState } from "react";
import { Account } from "../../models/Account";
import { useLocation, useNavigate } from "react-router-dom";
import "./Transfer.css";

const checkTransfer = (account: Account) => {
  if (account.balance?.toString() === "0.00") return "saldo invalido";

  return "transferência verificada";
};

export const Transfer = () => {
  const [balance, setBalance] = useState<any>("");
  const [mesage, setMesage] = useState<string>("");
  const [showElement, setShowElement] = useState<boolean>(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [account1, setAccount1] = useState<Account>({
    ...location.state.account1,
  });
  const [account2, setAccount2] = useState<Account>({
    ...location.state.account2,
  });

  const handTransfer = () => {
    const balanceFixed: any = Number(balance).toFixed(2);
    const data: Account = {
      balance: balanceFixed,
    };

    const transferChecked = checkTransfer(data);
    if (transferChecked !== "transferência verificada")
      showMesage(transferChecked);
    else
      navigate("/confirm-account", {
        state: {
          account1: account1,
          account2: account2,
          data: data,
        },
      });
  };

  const showMesage = (value: string) => {
    setMesage(value);
    setShowElement(true);
  };

  const hiddenMesage = () => setShowElement(false);

  return (
    <>
      <div className="Transfer">
        <header>
          <div className="bar-header"></div>
        </header>
        <section>
          <Container className="container-find-account" maxWidth="xs">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handTransfer();
              }}
            >
              <div className="container-header-form-transfer">
                {showElement ? (
                  <div id="alert-error">
                    <Alert variant="filled" severity="error">
                      <span>{mesage}</span>
                    </Alert>
                  </div>
                ) : null}
              </div>
              <br />
              <div className="container-body-form-transfer">
                <div>
                  <TextField
                    fullWidth
                    label="saldo:"
                    id="saldo"
                    size="small"
                    variant="filled"
                    type={"number"}
                    value={balance}
                    onChange={(e) => setBalance(e.target.value)}
                  />
                </div>
              </div>
              <br />
              <div className="container-footer-form-transfer center">
                <Button
                  type="submit"
                  variant="contained"
                  className="button-transfer"
                >
                  Transferir
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
