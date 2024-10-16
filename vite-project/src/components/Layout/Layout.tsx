import { FC, ReactNode } from "react";
import Menu from "../menu/Menu";

interface ILayoutProps {
    children:ReactNode;
    moduleCode:string;
}

const Layout:FC<ILayoutProps> = ({ children, moduleCode }) => {
  return (
    <div className="grid grid-cols-12">
      <div className="col-span-2">
        <Menu moduleCode={moduleCode}/>
      </div>
      <div className="col-span-10">{children}</div>
    </div>
  );
};

export default Layout;
