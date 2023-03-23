import { BrowserRouter, Route, Routes } from "react-router-dom";
import { FindAccount } from "../pages/FindAccount/FindAccount";
import { Login } from "../pages/Login/Login";
import { NoPage } from "../pages/NoPage/NoPage";
import { Selection } from "../pages/Selection/Selection";

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Login />} />
        <Route path="selection" element={<Selection />} />
        <Route path="find-account" element={<FindAccount />} />
        <Route path="*" element={<NoPage />} />
      </Routes>
    </BrowserRouter>
  );
};
