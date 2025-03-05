import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  ExhibitionContainer,
  ExhibitionParagraph,
  ExhibitionContentImage,
  ExhibitionContentCaption,
  ScrollTop,
} from "styles/ExhibitionStyles";
import Modal from "components/Modal";

const Exhibition = () => {
  const { id } = useParams<{ id: string }>();
  const [exhibition, setExhibition] = useState<Exhibition>();
  const [showScrollTopButton, setShowScrollTopButton] = useState(false);
  const [openImage, setOpenImage] = useState<ModalData | null>(null);

  const scrollTop = () => {
    window.scroll({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const handleShowScrollTopButton = () => {
      const scrollThreshold = window.innerWidth < 768 ? 300 : 500; // 🔹 모바일(768px 이하)에서는 300px, 데스크톱에서는 500px

      if (window.scrollY > scrollThreshold) {
        setShowScrollTopButton(true);
      } else {
        setShowScrollTopButton(false);
      }
    };

    window.addEventListener("scroll", handleShowScrollTopButton);
    return () => {
      window.removeEventListener("scroll", handleShowScrollTopButton);
    };
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const module = await import("datas/exhibitionsData.json");
        const data = module.default;
        Object.values(data).forEach((exhibition: Exhibition[]) => {
          const match = exhibition.find(
            (exhibition: Exhibition) => exhibition.id === id,
          );
          if (match) setExhibition(match);
        });
      } catch (error) {
        console.error;
      }
    };
    fetchData();
  }, [id]);
  if (exhibition) {
    return (
      <Modal
        isOpen={openImage !== null}
        onClose={() => {
          setOpenImage(null);
        }}
        data={openImage}
      >
        <ExhibitionContainer>
          <ExhibitionParagraph>{exhibition.title}</ExhibitionParagraph>
          <ExhibitionParagraph>{exhibition.place}</ExhibitionParagraph>
          <ExhibitionParagraph>{exhibition.period}</ExhibitionParagraph>
          {exhibition.file && (
            <a
              href={`/assets/exhibitions/${exhibition.id}/${exhibition.file}.pdf`}
              download={`${exhibition.file}.pdf`}
              style={{
                marginTop: "1vw",
                textDecoration: "none",
              }}
            >
              <ExhibitionParagraph style={{ color: "cadetblue" }}>
                {exhibition.file}
              </ExhibitionParagraph>
            </a>
          )}
          <div style={{ marginBottom: "2vw" }} />
          {exhibition.datas.map((content, index) => {
            switch (content.category) {
              case "foreground":
                return (
                  <ExhibitionContentImage
                    key={index}
                    src={`/assets/exhibitions/${exhibition.id}/${content.id}.jpg`}
                    category={"foreground"}
                    onClick={() =>
                      setOpenImage({
                        title: "",
                        url: `/assets/exhibitions/${exhibition.id}/${content.id}.jpg`,
                      })
                    }
                  ></ExhibitionContentImage>
                );
              case "work":
                return (
                  <ExhibitionContentImage
                    key={index}
                    src={`/assets/works/${content.id}/0.jpg`}
                    category={"work"}
                    onClick={() =>
                      setOpenImage({
                        title: `${content.title}`,
                        url: `/assets/works/${content.id}/0.jpg`,
                      })
                    }
                  ></ExhibitionContentImage>
                );
            }
          })}
          {showScrollTopButton && (
            <ScrollTop onClick={scrollTop}>Top</ScrollTop>
          )}
        </ExhibitionContainer>
      </Modal>
    );
  }
};

export default Exhibition;
