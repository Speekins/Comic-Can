import React from "react";
import { useParams } from "react-router";
import './ComicDetail.css'

const ComicDetail = ({ findCards }) => {
  const { id } = useParams();

  const card = findCards(id);

  return (
    <div className="cardDetails">
      <img src={card.image_path} alt={`Cover of ${card.title}`} />
      <div className="cardInfo">
        <p>Title: {card.title}</p>
        <p>Year: {card.year}</p>
        <p>Issue: {card.issue}</p>
        <p>Grade: {card.grade}</p>
        <p>Verified: {card.verified}</p>
        <p>Notes: {card.note}</p>
      </div>
    </div>
  );
};

export default ComicDetail;
