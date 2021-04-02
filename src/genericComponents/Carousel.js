import React, { useEffect, useCallback, useState, useRef } from "react";
import ReactDOM from "react-dom";

export function Item(props) {
  const { isShowing, toggle } = useModal();
  const refItem = useRef(null);
  return (
    <div className="item" ref={refItem} onClick={toggle}>
      <Modal isShowing={isShowing} hide={toggle} data={props} />
      <h3 className="centerTxt">{props.item.title}</h3>
      <img
        className="posterImg"
        src={"https://image.tmdb.org/t/p/w500/" + props.item.poster_path}
        alt={"locandina del film " + props.item.title}
        title={"locandina del film " + props.item.title}
        aria-labelledby={"locandina del film " + props.item.title}
      />
    </div>
  );
}

//portal usefull for the creation of popup and personalized hook (useModal Hook)
const Modal = ({ isShowing, hide, data }) =>
  isShowing
    ? ReactDOM.createPortal(
        <React.Fragment>
          <div className="modal-overlay" />
          <div className="modal-wrapper" aria-modal aria-hidden tabIndex={-1} role="dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h2>
                  {data.item.title}
                  {data.item.name}
                </h2>
                <div className="rateContainer">
                  <Vote value={data.item.vote_average} />
                </div>
                <span className="close">&times;</span>
              </div>
              <div className="modal-body">
                <div className="popupBodyTop">
                  <img
                    className="posterDetailImg"
                    src={"https://image.tmdb.org/t/p/w500/" + data.item.backdrop_path}
                    alt={"locandina del film " + data.item.title + data.item.name}
                    title={"locandina del film " + data.item.title + data.item.name}
                    aria-labelledby={"locandina del film " + data.item.title + data.item.name}
                  />
                  <div className="moreDetails">
                    <p>
                      <span className="description">Original title:</span> {data.item.original_name}
                      {data.item.original_title}
                    </p>
                    <p>
                      <span className="description">Genre:</span> {data.item.genres}
                    </p>
                    <p>
                      <span className="description">Production date:</span> {data.item.first_air_date}
                      {data.item.release_date}
                    </p>
                  </div>
                </div>
                <div className="popupBodyBottom">
                  <p className="description descriptionDetail">Description:</p>
                  <hr></hr>
                  <p className="moreDetails descriptionDetail">{data.item.overview}</p>
                </div>
              </div>
            </div>
          </div>
        </React.Fragment>,
        document.body
      )
    : null;

//the function transforms the vote in tenths to a maximum of 5 stars
export function Vote(props) {
  const averageVote = props.value;
  const starNumber = parseInt(averageVote / 2);
  let x = [];
  for (let i = 0; i < starNumber; i++) {
    x.push(i);
  }
  const starList = x.map((i) => (
    <li className="rate" key={i}>
      &#9733;
    </li>
  ));
  return <ul className="rateContainer">{starList}</ul>;
}

//personalized hook creation
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

export function Carousel(props) {
  return (
    <div className="carousel">
      {props.items.map((item, index) => (
        <Item item={item} key={index} />
      ))}
    </div>
  );
}

export default function ActionsButtons(props) {
  const SKIP = 3;
  const LIMIT_PAGE = 5;
  const [items, setItems] = useState(props.data);

  useEffect(() => {
    setItems(props.data);
  }, [props.data]);

  const prev = useCallback(() => {
    const currentIndex = items[0].index - SKIP;
    if (currentIndex >= 0) {
      const cloneData = [...props.data];
      const prevItems = cloneData.splice(currentIndex, SKIP);
      setItems([...prevItems, ...items]);
    }
  }, [props.data, items]);

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
          <font>&#8592;</font>
        </button>
        <button className="button" data-message="Questo pulsante permette di scorrere ai film successivi" onClick={next}>
          <font>&#8594;</font>
        </button>
      </div>
    </div>
  );
}
