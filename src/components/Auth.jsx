import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { ERROR_CLEAR } from "../store/actionTypes/authType";

import axios from "axios";

import { userLogin, userRegister } from "../store/actions/authAction";
import GenerateImage from "./GenerateImage";

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
    genImage: "",
  };

  const { authenticate, error, userInfo } = useSelector((state) => state.auth);
  const [userAuthState, setUserAuthState] = useState(initialState);
  const [loadImage, setLoadImage] = useState("/images/7377W2.png");

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
        genImage: "",
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

    if (!isRegister) {
      dispatch(userLogin(userAuthState));
    } else {
      const { username, email, password, confirmPassword, image, genImage } =
        userAuthState;

      const formData = new FormData();
      formData.append("username", username);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("confirmPassword", confirmPassword);
      formData.append("image", image);
      formData.append("genImage", genImage);

      dispatch(userRegister(formData));
    }
  };

  // Image generation with DALL-E OpenAI
  const genRef = useRef(null);
  const goToGenerate = () => {
    genRef.current.focus();
  };

  const [genImagePrompt, setGenImagePrompt] = useState("");
  const [imageUrl, setImageUrl] = useState("/images/7377W2.png");
  const [genLoading, setGenLoading] = useState(false);

  const getImageFromOpenAi = async () => {
    if (genImagePrompt.length > 10) {
      try {
        setGenLoading(true);
        const config = {
          headers: {
            "Content-Type": "application/json",
          },
        };

        const data = { genImagePrompt: genImagePrompt };
        const response = await axios.post("/api/chat/gen-image", data, config);

        const genImageUrl = response.data.genImageUrl;
        setImageUrl(genImageUrl);
        setLoadImage(genImageUrl);
        setUserAuthState({
          ...userAuthState,
          genImage: genImageUrl,
        });
      } catch (error) {
        console.log(error.response.data.error.errorMessage);
      } finally {
        setGenLoading(false);
      }
    } else {
      console.log("Please enter a prompt with more than 10 charcters.");
    }
  };

  const generateImage = (e) => {
    e.preventDefault();
    getImageFromOpenAi();
  };

  return (
    <div className={isRegister ? "register" : "register login"}>
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
                  placeholder="Username"
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
                  <div
                    className="file"
                    style={{ marginLeft: "6px", color: "white" }}
                  >
                    OR
                  </div>
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
          imageUrl={imageUrl}
          generateImage={generateImage}
          genLoading={genLoading}
        />
      )}
    </div>
  );
};

export default Auth;
