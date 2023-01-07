import Button from "./Button";

function Toggleable({ isVisible, show, buttonLabel, children }) {
  return (
    <div>
      {isVisible ? (
        children
      ) : (
        <Button onClick={() => show()}>{buttonLabel}</Button>
      )}
    </div>
  );
}

export default Toggleable;
