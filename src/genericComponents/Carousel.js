import React, { useEffect, useCallback, useState } from "react";
import ReactDOM from "react-dom";

//Item component manages the item carousel
//params: props: filmTitle(string), posterPath(string)
//components: Modal
//personalized Hook: useModal
export function Item(props) {
  const { isShowing, toggle } = useModal();
  const filmTitle = props.item.title;
  const posterPath = props.item.poster_path;
  let checkIfExists = false;
  console.log(posterPath);
  checkIfExists = true ? posterPath : (checkIfExists = false);

  return checkIfExists ? (
    <div className="item" onClick={toggle}>
      <Modal isShowing={isShowing} hide={toggle} data={props} />
      <h3 className="centerTxt">{filmTitle}</h3>
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
      <Modal isShowing={isShowing} hide={toggle} data={props} />
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

//Modal component is the popup
//params: props: voteAverage(float), close(function useModal), backdropPath(string), filmTitle(string), originalTitle(string),
//genres(string), description(string), date(date)
//components: ConvertVoteAverageInStars
export function Modal(props) {
  const voteAverage = props.data.item.vote_average;
  const close = props.hide;
  const backdropPath =
    props.data.item.backdrop_path !== null
      ? "https://image.tmdb.org/t/p/w500/" + props.data.item.backdrop_path
      : props.data.item.poster_path !== null
      ? "https://image.tmdb.org/t/p/w500/" + props.data.item.poster_path
      : "https://www.sarras-shop.com/out/pictures/master/product/1/no-image-available-icon.jpg";
  const filmTitle = props.data.item.title !== undefined && props.data.item.title !== null ? props.data.item.title : props.data.item.name;
  const originalTitle = props.data.item.original_name;
  const genres = props.data.item.genres;
  const description = props.data.item.overview;
  const date = props.data.item.first_air_date !== null && props.data.item.first_air_date !== undefined ? props.data.item.first_air_date : props.data.item.release_date;
  //portal usefull for the creation of popup and personalized hook (useModal Hook)
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

//ConvertVoteAverageInStars component transforms the vote in tenths to a maximum of 5 stars
//params: props: averageVote(float)
export function ConvertVoteAverageInStars(props) {
  const averageVote = props.value;
  const starNumber = parseInt(averageVote / 2);
  let takeStar = [];
  for (let i = 0; i < starNumber; i++) {
    takeStar.push(i);
  }
  const starList = takeStar.map((i) => (
    <li className="rate" key={i}>
      &#9733;
    </li>
  ));
  return <ul className="rateContainer">{starList}</ul>;
}

//useModal is a personalized hook for popup details
//components: Item
const useModal = () => {
  const [isShowing, setIsShowing] = useState(false);

  function toggle() {
    setIsShowing(!isShowing);
  }
  return {
    isShowing,
    toggle,
  };
};

//Carousel component take the carousel component and manage the previous carousel button and the next carousel button
//params: props: items(array)
//components: Item
export function Carousel(props) {
  const items = props.items;
  return (
    <div className="carousel">
      {items.map((item, index) => (
        <Item item={item} key={index} />
      ))}
    </div>
  );
}

//ActionsButtons component take the carousel component and manage the previous carousel button and the next carousel button
//params: props: data(array)
//components: Carousel
export default function ActionsButtons(props) {
  const data = props.data;
  const SKIP = 3;
  const LIMIT_PAGE = 5;
  const [items, setItems] = useState(data);
  useEffect(() => {
    setItems(data);
  }, [data]);

  const prev = useCallback(() => {
    const currentIndex = items[0].index - SKIP;
    if (currentIndex >= 0) {
      const cloneData = [...data];
      const prevItems = cloneData.splice(currentIndex, SKIP);
      setItems([...prevItems, ...items]);
    }
  }, [data, items]);

  const next = useCallback(() => {
    if (items.length > LIMIT_PAGE) {
      setItems((prevSlides) => {
        const nextSlides = [...prevSlides];
        return nextSlides.slice(SKIP);
      });
    }
  }, [setItems, items]);

  return (
    <div className="carouselContainer">
      <Carousel items={items} />

      <div className="buttons-container">
        <button className="button" data-message="Questo pulsante permette di scorrere ai film precedenti" onClick={prev}>
          <font>&#8249;</font>
        </button>
        <button className="button" data-message="Questo pulsante permette di scorrere ai film successivi" onClick={next}>
          <font>&#8250;</font>
        </button>
      </div>
    </div>
  );
}
