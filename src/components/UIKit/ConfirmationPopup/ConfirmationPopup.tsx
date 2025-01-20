import { FC, ReactNode } from "react";

import "./ConfirmationPopup.styled.css";

interface IProps {
  onConfirm: () => void;
  onReject: () => void;
  title: string;
  description?: string;
  confirmButtonElement?: ReactNode;
  rejectButtonElement?: ReactNode;
}

const ConfirmationPopup: FC<IProps> = ({
  title,
  description,
  onConfirm,
  onReject,
  confirmButtonElement,
  rejectButtonElement,
}) => {
  return (
    <div>
      <h2 className="confirm-popup-title">{title}</h2>
      <p className="confirm-popup-description">{description}</p>

      <div className="confirm-popup-button-wrapper">
        {rejectButtonElement || (
          <button type="button" className="cancel py-[2px]" onClick={onReject}>
            Cancel
          </button>
        )}

        {confirmButtonElement || (
          <button type="button" className="submit py-[2px]" onClick={onConfirm}>
            Ok
          </button>
        )}
      </div>
    </div>
  );
};

export default ConfirmationPopup;
