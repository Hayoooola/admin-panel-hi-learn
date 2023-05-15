import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { ThemeProvider } from "@emotion/react";
import { TextField } from "@mui/material";
import { CiSquarePlus } from "react-icons/ci";

import { useUpdateUserMutation } from "../../API/users";
import darkTheme from "../../feature/darkTheme";
import IStore from "../../interface/store";

interface IBody {
  name: string;
  username: string;
  email: string;
  phone: string,
  password?: string;
}


const MyProfile = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const adminData = useSelector((store: IStore) => store.adminData).adminData;

  const [updateUser, { data, error }] = useUpdateUserMutation();

  // update input data
  useMemo(() => {
    if (adminData) {
      setName(adminData.name);
      setUsername(adminData.username);
      setEmail(adminData.email);
      setPhone(adminData.phone);
    }
  }, [adminData]);

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // preparing data to send to server
    const body: IBody = {
      name,
      username,
      email,
      phone
    };
    if (password.trim() !== "") { body.password = password; }
    const _id = adminData?._id;

    updateUser({ body, _id });
  };

  useEffect(() => {
    data && toast.success("اطلاعات شما با موفقیت ویرایش شدند");
    error && toast.error("متاسفانه مشکلی در ارتباط با پایگاه داده بوجود آمده!");
    console.log(data, error);
  }, [data, error]);


  return (
    <div className="m-4 md:mx-20 lg:mx-32 xl:mx-44 mt-10">
      <h2 className='text-xl mb-6'>ویرایش اطلاعات کاربری</h2>
      <form onSubmit={submitHandler}>
        <ThemeProvider theme={darkTheme}>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-4'>
            <TextField
              required
              label="نام و نام خانوادگی"
              value={name}
              className='w-full font-primary'
              dir='ltr'
              onChange={e => setName(e.target.value)}
            />
            <TextField
              required
              label="نام کاربری"
              disabled
              value={username}
              className='w-full font-primary'
              dir='ltr'
              onChange={e => setUsername(e.target.value)}
            />
          </div>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-4'>
            <TextField
              required
              label="ایمیل"
              value={email}
              className='w-full font-primary'
              dir='ltr'
              onChange={e => setEmail(e.target.value)}
            />
            <TextField
              required
              label="شماره تماس"
              value={phone}
              className='w-full font-primary'
              dir='ltr'
              onChange={e => setPhone(e.target.value)}
            />
          </div>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-4'>
            <TextField
              required
              label="پسورد جدید"
              value={password}
              className='w-full font-primary'
              dir='ltr'
              onChange={e => setPassword(e.target.value)}
            />
          </div>
        </ThemeProvider>
        <button className='btn-primary' >
          <CiSquarePlus size="1.6rem" />
          <span>ویرایش اطلاعات</span>
        </button>
      </form>
    </div>
  );
};

export default MyProfile;
