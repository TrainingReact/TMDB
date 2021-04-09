import facebook from "../images/facebook_logo.png";
import instagram from "../images/insta_logo.png";
//header bar elements component (now it is empty but you could use it to add social icons)
export default function UpperHeader() {
  return (
    <div className="logo">
      <span className="socialBox">
        <img className="socialIcon" src={facebook} />
      </span>
      <span className="socialBox">
        <img className="socialIcon" src={instagram} />
      </span>
    </div>
  );
}
