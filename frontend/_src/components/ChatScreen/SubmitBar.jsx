import React from "react";
import classes from "./SubmitBar.module.css";

function SubmitBar({ inputValue, onClick, onChange, disabled }) {
  return (
    <form onSubmit={(e) => e.preventDefault()} className={classes.submitBar}>
      <input value={inputValue} onChange={onChange} />
      <button disabled={disabled} onClick={onClick}>
        send
      </button>
    </form>
  );
}

export default SubmitBar;
