import React from "react";
import { Link } from "react-router-dom";

const ComicCard = ({ card }) => {
  return (
    <Link to={`/comicCollection/${card.id}`}>
      <img
        src={card.image_path}
        alt={`cover image of ${card.title} ${card.year} ${card.issue}`}
      />
    </Link>
  );

  //Each card will be a link to co to it's card details
};

export default ComicCard;