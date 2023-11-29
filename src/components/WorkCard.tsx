import "../styles/works.css";
const Work = (props: {
    currentWork: {
        id: number;
        title: string;
        media: string;
        size: string;
        width: number;
        height: number;
    };
    handleOnWheel: any;
}) => {
    return (
        <div className="workContainer" onWheel={props.handleOnWheel}>
            <img
                className="work"
                src={
                    process.env.PUBLIC_URL +
                    "/images/2023/" +
                    props.currentWork.id +
                    ".png"
                }
                alt="work"
            />
            <p>
                {props.currentWork.title}, {props.currentWork.media},{" "}
                {props.currentWork.size}
            </p>
        </div>
    );
};

export default Work;
