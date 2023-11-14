import React, { useEffect, useRef } from "react";
import classes from "./ScreenMessages.module.css";

function ScreenMessages({ messages }) {
  const divRef = useRef(null);

  useEffect(() => {
    divRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
      inline: "nearest",
    });
  });

  return (
    <section className={classes.screen}>
      {messages.map(({ user, message, createdAt }, i) => (
        <div ref={divRef} className={classes.message} key={i}>
          <span className={classes.spanAuthor}>{user.username}</span>
          <span className={classes.spanDate}>
            {new Date(createdAt)
              .toLocaleString()
              .replace(",", "")
              .replace(/:.. /, " ")}
          </span>
          <p className={classes.pMessage}> {message}</p>
        </div>
      ))}
    </section>
  );
}

export default ScreenMessages;
