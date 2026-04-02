import React from 'react';
import { useState } from 'react';
import { useAuthStore } from '../store/useAuthStore.js';
import { Eye, EyeOff, Loader2, Lock, Mail, MessageSquare, User } from "lucide-react";
import { Link } from 'react-router-dom';
import AuthImagePattern from '../components/AuthImagePattern.jsx';
import toast from 'react-hot-toast';

//this is the syntax of how to change the useState method
// value={formData.fullName}
// onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
//create a login function where view password is checked and the details are initialised which acts as the memory of the page.
const LoginPage = () => {
  //react makes us a memory box where showPassword tells us whether the password is visible and setShowpassword tells us 
  //how to change it.
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { isLoggingIn, login } = useAuthStore();

  const validateForm = () => {
    //if fullname and email(after trimming the spaces) are null, we pop the error.
    if (!formData.email.trim()) return toast.error("Email is required");
    //this is used to check the format of the email
    if (!/\S+@\S+\.\S+/.test(formData.email)) return toast.error("Invalid email format");
    //to check if password exists and its length is 6 characters+.
    if (!formData.password) return toast.error("Password is required");
    if (formData.password.length < 6) return toast.error("Password must be at least 6 characters");

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("FORM:", formData);
    //if the form is validated using the above fn then we can upload the info into the SignUp memory.
    login(formData);
  };
  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Left side */}
      <div className="flex justify-center items-center w-full">
        <div className="w-full max-w-md px-6 flex flex-col gap-6">

          {/* Icon + Heading */}
          <div className="flex flex-col items-center text-center gap-2">
            <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <MessageSquare className="size-6 text-primary" />
            </div>

            <h1 className="text-2xl font-semibold">
              Login to your account
            </h1>
            <h2 className="text-sm text-muted-foreground">
              Enter your information
            </h2>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <label className="label font-medium">Email</label>
              <input
                type="email"
                className="input input-bordered w-full pb-4"
                placeholder="you@example.com"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="label font-medium">Password</label>
              <div className="flex items-center gap-2">
                <input
                  type={showPassword ? "text" : "password"}
                  className="input input-bordered w-full pl-14"
                  placeholder="••••••"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <Eye /> : <EyeOff />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary w-full"
              disabled={isLoggingIn}
            >
              {isLoggingIn ? (
                <Loader2 className="size-5 animate-spin" />
              ) : (
                "Login"
              )}
            </button>
          </form>
          <div className="text-center">
            <p className="text-base-content/60">
              Don&apos;t have an account?{" "}
              <Link to="/signup" className="link link-primary">
                Create account
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Right side */}
      <AuthImagePattern
        title="Join our Community"
        subtitle="Connect with friends, share moments, and stay in touch with your loved ones."
      />
    </div>

  )
}
export default LoginPage;