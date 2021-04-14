import React, { useEffect, useCallback, useState } from "react";
import ManageItemsInCarousel from "../genericComponents/ManageItemsInCarousel";

/**
 * Carousel component take the carousel component and manage the previous carousel button and the next carousel button
 * @param {object} props.data
 * @returns
 */
export default function Carousel(props) {
  const data = props.data;
  const SKIP = 3;
  const LIMIT_PAGE = 5;
  const [items, setItems] = useState([]);

  useEffect(() => setItems(data), [data]);

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
      <div className="buttons-container">
        <button className="button" data-message="Questo pulsante permette di scorrere ai film precedenti" onClick={prev}>
          <font>&#8249;</font>
        </button>
        <ManageItemsInCarousel items={items} />

        <button className="button" data-message="Questo pulsante permette di scorrere ai film successivi" onClick={next}>
          <font>&#8250;</font>
        </button>
      </div>
    </div>
  );
}
