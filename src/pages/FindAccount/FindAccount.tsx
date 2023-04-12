import { Alert, Button, Container, TextField } from "@mui/material";
import { useState } from "react";
import { useIMask } from "react-imask";
import { Account } from "./../../models/Account";
import "./FindAccount.css";
import axios from "axios";
import { BASE_URL } from "./../../utils/request";
import { useLocation, useNavigate } from "react-router-dom";

const AgencyMask = () => {
  const [optsAgency, setOptsAgency] = useState({
    mask: String("0000-0"),
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
  } = useIMask(optsAgency);

  return ref;
};

const AccountMask = () => {
  const [optsAccount, setOptsAccount] = useState({
    mask: String("00000-0"),
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
  } = useIMask(optsAccount);

  return ref;
};

const checkFindAccount = (account: Account) => {
  if (account.agency === "") return "agencia invalida";
  if (account.account === "") return "conta invalida";

  return "conta verificada";
};

const findAccountRequest = async (account: Account) => {
  return await axios
    .post(`${BASE_URL}/accounts/find-account-by-agency-and-account`, account)
    .then((response) => {
      account = { ...response.data };
      return account;
    })
    .catch((e) => {
      const mesage: string = e.response.data;
      return mesage;
    });
};

export const FindAccount = () => {
  const agencyRef = AgencyMask();
  const accountRef = AccountMask();
  const [mesage, setMesage] = useState<string>("");
  const [showElement, setShowElement] = useState<boolean>(false);
  const location = useLocation();
  const [account, setAccount] = useState<Account>({ ...location.state });
  const navigate = useNavigate();

  //1568-1
  //13681-1
  //2210-1
  //21224-1
  const handFindAccount = () => {
    const data: Account = {
      agency: agencyRef.current?.value,
      account: accountRef.current?.value,
    };

    const accountChecked = checkFindAccount(data);
    if (accountChecked !== "conta verificada") showMesage(accountChecked);
    else {
      hiddenMesage();
      findAccountRequest(data).then((value) => {
        if (typeof value === "string") showMesage(value);
        else if (value.id === account.id) showMesage("conta logada");
        else navigate("/transfer", { state: {
          account1: account,
          account2: value
        } });
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
      <div className="Transfer">
        <header>
          <div className="bar-header"></div>
        </header>
        <section>
          <Container className="container-find-account" maxWidth="xs">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handFindAccount();
              }}
            >
              <div className="container-header-form-find-account">
                {showElement ? (
                  <div id="alert-error">
                    <Alert variant="filled" severity="error">
                      <span>{mesage}</span>
                    </Alert>
                  </div>
                ) : null}
              </div>
              <br />
              <div className="container-body-form-find-account">
                <div>
                  <TextField
                    fullWidth
                    label="agência:"
                    id="agência"
                    size="small"
                    variant="filled"
                    type={"text"}
                    inputRef={agencyRef}
                  />
                </div>
                <div>
                  <TextField
                    fullWidth
                    label="conta:"
                    id="conta"
                    size="small"
                    variant="filled"
                    type={"text"}
                    inputRef={accountRef}
                  />
                </div>
              </div>
              <br />
              <div className="container-footer-form-find-account center">
                <Button
                  type="submit"
                  variant="contained"
                  className="button-find"
                >
                  Encontrar
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
