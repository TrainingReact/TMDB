import "./App.css";
import React from "react";
import UpperHeader from "./genericComponents/Header";
import Menu from "./genericComponents/Menu";
import Footer from "./genericComponents/Footer";

function App() {
  return (
    <div>
      <UpperHeader />
      <Menu />
      <Footer />
    </div>
  );
}

export default App;
