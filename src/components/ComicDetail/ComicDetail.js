import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router";
import "./ComicDetail.css";
import EditForm from "../EditForm/EditForm";
import verifiedImage from "../assets/verified.png";
import PropTypes from "prop-types";
import { getComicData } from "../../apiCalls";


const ComicDetail = ({comicData, setComicData}) => {
  const [comicCard, setComicCard] = useState([])
  const { id } = useParams();

  useEffect(() => {
    const getOneComicData = async() => {
      const data = await getComicData(`https://comic-can.herokuapp.com/api/v1/comicData/${id}`)
      setComicCard(data[0])
      console.log(comicCard)
    }
   getOneComicData()
  }, [])
  
  const [showModal, setShowModal] = useState(false);

  const checkVerification = () => {
    if (comicCard.verified === "true" || comicCard.verified === "TRUE") {
      return (
        <img
          src={verifiedImage}
          alt={"verified icon"}
          className="verifiedImage"
        />
      );
    }
  };

  return (
    <div className="comicDetails">
      <Link to="/comicCollection" className="back">
        <button>Back</button>
      </Link>
      <button
        className="edit"
        onClick={() => {
          setShowModal(true);
        }}
      >
        Edit
      </button>
      <div className="cardDetails">
        <img
          src={comicCard.image_path}
          alt={`Cover of ${comicCard.title}`}
          className="comicImage"
        />
        <div className="cardInfo">
          <div className="cardTitle">
            {checkVerification()}
            <h2>{comicCard.title} </h2>
          </div>
          <p>Year: {comicCard.year}</p>
          <p>Issue: {comicCard.issue}</p>
          <p>Grade: {comicCard.grade}</p>
          <p>Notes: {comicCard.note}</p>
        </div>
        <EditForm
          setComicCard={setComicCard}
          show={showModal}
          comicCard={comicCard}
          setShowModal={setShowModal}
          setComicData={setComicData}
          comicData={comicData}
        />
      </div>
    </div>
  );
};


export default ComicDetail;

ComicDetail.prototype = {
  setComicData: PropTypes.func.isRequired,
  comicData: PropTypes.arrayOf(PropTypes.object).isRequired,
};
