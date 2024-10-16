import { CSSProperties, FC, ReactNode } from "react";

interface IButtonProps {
  label?: string;
  type?: "button" | "reset" | "submit" | undefined;
  children?: ReactNode;
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
  style?: CSSProperties;
}

const Button: FC<IButtonProps> = ({
  label,
  type,
  children,
  disabled,
  onClick,
  className,
  style,
}) => {
  return (
    <div>
      {!children && (
        <button
          type={type}
          disabled={disabled}
          className={`${className}`}
          style={style}
          onClick={onClick}
        >
          {label}
        </button>
      )}
      {children && children}
    </div>
  );
};

export default Button;
