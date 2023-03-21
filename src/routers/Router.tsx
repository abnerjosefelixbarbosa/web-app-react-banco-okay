import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Login } from "../pages/Login/Login";
import { Selection } from "../pages/Selection/Selection";

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/selection" element={<Selection/>} />
      </Routes>
    </BrowserRouter>
  );
};
