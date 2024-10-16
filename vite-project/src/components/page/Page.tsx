import { CSSProperties, FC, ReactNode } from "react";
import Loader from "../Loader/Loader";

interface IPageProps {
  title: string;
  action: ReactNode;
  isLoading?: boolean;
  children: ReactNode;
  style?: CSSProperties;
}

const Page: FC<IPageProps> = ({
  title,
  action,
  isLoading,
  children,
  style,
}) => {
  return (
    <div
      className="flex flex-col w-full h-full overflow-hidden"
      style={{ flex: 1 }}
    >
      <div className="flex items-center justify-between px-4 py-4 shadow-lg">
        <h1 className="text-xl font-semibold">{title}</h1>
        {action}
      </div>
      <div
        className="w-full h-full relative"
        style={{ overflow: "auto", flex: 1, ...style }}
      >
        {isLoading && (
            <Loader loaderText="Loading..." showSpinner isModel={true} />
        )}
        {!isLoading && children}
      </div>
    </div>
  );
};

export default Page;
