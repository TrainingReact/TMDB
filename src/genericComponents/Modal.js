import ReactDOM from "react-dom";
import React from "react";
import ConvertVoteAverageInStars from "../genericComponents/ConvertVoteAverageInStars";

/**
 * Modal component is the popup that contains movie details
 * @param {object} props.data - the object contains single movie data
 * @returns
 */
export default function Modal(props) {
  const { vote_average: voteAverage, genres: genres, overview: description } = props.data;
  const close = props.hide;
  const backdropPath =
    props.data.backdrop_path !== null
      ? "https://image.tmdb.org/t/p/w500/" + props.data.backdrop_path
      : props.data.poster_path !== null
      ? "https://image.tmdb.org/t/p/w500/" + props.data.poster_path
      : "https://www.sarras-shop.com/out/pictures/master/product/1/no-image-available-icon.jpg";
  const filmTitle = props.data.title !== undefined && props.data.title !== null ? props.data.title : props.data.name;
  const originalTitle = props.data.original_name !== undefined ? props.data.original_name : filmTitle;
  const date = props.data.first_air_date !== null && props.data.first_air_date !== undefined ? props.data.first_air_date : props.data.release_date;
  return props.isShowing
    ? ReactDOM.createPortal(
        <React.Fragment>
          <div className="modal-overlay" />
          <div className="modal-wrapper" aria-modal aria-hidden tabIndex={-1} role="dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h2>{filmTitle}</h2>
                <div className="rateContainer">
                  <ConvertVoteAverageInStars value={voteAverage} />
                </div>
                <span className="close" onClick={close}>
                  &times;
                </span>
              </div>
              <div className="modal-body">
                <div className="popupBodyTop">
                  <img
                    className="posterDetailImg"
                    src={backdropPath}
                    alt={"locandina del film " + filmTitle}
                    title={"locandina del film " + filmTitle}
                    aria-labelledby={"locandina del film " + filmTitle}
                  />
                  <div className="moreDetails">
                    <p>
                      <span className="description">Original title:</span> {originalTitle}
                    </p>
                    <p>
                      <span className="description">Genre:</span> {genres}
                    </p>
                    <p>
                      <span className="description">Production date:</span> {date}
                    </p>
                  </div>
                </div>
                <div className="popupBodyBottom">
                  <p className="description descriptionDetail">Description:</p>
                  <hr></hr>
                  <p className="moreDetails descriptionDetail">{description}</p>
                </div>
              </div>
            </div>
          </div>
        </React.Fragment>,
        document.body
      )
    : null;
}
