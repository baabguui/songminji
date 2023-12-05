import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import _debounce from "lodash/debounce";
import imageData from "../routes/imageData.json";

import Header from "../components/Header";
import WorkCard from "../components/WorkCard";
import "../styles/works.css";

const Work = () => {
    const { id } = useParams();
    const imageList = [...imageData.three];
    const [imageIndex, setImageIndex] = useState<number>(0);

    useEffect(() => {
        const currentWork = imageList.find((work) => {
            return work.id === Number(id);
        });
        setImageIndex(() => {
            return currentWork ? currentWork.id - 1 : 0;
        });
    }, []);

    const handleOnWheel = useCallback(
        _debounce((e: WheelEvent) => {
            if (e.deltaY > 0) {
                setImageIndex((prev) => {
                    if (!imageList[prev + 1]) {
                        return 0;
                    }
                    return prev + 1;
                });
            } else {
                setImageIndex((prev) => {
                    if (!imageList[prev - 1]) {
                        return imageList.length - 1;
                    }
                    return prev - 1;
                });
            }
        }, 50),
        []
    );
    return (
        <>
            <Header isHome={false} />
            <div className="worksContainer">
                <div className="listContainer">
                    {imageList.map((image) => {
                        return (
                            <img
                                className={
                                    image.id - 1 === imageIndex
                                        ? "currentListItem"
                                        : "listItem"
                                }
                                src={`/assets/2023/${image.id}_preview.png`}
                                alt="preview"
                                onClick={() => {
                                    setImageIndex(image.id - 1);
                                }}
                                key={image.id}
                            />
                        );
                    })}
                </div>
                <WorkCard
                    currentWork={imageList[imageIndex]}
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
                        setImageIndex((prev) => {
                            if (!imageList[prev + 1]) {
                                return 0;
                            }
                            return prev + 1;
                        });
                    }}
                ></span>
            </div>
        </>
    );
};

export default Work;
