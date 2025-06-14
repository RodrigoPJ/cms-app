import { useState } from "react";
import AuthService from "../services/auth-service/AuthService";
import { useAppDispatch } from "../utils/store/hooks";
import { useNavigate } from "react-router";

export default function SignUpForm() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    age: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const authService = new AuthService();
    // here is where we should verify the form
    dispatch(
      authService.signup({ ...formData, age: parseInt(formData.age) })
    ).then((e) => {
      if(e) navigate("/dashboard");
      else alert('login failed');
    });
  };

  return (
    <div
      style={{
        backgroundImage: `url(https://img.daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.webp)`,
      }}
      className="flex items-center justify-center min-h-screen bg-base-200 px-4"
    >
      <div className="w-full max-w-md p-8 space-y-4 bg-base-100 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center">Create an Account</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="form-control">
            <label className="label" htmlFor="fname">
              <span className="label-text">First Name</span>
            </label>
            <input
              type="text"
              id="fname"
              name="firstName"
              className="input input-bordered"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-control">
            <label className="label" htmlFor="lname">
              <span className="label-text">Last Name</span>
            </label>
            <input
              type="text"
              id="lname"
              name="lastName"
              className="input input-bordered"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-control">
            <label className="label" htmlFor="age">
              <span className="label-text">Age</span>
            </label>
            <input
              type="text"
              id="age"
              name="age"
              className="input input-bordered"
              value={formData.age}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-control">
            <label className="label" htmlFor="email">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="input input-bordered"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-control">
            <label className="label" htmlFor="password">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="input input-bordered"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-control">
            <label className="label" htmlFor="confirmPassword">
              <span className="label-text">Confirm Password</span>
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              className="input input-bordered"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-full mt-4">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}
