export default function onChangeHandler(value, setState) {
  if (value) {
    setState(value);
    return;
  }
  console.error("onChange handler error");
}
