import { LOGO_URL } from "../../common/constants/constants";
import { MdAdminPanelSettings } from "react-icons/md";
import { LuLogOut } from "react-icons/lu";
import { AiFillProduct } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const Menu = () => {
  const navigate = useNavigate();
  return (
    <div className="">
      <div
        className="col-span-2 h-screen bg-white shadow-lg"
        style={{ zIndex: 10 }}
      >
        <div className="flex flex-col p-3 gap-y-4 border-b-2">
          <div className="flex items-center">
            <img src={LOGO_URL} className="h-8 w-8" />
            <p className="text-xl font-semibold ml-4">Shoppify</p>
          </div>
          <div className="flex items-center justify-center rounded-md bg-blue-500 w-full py-2 px-2">
            <MdAdminPanelSettings size={23} color="white" />
            <span className="ml-2 text-white font-semibold">Admin</span>
          </div>
          <div
            className="flex items-center text-red-500 cursor-pointer"
            onClick={() => navigate("/")}
          >
            <LuLogOut size={23} />
            <span className="ml-3 text-xl font-semibold">Logout</span>
          </div>
        </div>
        {/* menuList */}
        <div className="flex flex-col py-4">
          <div className="flex items-center py-2 px-2 cursor-pointer hover:bg-gray-100">
            <AiFillProduct size={24} />
            <span className="text-xl font-semibold ml-2">
              Products Management
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Menu;
