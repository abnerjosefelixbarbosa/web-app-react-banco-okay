import "./NavBarSelection.css";
import { Account } from "../../models/Account";
import { useState } from 'react';

export const NavBarSelection = (props: any) => {
  const [account, setAccount] = useState<Account>({...props.account});
  const letters = account.customer?.name?.substring(0,2).toUpperCase();

  return (
    <>
      <ul>
        <li className="band">
          <a>{letters}</a>
        </li>
        <li className="dropdown">
          <a className="dropbtn" href="">
            Operações
          </a>
          <div className="dropdown-content">
            <a href="">Teste</a>
          </div>
        </li>
      </ul>
    </>
  );
};
