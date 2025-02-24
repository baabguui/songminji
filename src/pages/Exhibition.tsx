import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  ExhibitionContainer,
  ExhibitionParagraph,
  ExhibitionContentImage,
  ExhibitionContentCaption,
} from "styles/ExhibitionStyles";

const Exhibition = () => {
  const { id } = useParams<{ id: string }>();
  const [exhibition, setExhibition] = useState<Exhibition>();

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
      <ExhibitionContainer>
        <ExhibitionParagraph>{exhibition.title}</ExhibitionParagraph>
        <ExhibitionParagraph>{exhibition.place}</ExhibitionParagraph>
        <ExhibitionParagraph style={{ marginBottom: "2vw" }}>
          {exhibition.period}
        </ExhibitionParagraph>
        {exhibition.datas.map((content) => {
          switch (content.category) {
            case "foreground":
              return (
                <ExhibitionContentImage
                  src={`/assets/exhibitions/${exhibition.id}/${content.id}.jpg`}
                  category={"foreground"}
                ></ExhibitionContentImage>
              );
            case "work":
              return (
                <>
                  <ExhibitionContentImage
                    src={`/assets/works/${content.id}/0.jpg`}
                    category={"work"}
                  ></ExhibitionContentImage>
                  <ExhibitionContentCaption>
                    {content.title}
                  </ExhibitionContentCaption>
                </>
              );
          }
        })}
      </ExhibitionContainer>
    );
  }
};

export default Exhibition;
