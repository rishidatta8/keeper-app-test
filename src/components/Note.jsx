import { Fab, Zoom } from "@material-ui/core";
import React from "react";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";

function Note(props) {
  function handleClick() {
    props.onDelete(props.id, props.firebaseId);
  }

  var isTrue = true;
  var time = 300;

  return (
    <Zoom in={isTrue} timeout={time}>
      <div className="note">
        <h1>{props.title}</h1>
        <p>{props.content}</p>
        <Fab onClick={handleClick}>
          <DeleteOutlineIcon />
        </Fab>
      </div>
    </Zoom>
  );
}

export default Note;
