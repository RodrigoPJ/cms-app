import { type ReactNode, useRef, useEffect } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  fullScreen?: boolean;
}

export default function Modal({
  isOpen,
  fullScreen = false,
  onClose,
  children,
}: ModalProps) {
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  useEffect(() => {
    if (isOpen) {
      dialogRef.current?.showModal();
    } else {
      dialogRef.current?.close();
    }
  }, [isOpen]);

  return (
    <>
      {fullScreen ? (
        <dialog ref={dialogRef} id="my_modal_4" onClose={onClose} className="modal">
  <div className="modal-box w-11/12 max-w-5xl">
        {children}
    <div className="modal-action">
      <form method="dialog">
        {/* if there is a button, it will close the modal */}
        <button className="btn">Close</button>
      </form>
    </div>
  </div>
</dialog>
      ) : (
        <dialog
          ref={dialogRef}
          className="modal sm:modal-middle"
          onClose={onClose}
        >
          <div className="modal-box bg-base-100">
            <button
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              onClick={onClose}
            >
              ✕
            </button>
            {children}
          </div>
          <form method="dialog" className="modal-backdrop">
            <button onClick={onClose}>Close</button>
          </form>
        </dialog>
      )}{" "}
    </>
  );
}
