import React from "react";
import Item from "../genericComponents/Item";
/**
 * ManageItemsInCarousel component manage items
 * @param {object} props.items
 * @returns
 */
export default function ManageItemsInCarousel(props) {
  const items = props.items;
  return (
    <div className="carousel">
      {items.map((item, index) => (
        <Item item={item} key={index} />
      ))}
    </div>
  );
}
