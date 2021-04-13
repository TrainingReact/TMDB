import React from "react";
import useModal from "../genericComponents/PersonalizedHooks";
import Modal from "../genericComponents/Modal";
/**
 *Item component manages the item carousel
 * @param {object} props.item - the object contains single movie data
 * @returns
 */
export default function Item(props) {
  const { title: filmTitle, poster_path: posterPath } = props.item;
  const { isShowing, toggle } = useModal();
  let checkIfExists = false;
  checkIfExists = true ? posterPath : (checkIfExists = false);
  return checkIfExists ? (
    <div className="item" onClick={toggle}>
      <Modal isShowing={isShowing} hide={toggle} data={props.item} />
      <img
        className="posterImg"
        src={"https://image.tmdb.org/t/p/w500/" + posterPath}
        alt={"locandina del film " + filmTitle}
        title={"locandina del film " + filmTitle}
        aria-labelledby={"locandina del film " + filmTitle}
      />
    </div>
  ) : (
    <div className="item" onClick={toggle}>
      <Modal isShowing={isShowing} hide={toggle} data={props.item} />
      <h3 className="centerTxt">{filmTitle}</h3>
      <img
        className="posterImg"
        src={"https://www.kirkstall.com/wp-content/uploads/2020/04/image-not-available-png-8.png"}
        alt={"locandina del film non disponibile"}
        title={"locandina del film non disponibile"}
        aria-labelledby={"locandina del film non disponibile"}
      />
    </div>
  );
}
