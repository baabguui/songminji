import { Link } from "react-router-dom";
const ExhibitionCard = (props: {
    exhibition: {
        title: string;
        id: number;
        place: string;
        works: {
            id: number;
        }[];
    };
}) => {
    return (
        <Link
            to={`/exhibitions/${props.exhibition.id}`}
            style={{ textDecorationLine: "none", color: "black" }}
        >
            <div className="exhibitionListItem">
                <img
                    className="poster"
                    src={
                        "/assets/2023/exhibitions/" +
                        props.exhibition.title +
                        "/1" +
                        ".jpg"
                    }
                    alt="poster"
                />
                {props.exhibition.title} <br />
                {props.exhibition.place}
            </div>
        </Link>
    );
};

export default ExhibitionCard;
