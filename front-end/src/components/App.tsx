import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";

import Dashboard from "../routes/Dashboard";
import LoginPage from "../routes/Login";
import Header from "../layout/header";
import SideBar from "../layout/sideBar";
import Courses from "../routes/Courses";
import Menus from "../routes/Menus";
import Users from "../routes/Users";
import Categories from "../routes/Categories";
import Notifications from "../routes/Notifications";
import Sessions from "../routes/Sessions";
import Articles from "../routes/Articles";
import Comments from "../routes/Comments";
import Coupons from "../routes/Coupons";
import Loading from "./loading";
import MyProfile from "../routes/profile";
import Page404 from "../routes/404/404";
import { adminData, getToken } from "../feature/authData";
import { useGetUserInfoQuery } from "../API/auth";
import IStore from "../interface/store";


const App = () => {
  const dispatch = useDispatch();
  const [isUserAuthorized, setIsUserAuthorized] = useState(false);
  const [loading, setLoading] = useState(true);
  const [skipFetchingData, setSkipFetchingData] = useState(true);

  const token = useSelector((store: IStore) => store.adminData).token;
  const { data, error } = useGetUserInfoQuery(token, { skip: skipFetchingData });


  // check for user token
  useEffect(() => {
    dispatch(getToken());
  }, []);


  // check validity of token
  useEffect(() => {
    if (!token) {
      setIsUserAuthorized(false);
      setLoading(false);
    } else {
      // check token to confirm admin
      setSkipFetchingData(false);
    }
  }, [token]);


  // get admin data from server
  useEffect(() => {
    if (data) {
      setLoading(false);
      if (data.role === "ADMIN") {
        setIsUserAuthorized(true);
        dispatch(adminData(data));
        toast.success("با موفقیت وارد شدید!");
      } else {
        toast.warning("تنها مدیران وبسایت به محتوای این پنل دسترسی دارند!");
      }
    } else if (error && "status" in error) {
      setLoading(false);
      if (error.status === "FETCH_ERROR") {
        toast.warning("ارتباط با پایگاه داده برقرار نشد!");
      } else if ("error" in error) {
        toast.error(error.error);
      }
    }
  }, [data, error]);



  const itemsToShow = () => {
    if (loading) {
      return <Loading />;
    } else if (isUserAuthorized) {
      return (
        <div className="flex w-[100vw] h-[100vh] overflow-hidden">
          <ToastContainer theme="dark" draggable={false} rtl pauseOnHover closeOnClick autoClose={5000} />
          <BrowserRouter>
            <Header />
            <SideBar />
            <div className="w-[100vw] mx-auto mt-[10rem] overflow-auto">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/courses" element={<Courses />} />
                <Route path="/menus" element={<Menus />} />
                <Route path="/users" element={<Users />} />
                <Route path="/categories" element={<Categories />} />
                <Route path="/notifications" element={<Notifications />} />
                <Route path="/sessions" element={<Sessions />} />
                <Route path="/articles" element={<Articles />} />
                <Route path="/comments" element={<Comments />} />
                <Route path="/coupons" element={<Coupons />} />
                <Route path="/profile" element={<MyProfile />} />
                <Route path="*" element={<Page404 />} />
              </Routes>
            </div>
          </BrowserRouter>
        </div>
      );
    } else {
      return (
        <div className="flex">
          <ToastContainer theme="dark" draggable={false} rtl pauseOnHover closeOnClick autoClose={5000} />
          <BrowserRouter>
            <div className="w-[100vw] h-[100vh] flex items-center ">
              <Routes>
                <Route path="*" element={<LoginPage />} />
              </Routes>
            </div>
          </BrowserRouter>
        </div>
      );
    }
  };

  return itemsToShow();
};

export default App;
