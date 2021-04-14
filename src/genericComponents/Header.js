import facebook from "../images/facebook_logo.png";
import instagram from "../images/insta_logo.png";
/**
 * header bar elements component (social icons)
 * @returns
 */
export default function UpperHeader() {
  return (
    <div className="logo">
      <span className="socialBox">
        <img className="socialIcon" src={facebook} alt="logo di Facebook" title="logo di Facebook" aria-labelledby="logo Facebook" />
      </span>
      <span className="socialBox">
        <img className="socialIcon" src={instagram} alt="logo di Instagram" title="logo di Instagram" aria-labelledby="logo Instagram" />
      </span>
    </div>
  );
}
