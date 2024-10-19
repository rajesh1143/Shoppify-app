/* eslint-disable @typescript-eslint/no-explicit-any */
import { CSSProperties, FC } from "react";
import { MdAdminPanelSettings } from "react-icons/md";

interface IDropDownProps {
  options: {
    text: string;
    icon: string;
  }[];
  item?: any;
  style?: CSSProperties;
  isAdmin: () => void;
  // onEdit?: (id: number) => void;
  // onDelete?: (id: number) => void;
}

const DropDown: FC<IDropDownProps> = ({
  options,
  style,
  isAdmin,
  // onEdit,
  // onDelete,
}) => {

  const handleAdminNav = () => {
    isAdmin();
  };
  // const handleNav = (eachOption) => {
  //   if(eachOption.icon === "admin") navigate("/admin")
  // }
  return (
    <ul
      className="flex flex-col gap-y-2 text-gray-500 min-h-32 w-44 bg-gray-100 rounded-md px-4 py-3 shadow-md absolute cursor-pointer"
      style={style}
    >
      <li className="font-bold text-md">Actions</li>
      {options?.map((eachOption, i) => (
        <li key={i} className="flex items-center justify-between text-lg font-semibold hover:text-gray-700" onClick={handleAdminNav}>
          {eachOption?.text}
          <span>
            {/* {eachOption?.icon === "delete" && (
              <FaTrashCan size={18} onClick={() => onDelete(item?.id)} />
            )}
            {eachOption?.icon === "edit" && (
              <FaEdit size={18} onClick={() => onEdit(item?.id)} />
            )} */}
            {eachOption?.icon === "admin" && (
              <MdAdminPanelSettings size={18} />
            )}
          </span>
        </li>
      ))}
    </ul>
  );
};

export default DropDown;
