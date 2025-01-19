"use client";
import { FC, MouseEvent, ReactNode, useEffect } from "react";
import { IoCloseSharp } from "react-icons/io5";

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
    <div
      className="fixed left-0 top-0 z-[100] h-full w-full overflow-y-auto bg-black/40"
      onClick={onBackdropClickClose}
    >
      <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 rounded-lg bg-gray-200 px-8 py-8  ">
        <button
          className="absolute right-3 top-3 transition-all duration-300 ease-in-out hover:scale-110"
          onClick={close}
        >
          <IoCloseSharp size={20} />
        </button>

        {children}
      </div>
    </div>
  );
};

export default Modal;
