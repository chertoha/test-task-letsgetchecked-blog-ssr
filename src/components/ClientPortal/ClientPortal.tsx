"use client";
import { FC, ReactNode, useEffect, useRef } from "react";
import { createPortal } from "react-dom";

interface IProps {
  children: ReactNode;
  isOpen?: boolean;
  selector?: string;
}

const ClientPortal: FC<IProps> = ({ children, selector = "portal", isOpen }) => {
  const portalRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (typeof window !== "object") return;
    portalRef.current = document.getElementById(selector);
  }, [selector, isOpen]);

  return isOpen && portalRef.current ? createPortal(children, portalRef.current) : null;
};

export default ClientPortal;
