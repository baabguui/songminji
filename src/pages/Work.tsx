import { useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import _debounce from "lodash/debounce";
import imageData from "../data/imageData.json";
import React from "react";

import Header from "../components/Header";
import WorkCard from "../components/WorkCard";
import "../styles/works.css";

const Work = () => {
  const { id } = useParams();

  const numberID = Number(id);
  const navigate = useNavigate();

  const imageList = imageData.three;
  const imageListLength = imageList.length;

  const handleOnWheel = useCallback(
    _debounce((e: React.WheelEvent) => {
      const nextIndex =
        e.deltaY > 0
          ? numberID + 1 > imageListLength - 1
            ? 0
            : numberID + 1
          : numberID - 1 < 0
            ? imageListLength - 1
            : numberID - 1;

      navigate(`/works/${nextIndex}`);
    }, 50),
    [],
  );

  const handleClickImage = (imageID: number) => {
    navigate(`/works/${imageID}`);
  };

  return (
    <>
      <Header isHome={false} />
      <div className="worksContainer">
        <div className="listContainer">
          {imageList.map((image) => (
            <picture
              key={image.id}
              className={
                image.id - 1 === numberID ? "currentListItem" : "listItem"
              }
              onClick={() => handleClickImage(image.id)}
            >
              <source
                srcSet={`/assets/2023/${image.id}_preview.webp`}
                type="image/webp"
              />
              <img
                className={
                  image.id - 1 === numberID ? "currentListItem" : "listItem"
                }
                src={`/assets/2023/${image.id}_preview.png`}
                alt="preview"
              />
            </picture>
          ))}
        </div>
        <WorkCard
          currentWork={imageList[numberID - 1]}
          handleOnWheel={handleOnWheel}
        />
        <span
          className="next-button"
          style={{
            marginLeft: "5vw",
            height: "20px",
            marginTop: "45vh",
          }}
          onClick={() => {
            navigate(
              `/works/${numberID + 1 > imageListLength - 1 ? 0 : numberID + 1}`,
            );
          }}
        ></span>
      </div>
    </>
  );
};

export default Work;
