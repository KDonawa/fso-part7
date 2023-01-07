import Button from "react-bootstrap/Button";

function StyledButton(props) {
  return (
    <Button {...props} variant={props.variant || "outline-primary"}>
      {props.children}
    </Button>
  );
}

export default StyledButton;
