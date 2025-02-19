import { useCallback, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import _debounce from "lodash/debounce";
import imageData from "../data/imageData.json";
import React from "react";

import Header from "../components/Header";
import WorkCard from "../components/WorkCard";
import "../styles/works.css";

const Work = () => {
  const params = useParams();

  const numberID = Number(params.id);
  const year = Number(params.year);
  const [currentYear, setCurrentYear] = useState(year);
  const imageList = year == 2023 ? imageData[2023] : imageData[2024]; //수정 필요
  const navigate = useNavigate();

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

      navigate(`/works/${year}/${nextIndex}`);
    }, 50),
    [],
  );

  const handleClickImage = (imageID: number) => {
    navigate(`/works/${year}/${imageID}`);
  };

  const handleClickYear = (year: number) => {
    const id = 0;
    navigate(`/works/${year}/${id}`);
  };

  return (
    <>
      <Header isHome={false} />
      <div className="yearContainer">
        {/* 이거 데이터 map으로 처리하기 */}
        <div
          style={currentYear == 2024 ? { fontWeight: "bolder" } : {}}
          onClick={() => {
            handleClickYear(2024);
            setCurrentYear(2024);
          }}
        >
          2024
        </div>
        <div
          style={currentYear == 2023 ? { fontWeight: "bolder" } : {}}
          onClick={() => {
            handleClickYear(2023);
            setCurrentYear(2023);
          }}
        >
          2023
        </div>
      </div>
      <div className="worksContainer">
        <div className="listContainer">
          {imageList.map((image) => (
            <picture
              key={image.id}
              className={image.id === numberID ? "currentListItem" : "listItem"}
              onClick={() => handleClickImage(image.id)}
            >
              <source
                srcSet={`/assets/${year}/${image.id}_preview.webp`}
                type="image/webp"
              />
              <img
                className={
                  image.id === numberID ? "currentListItem" : "listItem"
                }
                src={`/assets/${year}/${image.id}_preview.png`}
                alt="preview"
              />
            </picture>
          ))}
        </div>
        <WorkCard
          currentWork={imageList[numberID]}
          handleOnWheel={handleOnWheel}
        />
        <span
          className="nextButton"
          onClick={() => {
            navigate(
              `/works/${year}/${
                numberID + 1 > imageListLength - 1 ? 0 : numberID + 1
              }`,
            );
          }}
        ></span>
        <span
          className="backButton"
          onClick={() => {
            navigate(
              `/works/${year}/${
                numberID - 1 < 0 ? imageListLength - 1 : numberID - 1
              }`,
            );
          }}
        ></span>
      </div>
    </>
  );
};

export default Work;
