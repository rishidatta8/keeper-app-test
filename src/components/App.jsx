import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import {collection, getDocs } from "firebase/firestore";
import db from "./Firebase";
import { doc, deleteDoc } from "firebase/firestore";


function App() {
  const [notes, setNotes] = useState([]);



  const [isLoaded, setIsLoaded] = useState(false);
  const [isPageLoaded, setIsPageLoaded] = useState(false); //this helps

  useEffect(() => {
    async function fetchData() {
      var querySnapshot = await getDocs(collection(db,'notes'));
        var notesArray = [];
        querySnapshot.forEach((doc) => {
          var data = doc.data();
          notesArray.push({ title: data.title, content: data.content, firebaseId: doc.id});
        });
        setNotes(notesArray);
    }
    fetchData();
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      setIsPageLoaded(true);
    }
  }, [isLoaded]);



  function addNote(newNote) {
    setNotes(prevNotes => {
      return [...prevNotes, newNote];
    });
  }

  async function deleteNote(id, firebaseId) {

    //await delete doc(query(collection(db, "notes"), where("firebaseId", "==", firebaseId));
    await deleteDoc(doc(db, "notes", firebaseId));

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
      <Footer />
    </div>
  );
}

export default App;
