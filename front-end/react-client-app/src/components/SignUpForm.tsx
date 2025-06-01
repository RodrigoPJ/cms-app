import { useCallback, useState } from "react";
import AuthService from "../services/auth-service/AuthService";
import { useAppDispatch } from "../utils/store/hooks";

export default function SignUpForm() {
  const dispatch = useAppDispatch()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

 /// const postForm = useCallback(new AuthService().signup, [])
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Handle signup logic (e.g., send to API)
    console.log(formData);
    const authService =  new AuthService()

    dispatch(authService.signup({...formData, age:67, firstName:'huhuhu', lastName: 'gvjgv'}))

  //  const helper  = authService.signup({...formData, age:67, firstName:'huhuhu', lastName: 'gvjgv'})
  //  helper(dispatch).then(e=> console.log(e))
  };

  return (
    <div  style={{backgroundImage: `url(https://img.daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.webp)`}} className="flex items-center justify-center min-h-screen bg-base-200 px-4">
      <div className="w-full max-w-md p-8 space-y-4 bg-base-100 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center">Create an Account</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="form-control">
            <label className="label" htmlFor="name">
              <span className="label-text">Full Name</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="input input-bordered"
              value={formData.name}
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
