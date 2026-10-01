import {
  Container,
  CVContainer,
  CVLanguageContainer,
  CVYearContainer,
  CVContentContainer,
  CVCategoryParagraph,
  CVContentParagraph,
} from "styles/CVStyles";

import { Fragment, useEffect, useState } from "react";
import { supabase } from "lib/supabaseClient";

interface CvEntryRow {
  language: "korean" | "english";
  category: "education" | "soloExhibition" | "groupExhibition";
  year: number;
  content: string;
  sort_order: number;
}

type CvLanguageData = {
  educations: Record<string, string[]>[];
  soloExhibitions: Record<string, string[]>[];
  groupExhibitions: Record<string, string[]>[];
}[];

const CATEGORY_KEY_MAP = {
  education: "educations",
  soloExhibition: "soloExhibitions",
  groupExhibition: "groupExhibitions",
} as const;

function buildLanguageData(rows: CvEntryRow[], language: "korean" | "english"): CvLanguageData {
  const byCategory: Record<string, Record<string, string[]>> = {
    educations: {},
    soloExhibitions: {},
    groupExhibitions: {},
  };

  rows
    .filter((row) => row.language === language)
    .sort((a, b) => a.sort_order - b.sort_order)
    .forEach((row) => {
      const key = CATEGORY_KEY_MAP[row.category];
      if (!byCategory[key][row.year]) byCategory[key][row.year] = [];
      byCategory[key][row.year].push(row.content);
    });

  return [
    {
      educations: [byCategory.educations],
      soloExhibitions: [byCategory.soloExhibitions],
      groupExhibitions: [byCategory.groupExhibitions],
    },
  ];
}

const CV = () => {
  const [cv, setCv] = useState<CvLanguageData[]>([]);

  useEffect(() => {
    const fetchCv = async () => {
      const { data, error } = await supabase.from("cv_entries").select("*");
      if (error) {
        console.error(error);
        return;
      }
      const rows = (data ?? []) as CvEntryRow[];
      setCv([buildLanguageData(rows, "korean"), buildLanguageData(rows, "english")]);
    };
    fetchCv();
  }, []);

  const renderCategory = (language: string, category: string) => {
    const descriptions: Record<string, Record<string, string>> = {
      korean: {
        educations: "학력",
        soloExhibitions: "개인전",
        groupExhibitions: "단체전",
      },
      english: {
        educations: "Education",
        soloExhibitions: "Solo Exhibition",
        groupExhibitions: "Group Exhibition",
      },
    };

    const matchedDescription = descriptions[language]?.[category];
    if (matchedDescription) {
      return <CVCategoryParagraph>{matchedDescription}</CVCategoryParagraph>;
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
                  <Fragment key={category}>
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
                  </Fragment>
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
