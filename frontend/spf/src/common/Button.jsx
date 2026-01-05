import './button.css';

const Button = ({ text, variant = 'primary', onClick }) => {
  return (
    <button className={`app-btn ${variant}`} onClick={onClick}>
      {text}
    </button>
  );
};

export default Button;
