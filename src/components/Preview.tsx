import {
  PreviewContainer,
  YearContainer,
  ItemContainer,
  Item,
  ItemParagraph,
} from "styles/PreviewStyles";

const Preview = ({
  previewData,
  onItemClicked,
}: {
  previewData: ExhibitionsByYear;
  onItemClicked: (id: string) => void;
}) => {
  return (
    <PreviewContainer>
      {Object.entries(previewData)
        .sort(([a], [b]) => Number(b) - Number(a))
        .map(([year, exhibitions]) => {
          return (
            <YearContainer key={year.toString()}>
              <ItemParagraph>{year.toString()}</ItemParagraph>
              <ItemContainer>
                {exhibitions.map((item) => {
                  return (
                    <Item
                      key={item.id}
                      onClick={() => {
                        onItemClicked(item.id);
                      }}
                    >
                      <ItemParagraph>{item.title}</ItemParagraph>
                      <ItemParagraph>{item.place}</ItemParagraph>
                    </Item>
                  );
                })}
              </ItemContainer>
            </YearContainer>
          );
        })}
    </PreviewContainer>
  );
};

export default Preview;
