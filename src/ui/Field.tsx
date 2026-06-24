import { IconType } from "react-icons";

const variants = {};

type FieldProps = {
  placeholder: string;
  icon: IconType;
};

export function Field({ placeholder, icon: Icon }: FieldProps) {
  return (
    <div className="relative">
      <input
        type="text"
        className="border-1 border-gray-border rounded-xl text-black pl-[20px] py-2"
        placeholder={placeholder}
      />
      {Icon && (
        <div className="absolute right-5 top-[30%]">
          <Icon className="text-black size-5" />
        </div>
      )}
    </div>
  );
}
