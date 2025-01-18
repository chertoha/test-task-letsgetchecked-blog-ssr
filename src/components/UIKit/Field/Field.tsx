import { useField } from "formik";
import { FC } from "react";

interface IProps {
  name: string;
  multiple?: boolean;
  placeholder?: string;
}

const Field: FC<IProps> = ({ name, multiple = false, placeholder = "Text" }) => {
  const [props, { error }] = useField(name);

  return (
    <>
      <div className="relative h-full">
        {multiple ? (
          <textarea
            className="input block h-full resize-none"
            placeholder={placeholder}
            {...props}
          ></textarea>
        ) : (
          <input className="input block" type="text" placeholder={placeholder} {...props} />
        )}

        {error && <p className=" absolute top-full left-0 text-red-500 text-xs pl-2">{error}</p>}
      </div>
    </>
  );
};

export default Field;
