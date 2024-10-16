import Menu from "../menu/Menu";

const Layout = ({ children, moduleCode }) => {
  return (
    <div className="grid grid-cols-12">
      <div className="col-span-2">
        <Menu />
      </div>
      <div className="col-span-10">{children}</div>
    </div>
  );
};

export default Layout;
