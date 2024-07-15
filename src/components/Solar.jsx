import React from "react";

const Solar = () => {
  const stars = Array.from({ length: 300 }, (_, i) => (
    <div key={i} className="star"></div>
  ));

  return (
    <div className="solar">
      <div className="star-container">{stars}</div>
      <div className="container">
        <div className="sun"></div>
        <div className="mercurys-orbit">
          <div className="mercury"></div>
        </div>
        <div className="venus-orbit">
          <div className="venus"></div>
        </div>
        <div className="earths-orbit">
          <div className="earth"></div>
        </div>
        <div className="mars-orbit">
          <div className="mars"></div>
        </div>
        <div className="jupiters-orbit">
          <div className="jupiter"></div>
        </div>
        <div className="saturns-orbit">
          <div className="saturn"></div>
        </div>
        <div className="uranus-orbit">
          <div className="uranus"></div>
        </div>
        <div className="neptunes-orbit">
          <div className="neptune"></div>
        </div>
        <div className="plutos-orbit">
          <div className="pluto"></div>
        </div>
      </div>
    </div>
  );
};

export default Solar;