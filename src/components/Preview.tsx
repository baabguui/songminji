import {
  PreviewContainer,
  YearContainer,
  ItemContainer,
  Item,
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
              {year.toString()}
              <ItemContainer>
                {exhibitions.map((item) => {
                  return (
                    <Item
                      key={item.id}
                      onClick={() => {
                        onItemClicked(item.id);
                      }}
                    >
                      <p style={{ margin: "0" }}>{item.title}</p>
                      <p style={{ margin: "0" }}>{item.place}</p>
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
