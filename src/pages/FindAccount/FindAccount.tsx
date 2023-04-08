import { Button, Container, TextField } from "@mui/material";
import { useState } from "react";
import { useIMask } from "react-imask";
import { Account } from "./../../models/Account";
import "./FindAccount.css";

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

export const FindAccount = () => {
  const agencyRef = AgencyMask();
  const accountRef = AccountMask();
  const [account, setAccount] = useState<Account>({
    agency: agencyRef.current?.value,
    account: accountRef.current?.value,
  });

  //1568-1
  //13681-1
  const handFindAccount = () => {
    console.log(account);
  };

  return (
    <>
      <div className="Transfer">
        <header>
          <div className="bar-header"></div>
        </header>
        <section>
          <Container className="container-login" maxWidth="xs">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handFindAccount();
              }}
            >
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
              <div>
                <Button
                  type="submit"
                  variant="contained"
                  className="button-find"
                  fullWidth
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
