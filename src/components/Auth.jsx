import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import {
  ERROR_CLEAR,
  SUCCESS_MESSAGE_CLEAR,
} from "../store/actionTypes/authType";

import { userLogin, userRegister } from "../store/actions/authAction";

const Auth = ({ isRegister }) => {
  const navigate = useNavigate();
  const alert = useAlert();
  const dispatch = useDispatch();

  const initialState = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    image: "",
  };

  const { authenticate, error, userInfo } = useSelector((state) => state.auth);
  const [userAuthState, setUserAuthState] = useState(initialState);
  const [loadImage, setLoadImage] = useState("");

  // Check if user is authenticated
  useEffect(() => {
    if (authenticate) {
      navigate("/");
    }
    if (error) {
      error.map((err) => alert.error(err));
      dispatch({ type: ERROR_CLEAR });
    }
  }, [error, authenticate]);

  // Input handle for text fileds
  const handleChange = (e) => {
    setUserAuthState({ ...userAuthState, [e.target.name]: e.target.value });
  };

  // Input handle for file fileds
  const handleFileChange = (e) => {
    if (e.target.files.length !== 0) {
      setUserAuthState({
        ...userAuthState,
        [e.target.name]: e.target.files[0],
      });
    }
    const reader = new FileReader();
    reader.onload = () => {
      setLoadImage(reader.result);
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  // Submit the form for signIn/register
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(isRegister);
    if (!isRegister) {
      dispatch(userLogin(userAuthState));
    } else {
      const { username, email, password, confirmPassword, image } =
        userAuthState;
      const formData = new FormData();
      formData.append("username", username);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("confirmPassword", confirmPassword);
      formData.append("image", image);

      dispatch(userRegister(formData));
    }

    // if (authenticate) {
    //   navigate("/");
    // }
  };

  return (
    <div className="register">
      <div className="card">
        <div className="card-header">
          <h3>{isRegister ? "Register" : "Login"}</h3>
        </div>

        <div className="card-body">
          <form onSubmit={handleSubmit}>
            {isRegister && (
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  className="form-control"
                  onChange={handleChange}
                  value={userAuthState.username}
                  name="username"
                  placeholder="User Name"
                  id="username"
                />
              </div>
            )}

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                className="form-control"
                onChange={handleChange}
                value={userAuthState.email}
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
                value={userAuthState.password}
                placeholder="Password"
                name="password"
              />
            </div>

            {isRegister && (
              <div className="form-group">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                  type="password"
                  className="form-control"
                  onChange={handleChange}
                  value={userAuthState.confirmPassword}
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  id="confirmPassword"
                />
              </div>
            )}
            {isRegister && (
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
                      onChange={handleFileChange}
                      name="image"
                      id="image"
                    />
                  </div>
                </div>
              </div>
            )}

            <div className="form-group">
              <input
                type="submit"
                value={isRegister ? "Regsiter" : "login"}
                className="btn"
              />
            </div>
            <div className="form-group">
              <span>
                {isRegister ? (
                  <Link to="/galactchat/login"> Login to your account </Link>
                ) : (
                  <Link to="/galactchat/register">Don't have an account?</Link>
                )}
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Auth;
