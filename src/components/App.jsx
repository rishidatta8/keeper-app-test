import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import {collection} from "firebase/firestore";
import db from "./Firebase";
import { doc, deleteDoc, orderBy, query} from "firebase/firestore";
import {onSnapshot } from "firebase/firestore";


function App() {
  const [notes, setNotes] = useState([]);

  const [isLoaded, setLoaded] = useState(false);

  function fetchData(){
    setLoaded(true);
    const q = query(collection(db, "notes"), orderBy("createdAt"));
    const queryData = onSnapshot(q, (querySnapshot) => {
      var notesArray = [];
    querySnapshot.forEach((doc) => {
      var data = doc.data();
      notesArray.push({ title: data.title, content: data.content, firebaseId: doc.id });
    }); 
    setNotes(notesArray);
  });
setLoaded(false);
}

  useEffect(()=>{
    fetchData();
  },[]);


  function addNote(newNote) {
    setNotes(prevNotes => {
      return [...prevNotes, newNote];
    });
  }

  function deleteNote(id, firebaseId) {
    deleteDoc(doc(db, "notes", firebaseId));
    setNotes(prevNotes => {
      return prevNotes.filter((noteItem, index) => {
        return index !== id;
      });
    });
  }

  return (
    <div>
      <Header />
      <CreateArea onAdd={addNote} />
      <div style={{paddingLeft: "16px"}}>
      {notes.map((noteItem, index) => {
        return (
          <Note
          firebaseId={noteItem.firebaseId}
            key={index}
            id={index}
            title={noteItem.title}
            content={noteItem.content}
            onDelete={deleteNote}
          />
        );
      })}
      </div>
      {/* <Footer /> */}
    </div>
  );
}

export default App;
