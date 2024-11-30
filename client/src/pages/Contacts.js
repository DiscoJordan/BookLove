import React, {useState,useContext} from "react";
import Button from "../components/Button";
import { URL } from "../config";
import axios from "axios";
import { UserContext } from "../context/UserContext";
function Contacts() {
  const {token} = useContext(UserContext);
    const [msg, setMsg] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        const { name, email, message, subject } = event.target.elements;

        var data = {
          name: name.value,
          email: email.value,
          message: message.value,
          subject: subject.value,
        };
        try {
          axios.defaults.headers.common["Authorization"] = token;
            setMsg("Checking...");
          const res = await axios.post(
            `${URL}/user/send_email`,
            data
          );

          name.value = "";
          email.value = "";
          message.value = "";
          subject.value = "";
         
          if(res.data.ok){
            setMsg("Your message has been sent, thanks!");
          } else{
            setMsg(res.data.message);
          }
          
          setTimeout(() => {
            setMsg('')
          }, 2000);
        } catch (error) {
          console.log(error?.message || error);
        }
      };

  return (
    <div className="blank__wrapper">
      <div className="contacts__cover">
        <div className="container">
          <h1>Контакты</h1>
        </div>
      </div>
      <div className="container">
        <h2>Контакты</h2>
        <p>
        Мы всегда рады помочь вам найти свою следующую любимую книгу! Если у вас есть вопросы, предложения или вы хотите поделиться своими впечатлениями, свяжитесь с нами любым удобным способом.
        </p>
        <hr />
        <h2>Мы на связи</h2>
        <p>
        Мы стараемся отвечать на все запросы в течение 24 часов. Благодарим за ваш интерес к BookLove и с нетерпением ждем ваших сообщений!
        </p>
        <form className="mailform" onSubmit={handleSubmit}>
          <div className="navigation__button">
            <textarea name="message" type="text" placeholder="Сообщение*" />
          </div>
          <div className="mailform__inputs">
            <div className="navigation__button">
              <span className="material-symbols-outlined">account_circle</span>
              <input name="name" type="text" placeholder="Имя*" />
            </div>
            <div className="navigation__button">
              <span className="material-symbols-outlined">email</span>
              <input name="email" type="text" placeholder="Email*" />
            </div>
            <div className="navigation__button">
              <span className="material-symbols-outlined">subject</span>
              <input name="subject" type="text" placeholder="Тема*" />
            </div>
            <button>
            <Button content={"Отправить"} />
            </button>
          </div>
        </form>
        <h2>{msg||''}</h2>
      </div>
    </div>
  );
}

export default Contacts;
