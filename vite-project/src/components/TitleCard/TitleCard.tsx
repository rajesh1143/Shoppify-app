import { CSSProperties, FC } from "react";

interface ITextViewerProps {
  title: string;
  subTitle?: string;
  isSearch?: boolean;
  style?: CSSProperties;
}

const TitleCard: FC<ITextViewerProps> = ({
  title,
  subTitle,
  isSearch,
  style,
}) => {
  return (
    <div className="text-center my-10" style={style}>
      <h1 className="text-4xl font-bold my-2text-center">
        {isSearch ? "Discover Your Results!" : title}
      </h1>
      <p className="mt-4 text-xl text-gray-700 italic">
        {isSearch ? "Here's What we found based on your search" : subTitle}
      </p>
    </div>
  );
};

export default TitleCard;
