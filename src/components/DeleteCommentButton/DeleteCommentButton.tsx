import useModal from "@/hooks/useModal";
import { FC, useTransition } from "react";
import { MdDeleteOutline } from "react-icons/md";
import ClientPortal from "../ClientPortal";
import Modal from "../UIKit/Modal";
import ConfirmationPopup from "../UIKit/ConfirmationPopup";
import { deleteCommentAction } from "@/actions/deleteCommentAction";
import Loader from "../UIKit/Loader";

interface IProps {
  commentId: number;
}

const DeleteCommentButton: FC<IProps> = ({ commentId }) => {
  const { isOpen, open, close } = useModal();
  const [isPending, startTransition] = useTransition();

  const onDeleteHandler = () => {
    startTransition(() => {
      deleteCommentAction(commentId).then(response => {
        if (response.status === "error") {
          alert(response.message);
        }

        close();
      });
    });
  };

  return (
    <>
      <button
        type="button"
        aria-label="Delete comment"
        className="toolbar-icon p-1"
        onClick={open}
        disabled={isPending}
      >
        {isPending ? <Loader size={15} /> : <MdDeleteOutline size={17} />}
      </button>

      <ClientPortal isOpen={isOpen}>
        <Modal close={close}>
          <ConfirmationPopup
            onReject={close}
            onConfirm={onDeleteHandler}
            title="Remove comment"
            description="Are you sure, you want to remove comment?"
          />
        </Modal>
      </ClientPortal>
    </>
  );
};

export default DeleteCommentButton;
