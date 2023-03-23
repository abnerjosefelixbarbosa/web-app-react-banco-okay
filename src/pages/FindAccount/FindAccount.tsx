import { useLocation } from "react-router-dom";

export const FindAccount = () => {
  const location = useLocation();  
  console.log(location.state);

  return (
    <>
      <div className="find-account"></div>
    </>
  );
};