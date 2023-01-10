import React, { useState, useEffect, useParams } from "react";
import { Link } from "react-router-dom";
import "./EditForm.css";
import { getComicData, putComicData, deleteComic } from "../../apiCalls";
import PropTypes from "prop-types";

const EditForm = ({ comicCard, setComicCard, show, setShowModal, comicData, setComicData }) => {
  const [title, setTitle] = useState(comicCard.title);
  const [year, setYear] = useState(comicCard.year);
  const [issue, setIssue] = useState(comicCard.issue);
  const [grade, setGrade] = useState(comicCard.grade);
  const [imageURL, setImageURL] = useState(comicCard.image_path ? comicCard.image_path : "");
  const [note, setNote] = useState(comicCard.note);

  useEffect(() => {
    setTitle(comicCard.title)
    setYear(comicCard.year)
    setIssue(comicCard.issue)
    setGrade(comicCard.grade)
    setImageURL(comicCard.image_path)
    setNote(comicCard.note)
  }, [comicCard.title, comicCard.year, comicCard.issue, comicCard.grade, comicCard.image_path, comicCard.note, comicData]);

  const getOneComicData = async() => {
    const data = await getComicData(`https://comic-can.herokuapp.com/api/v1/comicData/${comicCard.id}`)
    setComicCard(data[0])
  }

  const editComicData = async () => {
    const url = `https://comic-can.herokuapp.com/api/v1/comicData/${comicCard.id}`;
    const newComic = {
      id: comicCard.id,
      title: title,
      year: year,
      issue: issue,
      grade: grade,
      image_path: imageURL,
      verified: comicCard.verified,
      note: note,
    };
    await putComicData(url, newComic)
    await getOneComicData()
  };

  const deleteComicBook = async () => {
    await deleteComic(`https://comic-can.herokuapp.com/api/v1/comicData/${comicCard.id}`);
    const newData = await getComicData("https://comic-can.herokuapp.com/api/v1/comicData")
    setComicData(newData)
  }

  if (show) {
    return (
      <div className="background modal">
        <form className="form modalContent">
          <button
            className="close"
            onClick={() => {
              setShowModal(false);
            }}
          >
            X
          </button>
          <div className="option">
            <label>
              Title:
              <input
                type="text"
                name="title"
                value={title}
                onChange={(event) => {
                  setTitle(event.target.value);
                }}
              />
            </label>
          </div>
          <div className="option">
            <label>
              Year:
              <input
                type="text"
                name="year"
                value={year}
                onChange={(event) => {
                  setYear(event.target.value);
                }}
              />
            </label>
          </div>
          <div className="option">
            <label>
              Issue:
              <input
                type="text"
                name="issue"
                value={issue}
                onChange={(event) => {
                  setIssue(event.target.value);
                }}
              />
            </label>
          </div>
          <div className="option">
            <label>
              Grade:
              <input
                type="text"
                name="grade"
                value={grade}
                onChange={(event) => {
                  setGrade(event.target.value);
                }}
              />
            </label>
          </div>
          <div className="option">
            <label>
              Image URL:
              <input
                type="text"
                name="image"
                maxLength="250"
                value={imageURL}
                onChange={(event) => {
                  setImageURL(event.target.value);
                }}
              />
            </label>
          </div>
          <div className="option">
            <label>
              Notes:
              <input
                type="text"
                name="notes"
                value={note}
                onChange={(event) => {
                  setNote(event.target.value);
                }}
              />
            </label>
          </div>
          <Link
            className="delete"
            to="/comicCollection"
            onClick={() => {
              deleteComicBook()
            }}
          >
            🗑️
          </Link>
          <button
            className="updateButton"
            onClick={(event) => {
              event.preventDefault();
              editComicData();
              setShowModal(false);
            }}
          >
            Update
          </button>
        </form>
      </div>
    );
  } else {
    return null;
  }
};

export default EditForm;

EditForm.prototype = {
  setComicData: PropTypes.func.isRequired,
  comicData: PropTypes.arrayOf(PropTypes.object),
  comicCard: PropTypes.shape({
    id: PropTypes.number,
    image_path: PropTypes.string,
    title: PropTypes.string,
    year: PropTypes.string,
    issue: PropTypes.string,
  }).isRequired,
  show: PropTypes.bool.isRequired,
  setShowModal: PropTypes.func.isRequired,
  setComicCard: PropTypes.func.isRequired,
};
