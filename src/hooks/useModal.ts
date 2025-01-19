import { useState } from "react";

const useModal = () => {
  const [isOpen, setIsOpen] = useState<boolean>();
  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);
  const toggle = () => setIsOpen(prevState => !prevState);

  return { isOpen, open, close, toggle };
};

export default useModal;
