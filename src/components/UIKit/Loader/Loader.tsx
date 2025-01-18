import { FC } from "react";
import { ClipLoader } from "react-spinners";

interface IProps {
  size?: number;
  color?: string;
}

const Loader: FC<IProps> = ({ size = 20, color }) => {
  return (
    <span className="flex items-center justify-center text-current ">
      <ClipLoader size={size} cssOverride={{ borderWidth: "2px" }} color={color} />
    </span>
  );
};

export default Loader;
