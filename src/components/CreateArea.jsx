import React, { useState } from "react";
import AddIcon from "@material-ui/icons/Add";
import { Fab, Zoom} from "@material-ui/core";
import { SlideDown } from "react-slidedown";
import "react-slidedown/lib/slidedown.css";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import db from "./Firebase";

function CreateArea(props) {
  const [note, setNote] = useState({
    title: "",
    content: "",
  });

  const [isClicked, setCLick] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;

    setNote((prevNote) => {
      return {
        ...prevNote,
        [name]: value
      };
    });
  }

  function addToFirebase(note){
    try{
      note.createdAt = serverTimestamp();
    const docRef = addDoc(collection(db,'notes'), note);
    console.log("Added note");
    return docRef.id;
  }catch(err){
    console.log("Error: "+err);
  }
  }

  function submitNote(event) {
    var firebaseId = addToFirebase(note);
        note.firebaseId = firebaseId;
        props.onAdd(note);
    setNote({
      title: "",
      content: ""
    });
    event.persist();
  }

  function handleClick() {
    setCLick(true);
  }

  var time = 1200;

  return (
    <div>
      <form className="create-note">
        <input
          style={isClicked ? { fontWeight: "bold" } : { fontWeight: "normal" }}
          name="title"
          onChange={handleChange}
          onClick={handleClick}
          value={note.title}
          placeholder={isClicked ? "Title" : "Take a note..."}
          autoComplete="off"
        />
        {isClicked ? (
          <SlideDown className="my-dropdown-slidedown">
            <div>
              <textarea
                name="content"
                onChange={handleChange}
                value={note.content}
                placeholder="Take a note..."
                rows={isClicked ? 3 : 1}
              />
              <Zoom in={isClicked ? true : false} timeout={time}>
                <Fab onClick={submitNote}>
                  <AddIcon />
                </Fab>
              </Zoom>
            </div>
          </SlideDown>
        ) : null}
      </form>
    </div>
  );
}

export default CreateArea;