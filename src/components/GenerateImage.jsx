import React from "react";
import GenLoader from "./GenLoader";

const GenerateImage = ({
  genRef,
  genImagePrompt,
  setGenImagePrompt,
  genImage,
  getImageFromOpenAi,
  genLoading,
}) => {
  const initImg =
    "http://res.cloudinary.com/dizjm7yrb/image/upload/v1679930612/profile_img/u2hphaff7nxk1uyf09us.png";
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
              <GenLoader />
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
