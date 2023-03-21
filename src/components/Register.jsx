import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import {
  ERROR_CLEAR,
  SUCCESS_MESSAGE_CLEAR,
} from "../store/actionTypes/authType";

import { userRegister } from "../store/actions/authAction";

const initialState = {
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
  image: "",
};

const Register = () => {
  const navigate = useNavigate();
  const alert = useAlert();

  const { authenticate, error, userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [state, setState] = useState(initialState);
  const [loadImage, setLoadImage] = useState("");

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

  const handleFile = (e) => {
    if (e.target.files.length !== 0) {
      setState({ ...state, [e.target.name]: e.target.files[0] });
    }
    const reader = new FileReader();
    reader.onload = () => {
      setLoadImage(reader.result);
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { username, email, password, confirmPassword, image } = state;
    const formData = new FormData();
    formData.append("username", username);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("confirmPassword", confirmPassword);
    formData.append("image", image);

    dispatch(userRegister(formData));
  };

  return (
    <div className="register">
      <div className="card">
        <div className="card-header">
          <h3>Register</h3>
        </div>

        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="username">User Name</label>
              <input
                type="text"
                className="form-control"
                onChange={handleChange}
                value={state.username}
                name="username"
                placeholder="User Name"
                id="username"
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                className="form-control"
                onChange={handleChange}
                value={state.email}
                name="email"
                placeholder="Email"
                id="email"
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                className="form-control"
                onChange={handleChange}
                value={state.password}
                name="password"
                placeholder="Password"
                id="password"
              />
            </div>
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                className="form-control"
                onChange={handleChange}
                value={state.confirmPassword}
                name="confirmPassword"
                placeholder="Confirm Password"
                id="confirmPassword"
              />
            </div>
            <div className="form-group">
              <div className="file-image">
                <div className="image">
                  {loadImage ? <img src={loadImage} alt="avatar" /> : ""}
                </div>
                <div className="file">
                  <label htmlFor="image">Select Image</label>
                  <input
                    type="file"
                    className="form-control"
                    onChange={handleFile}
                    name="image"
                    id="image"
                  />
                </div>
              </div>
            </div>

            <div className="form-group">
              <input type="submit" value="register" className="btn" />
            </div>
            <div className="form-group">
              <span>
                <Link to="/galactchat/login"> Login Your Account </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
