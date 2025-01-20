import Link from "next/link";

import { FC } from "react";
import { BsArrowLeft } from "react-icons/bs";

import "./BackLink.styled.css";

interface IProps {
  href: string;
}

const BackLink: FC<IProps> = ({ href }) => {
  return (
    <Link href={href} className="link" aria-label="Back to home page">
      <BsArrowLeft size={20} />
    </Link>
  );
};

export default BackLink;
