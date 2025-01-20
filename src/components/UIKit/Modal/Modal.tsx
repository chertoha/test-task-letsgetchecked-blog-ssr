"use client";

import { FC, MouseEvent, ReactNode, useEffect } from "react";
import { IoCloseSharp } from "react-icons/io5";

import "./Modal.styled.css";

interface IProps {
  close: () => void;
  children: ReactNode;
}

const Modal: FC<IProps> = ({ close, children }) => {
  useEffect(() => {
    const onEscButtonClose = (e: KeyboardEvent) => {
      if (e.code === "Escape") {
        close();
      }
    };

    window.addEventListener("keydown", onEscButtonClose);

    return () => {
      window.removeEventListener("keydown", onEscButtonClose);
    };
  }, [close]);

  const onBackdropClickClose = (e: MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      if (typeof window === "undefined") return;

      close();
    }
  };

  return (
    <div className="modal-backdrop" onClick={onBackdropClickClose} role="presentation">
      <div className="modal-dialog " role="dialog">
        <button className="modal-close-btn" onClick={close} aria-label="Close modal window">
          <IoCloseSharp size={20} />
        </button>

        {children}
      </div>
    </div>
  );
};

export default Modal;
