import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { ERROR_CLEAR } from "../store/actionTypes/authType";

import axios from "axios";

import { userLogin, userRegister } from "../store/actions/authAction";
import GenerateImage from "./GenerateImage";

const URL = "https://galactchat.onrender.com";
// const URL = "http://localhost:3000";

const Auth = ({ isRegister }) => {
  const navigate = useNavigate();
  const alert = useAlert();
  const dispatch = useDispatch();

  const initImg =
    "http://res.cloudinary.com/dizjm7yrb/image/upload/v1679930612/profile_img/u2hphaff7nxk1uyf09us.png";

  const initialState = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    genImage: "",
    image: initImg,
  };

  const { authenticate, error, userInfo } = useSelector((state) => state.auth);
  const [userAuthState, setUserAuthState] = useState(initialState);
  const [userImage, setUserImage] = useState(initImg);
  const [genImagePrompt, setGenImagePrompt] = useState("");
  const [genLoading, setGenLoading] = useState(false);
  const [genImage, setGenImage] = useState("");

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
      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);

      reader.onload = () => {
        setUserImage(reader.result);
        setUserAuthState({
          ...userAuthState,
          genImage: "",
          [e.target.name]: reader.result,
        });
      };
    }
  };

  // Image generation with DALL-E OpenAI
  const genRef = useRef(null);
  const goToGenerate = () => {
    genRef.current.focus();
  };

  const getImageFromOpenAi = async (e) => {
    e.preventDefault();
    if (genImagePrompt.length > 10) {
      try {
        setGenLoading(true);
        const config = {
          headers: {
            "Content-Type": "application/json",
          },
        };

        const data = { genImagePrompt: genImagePrompt };
        const response = await axios.post(
          `${URL}/api/chat/gen-image`,
          data,
          config
        );
        const genImg = response.data.genImg;

        setUserAuthState({
          ...userAuthState,
          genImage: genImg,
          image: "",
        });
        setGenImage(genImg);
        setUserImage(genImg);
      } catch (error) {
        console.log(error.response.data.error.errorMessage);
      } finally {
        setGenLoading(false);
      }
    } else {
      console.log("Please enter a prompt with more than 10 characters.");
    }
  };

  // Submit the form for signIn/register
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isRegister) {
      dispatch(userLogin(userAuthState));
    } else {
      const { username, email, password, confirmPassword, genImage, image } =
        userAuthState;

      const img = image || genImage;

      const formData = new FormData();
      formData.append("username", username);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("confirmPassword", confirmPassword);
      formData.append("image", img);
      dispatch(userRegister(formData));
    }
  };

  return (
    <div className={isRegister ? "register" : "register login"}>
      <div className="card">
        <div className="card-header">
          <h3>{isRegister ? "Create your account" : "Login"}</h3>
        </div>

        <div className="card-body">
          <form onSubmit={handleSubmit}>
            {isRegister && (
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
            )}

            <div className="form-group">
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
                  placeholder="Confirm"
                  id="confirmPassword"
                />
              </div>
            )}
            {isRegister && (
              <div className="form-group">
                <div className="file-image">
                  <div className="image">
                    {userImage ? <img src={userImage} alt="avatar" /> : ""}
                  </div>
                  <div className="select-image">
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
                    <div className="or">OR</div>
                    <div className="file">
                      <label htmlFor="gen-btn">Generate</label>
                      <button
                        type="button"
                        className="form-control"
                        id="gen-btn"
                        onClick={goToGenerate}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="form-group">
              <input
                type="submit"
                value={isRegister ? "Register" : "login"}
                className="btn"
              />
            </div>
            <div className="form-group">
              <span>
                {isRegister ? (
                  <Link to="/galactchat/login">
                    <small>Already have an account? Login in here.</small>
                  </Link>
                ) : (
                  <Link to="/galactchat/register">
                    <small>Don't have an account? Register here!</small>
                  </Link>
                )}
              </span>
            </div>
          </form>
        </div>
      </div>
      {isRegister && (
        <GenerateImage
          genImagePrompt={genImagePrompt}
          setGenImagePrompt={setGenImagePrompt}
          genRef={genRef}
          genImage={genImage}
          getImageFromOpenAi={getImageFromOpenAi}
          genLoading={genLoading}
        />
      )}
    </div>
  );
};

export default Auth;
