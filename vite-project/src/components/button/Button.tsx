import { CSSProperties, FC, ReactNode } from "react";

interface IButtonProps {
  label?: string;
  type?: "button" | "reset" | "submit" | undefined;
  icon?: ReactNode;
  children?: ReactNode;
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
  style?: CSSProperties;
}

const Button: FC<IButtonProps> = ({
  label,
  type,
  icon,
  children,
  disabled,
  onClick,
  className,
  style,
}) => {
  return (
    <div className="">
      {!children && (
        <button
          type={type}
          disabled={disabled}
          className={className}
          style={style}
          onClick={onClick}
        >
          {icon} {label}
        </button>
      )}
      {children && children}
    </div>
  );
};

export default Button;
