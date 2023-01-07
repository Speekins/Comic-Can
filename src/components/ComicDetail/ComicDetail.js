import React from "react";
import { useParams } from "react-router";
import './ComicDetail.css'
import verifiedImage from '../assets/verified.png'

const ComicDetail = ({ findCards }) => {
  const { id } = useParams();

  const card = findCards(id);
  // const checkVerification = () => {
  //   var isTrueSet = (card.verified.toLowerCase() === 'true')
  //   if (isTrueSet) {
  //     return <img src={verifiedImage} alt={}
  //   }
  }
  return (
    <div className="cardDetails">
      <img src={card.image_path} alt={`Cover of ${card.title}`} />
      <div className="cardInfo">
        <p>Title: {card.title}</p>
        <p>Year: {card.year}</p>
        <p>Issue: {card.issue}</p>
        <p>Grade: {card.grade}</p>
        {/* <p>Verified: {}</p> */}
        <p>Notes: {card.note}</p>
      </div>
    </div>
  );
};

export default ComicDetail;
