import { FC, ReactNode } from "react";

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
      <h2 className="text-lg text-center font-bold">{title}</h2>
      <p className="mt-8 text-center">{description}</p>

      <div className="flex items-center justify-end gap-5 mt-10">
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
