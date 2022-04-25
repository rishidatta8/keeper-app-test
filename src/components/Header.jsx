import React from "react";
import HighlightIcon from "@material-ui/icons/Highlight";

function Header() {
  return (
    <header>
      <HighlightIcon
        fontSize="large"
        style={{ color: "white", position: "relative", top: "3px" }}
      />
      <h1 style={{ display: "inline" }}> Keeper</h1>
    </header>
  );
}

export default Header;
