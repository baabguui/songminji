import {
  CVContainer,
  CVCategoryContainer,
  CVContentContainer,
  CVContentParagraph,
} from "styles/CVStyles";

const CV = () => {
  return (
    <CVContainer>
      <CVContentParagraph
        style={{ fontSize: "clamp(10px, 1.2vw, 22px)", paddingBottom: "1vw" }}
      >
        송민지 Minji Song
      </CVContentParagraph>
      {cv.map((category, index) => {
        return (
          <CVCategoryContainer key={index}>
            {category.map((content) => {
              return (
                <CVContentContainer key={content.year}>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      width: "28vw",
                      gap: "1vw",
                    }}
                  >
                    <CVContentParagraph>{content.year}</CVContentParagraph>
                    <div>
                      {content.kr.map((p) => {
                        return (
                          <CVContentParagraph key={p}>{p}</CVContentParagraph>
                        );
                      })}
                    </div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      width: "28vw",
                      gap: "1vw",
                    }}
                  >
                    <CVContentParagraph>{content.year}</CVContentParagraph>
                    <div>
                      {content.en.map((p) => {
                        return (
                          <CVContentParagraph key={p}>{p}</CVContentParagraph>
                        );
                      })}
                    </div>
                  </div>
                </CVContentContainer>
              );
            })}
          </CVCategoryContainer>
        );
      })}
    </CVContainer>
  );
};

export default CV;

const educations = [
  {
    year: 2022,
    en: [
      "BFA Fine Arts, Seoul National University of Science & Technology, Seoul",
    ],
    kr: ["서울과학기술대학교 조형예술과 학사 졸업"],
  },
];

const exhibitions = [
  {
    year: 2025,
    en: ["Vacancy, Apgujeong-ro 75-gil, Seoul"],
    kr: ["공실, 서울시 강남구 압구정로 75길 38-17 2층"],
  },
  {
    year: 2024,
    en: [
      "Painting in Winter, Alternative Space Loop",
      "Park, sangheeut",
      "Undo Effects, Hite Collection",
      "WELL, INTERIM",
    ],
    kr: [
      "겨울 회화, 대안 공간 루프",
      "파크, 상히읗",
      "언두 이펙트, 하이트 컬렉션",
      "웰, 인터럼",
    ],
  },
  {
    year: 2023,
    en: ["4 Needles, every Art", "QUEST, gallery IN"],
    kr: ["포 니들스, 에브리아트", "퀘스트, 갤러리 인"],
  },
  {
    year: 2022,
    en: ["Peer to Peer, onsu gonggan"],
    kr: ["피어 투 피어, 온수 공간"],
  },
  {
    year: 2020,
    en: ["Fatten up for Tomorrow, WESS"],
    kr: ["미리 찌는 살, 웨스"],
  },
];

export const cv = [educations, exhibitions];
