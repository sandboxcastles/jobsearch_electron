import Modal from "../Modal";

interface VerifyModayProps {
    isOpen: boolean;
    verifyHeader?: string;
    verifyDetails?: string;
    onVerify: (isVerified: boolean) => void
}

function VerifyModal({ isOpen, verifyHeader, verifyDetails, onVerify }: VerifyModayProps) {
    const header = verifyHeader || 'Are you sure?';
    const details = verifyDetails ? <p>{verifyDetails}</p> : '';

    return (
        <>
            <Modal isOpen={isOpen} onClose={() => onVerify(false)}>
                    <span className="flex flex-col gap-4">
                        <span className="flex flex-col gap-2">
                            <h3 className="text-xl font-semibold">{header}</h3>
                            {details ? <p>{details}</p> : ''}
                        </span>
                        <span className="flex flex-row justify-between">
                            <button className="self-end bg-violet-700" onClick={() => onVerify(false)}>Cancel</button>
                            <button className="self-start bg-orange-700 hover:bg-orange-800" onClick={() => onVerify(true)}>Yes</button>
                        </span>
                    </span>
            </Modal>
        </>
    );
}

export default VerifyModal;