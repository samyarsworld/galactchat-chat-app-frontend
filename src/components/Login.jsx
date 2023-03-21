import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import {
  ERROR_CLEAR,
  SUCCESS_MESSAGE_CLEAR,
} from "../store/actionTypes/authType";

import { userLogin } from "../store/actions/authAction";

const Login = () => {
  const navigate = useNavigate();
  const alert = useAlert();
  const dispatch = useDispatch();

  const { authenticate, error, userInfo } = useSelector((state) => state.auth);

  const [state, setState] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (authenticate) {
      navigate("/");
    }
    if (error) {
      error.map((err) => alert.error(err));
      dispatch({ type: ERROR_CLEAR });
    }
  }, [error, authenticate]);

  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(userLogin(state));
    if (authenticate) {
      navigate("/");
    }
  };

  return (
    <div className="register">
      <div className="card">
        <div className="card-header">
          <h3>Login</h3>
        </div>

        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                className="form-control"
                onChange={handleChange}
                value={state.email}
                placeholder="Email"
                name="email"
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                className="form-control"
                onChange={handleChange}
                value={state.password}
                placeholder="Password"
                name="password"
              />
            </div>
            <div className="form-group">
              <input type="submit" value="login" className="btn" />
            </div>
            <div className="form-group">
              <span>
                <Link to="/galactchat/register"> Don't have an account? </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
