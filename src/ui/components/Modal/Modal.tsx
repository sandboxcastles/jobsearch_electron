import { JSX } from "react";

export interface ModalProps {
    isOpen: boolean;
    onClose?: () => void;
    children?: string | JSX.Element | JSX.Element[]
}
const Modal = ({ isOpen, onClose, children }: ModalProps) => {
    if (!isOpen) {
        return null;
    }
    return (
        <div className="flex justify-center items-center fixed inset-x-0 inset-y-0 bg-black/50" onClick={onClose}>
            <div className="bg-black p-10 rounded relative min-w-80 max-w-lg text-white" onClick={(e) => e.stopPropagation()}>
                <button
                    className="flex justify-center items-center absolute top-0 right-0 border-none bg-transparent text-transparent hover:bg-red-600/50 hover:text-white text-l cursor-pointer"
                    onClick={onClose}
                >x</button>
                {children}
            </div>
        </div>
    );
}

export default Modal;