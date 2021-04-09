//header bar elements component (now it is empty but you could use it to add social icons)
export default function Footer() {
  return (
    <div className="fooContainer">
      <span className="fooElement">&#169; Progetto example</span>
      <span className="fooElement">Via XXXXXXXXXXX, 00</span>
      <span className="fooElement">
        Tel. <a href="tel:+0000000000">000 0000000</a> - Fax <a href="tel:+0000000000">0000 000000</a>
      </span>
    </div>
  );
}
