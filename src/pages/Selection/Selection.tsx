import { useLocation } from "react-router-dom";
import { NavBarSelection } from "../../components/NavBarSelection/NavBarSelection";

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
