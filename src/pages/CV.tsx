import {
  Container,
  CVContainer,
  CVLanguageContainer,
  CVYearContainer,
  CVContentContainer,
  CVContentParagraph,
} from "styles/CVStyles";

const CV = () => {
  const renderCategory = (language: string, category: string) => {
    const descriptions: Record<string, Record<string, string>> = {
      korean: {
        soloExhibitions: "개인전",
        groupExhibitions: "단체전",
      },
      english: {
        soloExhibitions: "Solo Exhibitions",
        groupExhibitions: "Group Exhibitions",
      },
    };
    console.log(language);

    const matchedDescription = descriptions[language]?.[category];
    if (matchedDescription) {
      return <CVContentParagraph>{matchedDescription}</CVContentParagraph>;
    }
  };
  return (
    <Container>
      <CVContentParagraph style={{ paddingBottom: "1.8vw" }}>
        송민지 Minji Song
      </CVContentParagraph>
      <CVContainer>
        {cv.map((lan, index) => {
          const lanName = index === 0 ? "korean" : "english";
          return (
            <CVLanguageContainer key={index}>
              {Object.entries(lan[0]).map(([category, categoryContents]) => {
                return (
                  <>
                    {renderCategory(lanName, category)}
                    {categoryContents.map((year, index) => {
                      return (
                        <CVContentContainer key={index}>
                          {Object.entries(year)
                            .sort(
                              ([yearA], [yearB]) =>
                                Number(yearB) - Number(yearA),
                            )
                            .map((content, index) => {
                              return (
                                <CVYearContainer
                                  key={index}
                                  category={category}
                                >
                                  <CVContentParagraph>
                                    {content[0]}
                                  </CVContentParagraph>
                                  <CVContentContainer>
                                    {content[1].map((item, index) => {
                                      return (
                                        <CVContentParagraph key={index}>
                                          {item}
                                        </CVContentParagraph>
                                      );
                                    })}
                                  </CVContentContainer>
                                </CVYearContainer>
                              );
                            })}
                        </CVContentContainer>
                      );
                    })}
                  </>
                );
              })}
            </CVLanguageContainer>
          );
        })}
      </CVContainer>
    </Container>
  );
};

export default CV;

const korean = [
  {
    educations: [{ 2022: ["서울과학기술대학교 조형예술과 학사 졸업"] }],
    soloExhibitions: [
      {
        2024: ["파크, 상히읗", "웰, 인터럼"],
      },
    ],
    groupExhibitions: [
      {
        2025: ["공실, 서울시 강남구 압구정로 75길 38-17 2층"],
        2024: ["겨울 회화, 대안 공간 루프", "언두 이펙트, 하이트 컬렉션"],
        2023: ["포 니들스, 에브리아트", "퀘스트, 갤러리 인"],
        2022: ["피어 투 피어, 온수 공간"],
        2020: ["미리 찌는 살, 웨스"],
      },
    ],
  },
];

const english = [
  {
    educations: [
      {
        2022: [
          "BFA Fine Arts, Seoul National University of Science & Technology, Seoul",
        ],
      },
    ],
    soloExhibitions: [
      {
        2024: ["Park, sangheeut", "WELL, INTERIM"],
      },
    ],
    groupExhibitions: [
      {
        2025: ["Vacancy, Apgujeong-ro 75-gil, Seoul"],
        2024: [
          "Painting in Winter, Alternative Space Loop",
          "Undo Effects, Hite Collection",
        ],
        2023: ["4 Needles, every Art", "QUEST, gallery IN"],
        2022: ["Peer to Peer, onsu gonggan"],
        2020: ["Fatten up for Tomorrow, WESS"],
      },
    ],
  },
];

export const cv = [korean, english];
