import { CSSProperties, FC } from "react";

interface ILoaderProps {
  loaderText?: string;
  style?: CSSProperties;
  showSpinner: boolean;
  isModel?: boolean;
  overlay?: boolean;
  blurBackground?: boolean;
}

const Loader: FC<ILoaderProps> = ({
  loaderText,
  showSpinner = true,
  isModel = false,
  overlay = false,
  blurBackground = false,
}) => {
  return (
    <div
      className={`flex justify-center ${
        isModel ? "absolute inset-0 z-50 items-center" : ""
      } ${overlay ? "bg-black bg-opacity-50" : ""} ${
        blurBackground ? "backdrop-blur-sm" : ""
      }`}
    >
      <div className="text-center">
        {loaderText && (
          <div
            className={`text-2xl font-semibold text-gray-800 mb-2 ${
              !isModel ? "animate-pulse" : ""
            }`}
          >
            {loaderText}
          </div>
        )}
        {showSpinner && (
          <div className="loader animate-spin inline-block w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full"></div>
        )}
      </div>
    </div>
  );
};
export default Loader;
