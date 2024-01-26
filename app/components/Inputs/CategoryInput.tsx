"use client";
import { IconType } from "react-icons";

interface CategoryInputProps {
  selected?: boolean;
  label: string;
  icon: IconType;
  onClick: (val: string) => void;
}
const CategoryInput: React.FC<CategoryInputProps> = ({
  selected,
  label,
  onClick,
  icon: Icon,
}) => {
  return (
    <div onClick={()=>onClick(label)} className= {`rounded-xl border-2 p-4 
    flex flex-col items-center gap-2 hover:border-green-500 transition
    cursor-pointer ${selected?'border-green-500 text-green-500':'border-slate-200'}`}>
      <Icon size={30} />
      <div className="font-medium">{label}</div>
    </div>
  );
};
export default CategoryInput;
