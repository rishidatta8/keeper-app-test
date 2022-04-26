import React from "react";
import { collection, getDocs } from "firebase/firestore";
import db from "./Firebase";
import { doc, deleteDoc, orderBy, query } from "firebase/firestore";
import { querySnapshot } from "firebase/firestore";
import {Redirect} from "react-router-dom";
import {useState} from "react";
import App from "./App";

function Login(){
    
    var [shouldLogin, setLogin] = useState(false);

    if(shouldLogin){
        return <App />;
    }
    
    var email = "";
    var password = "";
    function handleChange(event){
        const { name, value } = event.target;
        if(name == "email"){
            email = value;
        }
        if(name == "password"){
            password = value;
        }
    }


    async function fetchData() {
        const querySnapshot = await getDocs(collection(db, "loginDetails"));
        var loginDetails = [];
        querySnapshot.forEach((doc) => {
            var data = doc.data();
            loginDetails.push({email: data.email, password: data.password});
        });
        return loginDetails;
    }


    async function handleSubmit(){
        var loginDetails = await fetchData();
        for (var i = 0 ; i < loginDetails.length ; i++){
            console.log(loginDetails[i]);
            if(loginDetails[i].email === email){
                if (loginDetails[i].password === password){
                    console.log("logged in");
                    setLogin(true);
                }else{
                    console.log("wrong pswd");
                }
            }
        }
        return false;
    }




    return(
        <div>
            <label>
                Email:
                <input type="email" name="email" onChange={handleChange}/>
            </label>
            <label>
                Password:
                <input type="password" name="password" onChange={handleChange}/>
            </label>
                <input type="submit" value="Submit" onClick={handleSubmit}/>
        </div>
    );
}

export default Login;