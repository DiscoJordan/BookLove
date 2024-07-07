import React, {useState,useContext} from "react";
import Button from "../components/Button";
import { URL } from "../config";
import axios from "axios";
import { UserContext } from "../context/UserContext";
function Contacts() {
  const {token} = useContext(UserContext);
    const [msg, setMsg] = useState('');

    const handleSubmit = async (event) => {
        // preventing page from reloading on submitting the form
        event.preventDefault();
        // destructuring form elements - remember that you give properties name with "name" attribute to every each input
        const { name, email, message, subject } = event.target.elements;
        // composing data object to end in the body of a request. As destructured elements are HTMLElements, we need to extract their values to get strings
        var data = {
          name: name.value,
          email: email.value,
          message: message.value,
          subject: subject.value,
        };
        // sending request to the server
        try {
          axios.defaults.headers.common["Authorization"] = token;
            setMsg("Checking...");
          const res = await axios.post(
            `${URL}/user/send_email`,
            data
          );
          // response from the server
        //   console.log("res: ", res);
          // clearing form inputs
          name.value = "";
          email.value = "";
          message.value = "";
          subject.value = "";
          // alert to the user
         
          if(res.data.ok){
            setMsg("Your message has been sent, thanks!");
          } else{
            setMsg(res.data.message);
          }
          
          setTimeout(() => {
            setMsg('')
          }, 2000);
        } catch (error) {
          // logging error to the console
          console.log(error?.message || error);
        }
      };

  return (
    <div className="blank__wrapper">
      <div className="contacts__cover">
        <div className="container">
          <h1>Contacts</h1>
        </div>
      </div>
      <div className="container">
        <h2>Contact Us</h2>
        <p>
          We’re here to help you make the most out of your Barcelona experience.
          Whether you have a question, feedback, or need assistance, our team at
          Barcelove is always ready to assist you. We value your opinions and
          suggestions. They help us improve our services and offer a better
          experience to all our users. Please send your feedback using the form
          below.
        </p>
        <hr />
        <h2>Get in touch</h2>
        <p>
          We aim to create an engaging and user-friendly platform where visitors
          can discover, rate, and share their experiences at Barcelona's top
          landmarks. Our detailed guides, user reviews, and interactive maps
          make it easy for you to plan your perfect trip and make the most out
          of your time in this incredible city.
        </p>
        <form className="mailform" onSubmit={handleSubmit}>
          <div className="navigation__button">
            <textarea name="message" type="text" placeholder="Message*" />
          </div>
          <div className="mailform__inputs">
            <div className="navigation__button">
              <span className="material-symbols-outlined">account_circle</span>
              <input name="name" type="text" placeholder="Name*" />
            </div>
            <div className="navigation__button">
              <span className="material-symbols-outlined">email</span>
              <input name="email" type="text" placeholder="Email*" />
            </div>
            <div className="navigation__button">
              <span className="material-symbols-outlined">subject</span>
              <input name="subject" type="text" placeholder="Subject*" />
            </div>
            <button>
            <Button content={"Send"} />
            </button>
          </div>
        </form>
        <h2>{msg||''}</h2>
      </div>
    </div>
  );
}

export default Contacts;
