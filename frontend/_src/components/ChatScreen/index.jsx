import React from "react";
import classes from "./ChatScreen.module.css";

function ChatScreen({ children, onChange, inputValue, user, room }) {
  return (
    <section className={classes.screen}>
      <div className={classes.inputWrapper}>
        <div>
          <h4>name :</h4>
          <input value={user} disabled onChange={onChange} />
        </div>
        <div>
          <h4>room :</h4>
          <input value={room} onChange={onChange} disabled />
        </div>
      </div>
      {children}
    </section>
  );
}

export default ChatScreen;
