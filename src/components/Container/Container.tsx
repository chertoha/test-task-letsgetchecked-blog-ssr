import React, { ReactNode } from "react";
import { FC } from "react";

interface IProps {
 children: ReactNode;
}

const Container: FC<IProps> = ({ children }) => {
 return <div className="container-default">{children}</div>;
};

export default Container;
