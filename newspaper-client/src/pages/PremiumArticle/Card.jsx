import Tilt from "react-parallax-tilt";

const Card = ({ article }) => {
  const { title, image, publisher, description } = article;

  return (
    <Tilt
      scale={1.02}
      transitionSpeed={2500}
      gyroscope={true}
      glareEnable={true}
      glareMaxOpacity={0.75}
      glareColor="#ffffff"
      glarePosition="all"
      perspective={1000}
    >
      <div className="article-card">
        <img src={image} alt={title} className="article-image" />
        <div className="article-content">
          <h3>{title}</h3>
          <p>{description}</p>
          <p>Publisher: {publisher}</p>
          <button onClick={() => alert("Details Button Clicked")}>
            Details
          </button>
        </div>
      </div>
    </Tilt>
  );
};

export default Card;
