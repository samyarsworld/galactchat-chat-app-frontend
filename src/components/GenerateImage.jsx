import React from "react";
import PacmanLoader from "react-spinners/PacmanLoader";

const GenerateImage = ({
  genRef,
  genImagePrompt,
  setGenImagePrompt,
  genImage,
  getImageFromOpenAi,
  genLoading,
}) => {
  const initImg =
    "https://res.cloudinary.com/dizjm7yrb/image/upload/v1679970425/profile_img/q54lfqacbozd9l2pykld.png";

  return (
    <div className="card generate">
      <div className="card-header">
        <h3>Generate Profile Image</h3>
      </div>
      <div className="card-body">
        <form>
          <div className="form-group ">
            <input
              ref={genRef}
              type="text"
              className="form-control genInput"
              placeholder="Enter..."
              name="name"
              value={genImagePrompt}
              onChange={(e) => {
                setGenImagePrompt(e.target.value);
              }}
            />
          </div>
        </form>

        <div>
          {genLoading ? (
            <div className="generate-img">
              <PacmanLoader
                className="generate-img-loader"
                color={"#d636d0"}
                size={30}
              />
            </div>
          ) : (
            <img className="generate-img" src={genImage ? genImage : initImg} />
          )}
        </div>
        <div className="form-group" style={{ marginTop: "0" }}>
          <input
            type="submit"
            className="btn"
            value="CREATE"
            onClick={getImageFromOpenAi}
          />
        </div>
      </div>
    </div>
  );
};

export default GenerateImage;
