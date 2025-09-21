import { Outlet } from "react-router-dom";
import { Footer } from "./Footer/Footer";
import { Header } from "./Header/Header";
import { useDispatch } from "react-redux";
import { fetchCurrentUser } from "../features/user/userSlice";
import { useEffect } from "react";

export const AppLayout = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCurrentUser());
  }, [dispatch]);
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};
