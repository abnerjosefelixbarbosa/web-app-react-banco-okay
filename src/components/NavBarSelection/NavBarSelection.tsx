import { Account } from "../../models/Account";
import { Link } from "react-router-dom";
import "./NavBarSelection.css";

export const NavBarSelection = (props: any) => {
  const account: Account = { ...props.account };
  const name = account.customer?.name?.substring(0, 2).toUpperCase();

  return (
    <>
      <ul>
        <li className="band">
          <a>{name}</a>
        </li>
        <li className="dropdown">
          <a className="dropbtn" href="">
            Operações
          </a>
          <div className="dropdown-content">
            <Link to="/find-account" state={account}>Transfer</Link>
          </div>
        </li>
      </ul>
    </>
  );
};
