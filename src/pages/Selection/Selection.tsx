import { useLocation } from "react-router-dom";
import "./Selection.css"
import { useState } from 'react';
import { Account } from './../../models/Account';

export const Selection = () => {
  const location = useLocation();
  const [account, setAccount] = useState<Account>({}); 
  setAccount(location.state);
  console.log(account);

  return (
    <div className="Selection">
        
    </div>
  );
};
