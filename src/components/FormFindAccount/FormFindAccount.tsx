import { Button, Container, TextField } from "@mui/material";
import { useState } from "react";
import { useIMask } from "react-imask";
import "./FormFindAccount.css";

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

export const FormFindAccount = () => {
  const agencyRef = AgencyMask();
  const accountRef = AccountMask();
  const agency: any = agencyRef.current?.value;
  const account: any = accountRef.current?.value;

  //1568-1
  //13681-1
  const accountValidationFind = () => {
    console.log({ agency, account });
  };

  return (
    <>
      <Container className="container-login" maxWidth="xs">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            accountValidationFind();
          }}
        >
          <div>
            <TextField
              fullWidth
              label="agência:"
              id="agência"
              size="small"
              variant="standard"
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
              variant="standard"
              type={"text"}
              inputRef={accountRef}
            />
          </div>
          <br />
          <div>
            <Button
              type="submit"
              variant="contained"
              className="button-find"
              fullWidth
            >
              Buscar
            </Button>
          </div>
        </form>
      </Container>
    </>
  );
};
