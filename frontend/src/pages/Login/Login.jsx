const API_URL = import.meta.env.VITE_API_URL;
import React, { useState } from "react";
import PasswordInput from "../../components/Input/PasswordInput";
import { Link, useNavigate } from "react-router-dom";
import { validateEmail } from "../../utils/helper";
import { useDispatch } from "react-redux";
import {
  signInFailure,
  signInStart,
  signInSuccess,
} from "../../redux/user/userSlice";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    if (!password) {
      setError("Please enter the password");
      return;
    }

    setError("");

    try {
      dispatch(signInStart());

      const res = await axios.post(
        `${API_URL}/api/auth/signin`,
        { email, password },
        { withCredentials: true },
      );

      if (res.data.success === false) {
        toast.error(res.data.message);
        console.log(res.data);
        dispatch(signInFailure(res.data.message));
        return;
      }

      toast.success(res.data.message);
      dispatch(signInSuccess(res.data));
      navigate("/");
    } catch (error) {
      toast.error(error.message);
      dispatch(signInFailure(error.message));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-brand-50 via-white to-purple-50">
      {/* Decorative blobs */}
      <div className="fixed top-0 left-0 w-96 h-96 bg-brand-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 -translate-x-1/2 -translate-y-1/2" />
      <div className="fixed bottom-0 right-0 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 translate-x-1/2 translate-y-1/2" />

      <div className="w-full max-w-md relative">
        {/* Card */}
        <div className="glass-card rounded-3xl px-8 py-10 sm:px-10 sm:py-12">
          {/* Logo */}
          <div className="flex items-center justify-center gap-2 mb-8">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-500 to-brand-600 flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-sm">JN</span>
            </div>
            <h1 className="text-2xl font-bold tracking-tight">
              <span className="text-gray-400">Just</span>
              <span className="bg-gradient-to-r from-brand-600 to-brand-500 bg-clip-text text-transparent">
                Notes
              </span>
            </h1>
          </div>

          <h4 className="text-xl font-bold text-gray-800 text-center mb-1">
            Welcome back
          </h4>
          <p className="text-sm text-gray-400 text-center mb-8">
            Sign in to continue to your notes
          </p>

          <form onSubmit={handleLogin}>
            <label className="input-label mb-1.5 block">Email</label>
            <input
              type="text"
              placeholder="you@example.com"
              className="input-box"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <label className="input-label mb-1.5 block">Password</label>
            <PasswordInput
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {error && (
              <div className="flex items-center gap-2 text-red-500 text-xs bg-red-50 border border-red-100 rounded-lg px-3 py-2 mb-3">
                <span>⚠</span>
                <span>{error}</span>
              </div>
            )}

            <button type="submit" className="btn-primary mt-2">
              Sign In
            </button>

            <p className="text-sm text-gray-500 text-center mt-6">
              Don't have an account?{" "}
              <Link
                to={"/signup"}
                className="font-semibold text-brand-600 hover:text-brand-700 transition-colors"
              >
                Create one
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
