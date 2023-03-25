import { useLocation } from "react-router-dom";
import { FormFindAccount } from "../../components/FormFindAccount/FormFindAccount";

export const FindAccount = () => {
  const location = useLocation();
  console.log(location.state);

  return (
    <>
      <div className="find-account">
        <header></header>
        <section>
          <FormFindAccount />
        </section>
        <footer></footer>
      </div>
    </>
  );
};
