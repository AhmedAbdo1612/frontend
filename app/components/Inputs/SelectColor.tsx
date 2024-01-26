"use client";

import { ImageType } from "@/app/admin/add-products/AddProductForm";
import { useCallback, useEffect, useState } from "react";
import SelectImage from "./SelectImage";
import Button from "../Button/Button";
import Image from "next/image";

interface SelectColorProps {
  item: ImageType;
  addImageToState: (value: ImageType) => void;
  removeImageFromState: (value: ImageType) => void;
  isProductCreated: boolean;
}

const SelectColor: React.FC<SelectColorProps> = ({
  item,
  addImageToState,
  removeImageFromState,
  isProductCreated,
}) => {
  const [selected, setSelected] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    if (isProductCreated) {
      setSelected(false);
      setFile(null);
    }
  }, [isProductCreated]);
  const handleFileChange = useCallback((value: File) => {
    setFile(value);
    addImageToState({ ...item, image: value });
  }, []);
  const handleCheck = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSelected(e.target.checked);
    if (!e.target.checked) {
      setFile(null);
      removeImageFromState(item);
    }
  }, []);
  return (
    <div
      className="gird grid-cols-1 md:grid-cols-2 overflow-y-auto
    border-b-[1.2px] border-slate-200 items-center p-2 "
    >
      <div className="flex flex-row gap-2 items-center h-[60px]">
        <input
          id={item.color}
          type="checkbox"
          checked={selected}
          onChange={handleCheck}
          className="cursor-pointer"
        />
        <label htmlFor={item.color} className="font-medium cursor-pointer">
          {item.color}
        </label>
      </div>
      <>
        {selected && !file && (
          <div className="col-span-2 text-center">
            <SelectImage item={item} handleFileChange={handleFileChange} />
          </div>
        )}
        {file && (
          <div className="flex flex-row gap-2 text-sm col-span-2  justify-between">
            <div className="h-[50px] w-[50px] aspect-square overflow-hidden relative">
              <Image
                src={URL.createObjectURL(file)}
                alt={file.name}
                fill
                className="w-full h-full"
              />
            </div>
            <div className="w-[70px]">
              <Button
                small
                outline
                label="Cancel"
                custom="transition hover:bg-[red] hover:text-white hover:font-semibold"
                onClick={() => {
                  setFile(null);
                  removeImageFromState(item);
                  
                }}
              />
            </div>
          </div>
        )}
      </>
    </div>
  );
};
export default SelectColor;
