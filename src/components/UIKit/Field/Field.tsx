import { FC } from "react";
import { useField } from "formik";

import "./Field.styled.css";

interface IProps {
  name: string;
  multiple?: boolean;
  placeholder?: string;
}

const Field: FC<IProps> = ({ name, multiple = false, placeholder = "Text" }) => {
  const [props, { error }] = useField(name);

  return (
    <div className="field-wrapper">
      {multiple ? (
        <textarea className="input field-area" placeholder={placeholder} {...props}></textarea>
      ) : (
        <input className="input block" type="text" placeholder={placeholder} {...props} />
      )}

      {error && <p className="field-error">{error}</p>}
    </div>
  );
};

export default Field;
