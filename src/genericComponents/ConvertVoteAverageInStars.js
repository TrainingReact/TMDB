import React from "react";

/**
 * ConvertVoteAverageInStars component transforms the vote in tenths to a maximum of 5 stars
 * @param {float} props.value - movie vote in tenths
 * @returns
 */
export default function ConvertVoteAverageInStars(props) {
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
