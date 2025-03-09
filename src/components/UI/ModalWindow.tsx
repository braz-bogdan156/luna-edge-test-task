import {ModalProps} from "../../types";

const ModalWindow = ({active, setActive, children}:ModalProps) => {
    return (
        <div
            className={`w-screen h-screen bg-black/40 fixed top-0 left-0
                flex items-center justify-center
                scale-0 ${active? 'scale-100': ''} `}
            onClick={() => setActive(false)}
        >
            <div
                className="p-5 rounded-2xl bg-white "
                onClick={e => e.stopPropagation()}
            >
                {children}
            </div>
        </div>
    );
};

export default ModalWindow;