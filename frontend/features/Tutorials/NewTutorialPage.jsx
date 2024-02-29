import { useState } from "react";
import MDEditor from "@uiw/react-md-editor";

export default function NewTutorialPage() {
  const [value, setValue] = useState("**Hello world!!!**");
  return (
    <>
      <MDEditor
        style={{ width: "100%", minHeight: "100vh" }}
        value={value}
        onChange={setValue}
      />
      {/* <MDEditor.Markdown source={value} style={{ whiteSpace: "pre-wrap" }} /> */}
    </>
  );
}
