import { useLocation } from "react-router-dom";
import { NavBarSelection } from "../../components/NavBarSelection/NavBarSelection";

export const Selection = () => {
  const location = useLocation();

  return (
    <>
      <div className="Selection">
        <header>
          <NavBarSelection account={location.state} />
        </header>
        <section></section>
        <footer></footer>
      </div>
    </>
  );
};
