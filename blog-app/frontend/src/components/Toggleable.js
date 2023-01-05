function Toggleable({ isVisible, toggleVisibility, buttonLabel, children }) {
  return (
    <div>
      {isVisible ? (
        <>
          {children}
          <button onClick={() => toggleVisibility(false)}>{buttonLabel.visible}</button>
        </>
      ) : (
        <button onClick={() => toggleVisibility(true)}>{buttonLabel.hidden}</button>
      )}
    </div>
  );
}

export default Toggleable;
