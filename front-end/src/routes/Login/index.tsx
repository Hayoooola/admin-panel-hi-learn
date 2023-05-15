import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { CircularProgress, TextField } from "@mui/material";
import { FiLogIn } from "react-icons/fi";
import { GiCheckMark } from "react-icons/gi";

import "./index.css";
import { useLoginMutation } from "../../API/auth";
import { setToken } from "../../feature/authData";

const LoginPage = () => {
    const [login, { data, isError, error }] = useLoginMutation();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        login({ username, password });
    };

    useEffect(() => {
        if (data) {
            dispatch(setToken(data.accessToken));
            setLoading(true);
            navigate("/");
        }
        if (error && "status" in error) {
            error.status === 401 ?
                toast.error('نام کاربری یا رمز عبور اشتباه است!') :
                toast.warning("مشکلی در ارتباط با پایگاه داده رخ داده!");
        }
    }, [data, isError]);

    return (
        <div className="auth-container overflow-hidden items-center">
            <div className="auth__wrapper py-10">
                <p className="auth__title">
                    ورود به حساب کاربری
                </p>
                <p className="auth__subtitle">
                    {`خوشحالیم دوباره میبینیمت دوست عزیز :)`}                            </p>
                <div className="auth-input__container my-2 mb-5">
                    <form className="auth-form mt-4" onSubmit={submitHandler}>
                        <div className="mb-2">
                            <TextField
                                required
                                id="email"
                                label="ایمیل یا شماره تماس"
                                size="small"
                                className="w-full"
                                dir="ltr"
                                autoComplete="true"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                        <div className="mb-4">
                            <TextField
                                required
                                id="password"
                                type="password"
                                label="رمز عبور"
                                size="small"
                                dir="ltr"
                                className="w-full"
                                autoComplete="true"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div className="auth-submit-btn__wrapper">
                            <div className="remember-me-wrapper mt-2">
                                <div className="remember-me">
                                    <input type="checkbox" id="remember-me" className="mx-1" />
                                    <label htmlFor="remember-me">مرا به خاطر داشته باش</label>
                                </div>
                            </div>
                            <button className="auth-submit-btn w-full relative mb-8" >
                                {loading ?
                                    <CircularProgress size="1.6rem" className="color-white" color="inherit" /> :
                                    <div>ورود</div>
                                }
                                <FiLogIn className="auth-submit-btn-__icon text-white" />
                            </button>
                        </div>

                    </form>
                    <div className="auth-redirect-section d-flex justify-content-center">
                        <span>حساب کاربری ندارید؟</span>
                        <Link to="/register"><span className="auth-redirect-btn">ثبت نام</span></Link>
                    </div>
                </div>
                <div className="auth-warning__wrapper">
                    <p className="auth-warning__title"> کاربر محترم:</p>
                    <div className="auth-warning">
                        <GiCheckMark size=".9rem" className="auth-warning__icon" />
                        <span className="auth-warning__text">
                            لطفا از مرورگر های مطمئن و بروز مانند گوگل کروم و فایرفاکس استفاده کنید.
                        </span>
                    </div>
                    <div className="auth-warning">
                        <GiCheckMark size=".9rem" className="auth-warning__icon" />
                        <span className="auth-warning__text">
                            ما هرگز اطلاعات محرمانه شما را از طریق ایمیل درخواست نمیکنیم.
                        </span>
                    </div>
                    <div className="auth-warning">
                        <GiCheckMark size=".9rem" className="auth-warning__icon" />
                        <span className="auth-warning__text">
                            لطفا کلمه عبور خود را در فواصل زمانی کوتاه تغییر دهید.
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
