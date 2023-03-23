import { useLocation } from "react-router-dom";
import { NavBarSelection } from "../../components/NavBarSelection/NavBarSelection";
import { Account } from "../../models/Account";

export const Selection = () => {
  const location = useLocation();

  return (
    <>
      <div className="Selection">
        <NavBarSelection account={location.state} />
      </div>
    </>
  );
};
