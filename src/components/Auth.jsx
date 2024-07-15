import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import ClipLoader from "react-spinners/ClipLoader";
import { userLogin, userRegister } from "../store/actions/authAction";
import { ERROR_CLEAR } from "../store/actionTypes/authType";

import Solar from "./Solar"

// const URL = "https://galactchat.onrender.com";
const URL = "http://localhost:5000";

const Auth = () => {
  const dispatch = useDispatch();

  const initImg =
    "https://res.cloudinary.com/dizjm7yrb/image/upload/v1700612538/profile_img/zvmvsug7cbuty3qguz2o.png";

  const initialState = {
    username: "",
    password: "",
    confirmPassword: "",
    image: initImg,
  };
  const { authenticate, error, userInfo } = useSelector((state) => state.auth);
  const [isRegister, setIsRegister] = useState(true);
  const [userAuthState, setUserAuthState] = useState(initialState);
  const [userImage, setUserImage] = useState(initImg);
  const [submitLoading, setSubmitLoading] = useState(false);

 
  // Check if user is authenticated
  useEffect(() => {
    setSubmitLoading(false);
    if (error) {
      dispatch({ type: ERROR_CLEAR });
    }
  }, [error, authenticate]);


   // Input handle for text fields
  const handleChange = (e) => {
    setUserAuthState({ ...userAuthState, [e.target.name]: e.target.value });
  };

  // Input handle for file fields
  const handleFileChange = (e) => {
    if (e.target.files.length !== 0) {
      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);

      reader.onload = () => {
        setUserImage(reader.result);
        setUserAuthState({
          ...userAuthState,
          [e.target.name]: reader.result,
        });
      };
    }
  };

  // Submit the form for signIn/register
  const handleSubmit = async (e) => {
    e.preventDefault();

    setSubmitLoading(true);
    if (!isRegister) {
      dispatch(userLogin(userAuthState));
    } else {
        const { username, email, password, confirmPassword, image } = userAuthState;
        const formData = new FormData();
        formData.append("username", username);
        formData.append("password", password);
        formData.append("confirmPassword", confirmPassword);
        formData.append("image", image);
        dispatch(userRegister(formData));
    }
  };

  return (
    <div className="register">
      <Solar />
      <div className="card" style={{ position: "relative" }}>
        
        {submitLoading && (
          <div className="card-loading">
            <ClipLoader
              color="#fff"
              size={100}
            />
          </div>
        )}

        <h3 className="card-header">{isRegister ? "Create your account" : "Login"}</h3>

        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                onChange={handleChange}
                value={userAuthState.username}
                name="username"
                placeholder="Username"
                id="username"
              />
            </div>

            <div className="form-group">
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
                  <img src={userImage} alt="avatar"/>
                  <div className="select-image">
                    <label htmlFor="image" style={{fontSize: 13}}>Select Image</label>
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
                value={isRegister ? "register" : "login"}
                name="sign"
                className="btn"
              />
            </div>
            <div className="form-group">
              <span onClick={() => setIsRegister((prevState) => !prevState)}>
                {isRegister ? (
                  <small>Already have an account? Login in here.</small>
                ) : (
                  <small>Don't have an account? Register here!</small>
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
