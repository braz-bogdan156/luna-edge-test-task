import { ModalProps } from "../../types";

const ModalWindow: React.FC<ModalProps> = ({ active, setActive, children }) => {
  return (
    <div
      className={`w-screen h-screen bg-black/40 fixed top-0 left-0 flex items-center justify-center ${
        active ? "scale-100" : "scale-0"
      }`}
      onClick={() => setActive(false)}
    >
      <div className="p-5 rounded-2xl bg-white" onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};

export default ModalWindow;