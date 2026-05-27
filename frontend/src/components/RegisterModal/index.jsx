import { useState } from "react";
import { CustomInput } from "../CustomInput";

const RegisterModal = ({ isOpen, onClose }) => {
  const [isClosing, setIsClosing] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      onClose();
    }, 600); // Duration matches animation (slightly shorter to feel snappier)
  };

  if (!isOpen && !isClosing) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className={`absolute inset-0 bg-background/90 transition-opacity duration-100 ${isClosing ? 'opacity-0' : 'opacity-100'}`}
        onClick={handleClose}
      />

      {/* Modal Content - Essential Cyberpunk Style */}
      <div className={`bg-surface-container-low border border-primary-container/40 p-8 glitch-border relative sm:w-96 w-full max-w-md z-10 gpu-accelerated ${isClosing ? 'animate-slow-fade-out' : 'animate-slow-fade-in'}`}>
        {/* Decorative Corner Accents */}
        <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-primary-container"></div>
        <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-primary-container"></div>

        {/* Close Button */}
        <button 
          onClick={handleClose}
          className="absolute top-2 right-2 text-primary-container hover:text-secondary cursor-pointer transition-colors font-code-md"
        >
          [X]
        </button>


        <h2 className="text-code-md text-primary-container mb-4 mt-2 text-center tracking-[0.2em] uppercase">
          New Operator Registration
        </h2>

        <div className="space-y-3">
          {/* Name Field */}
          <div>
            <label className="font-label-sm text-label-sm text-primary-container flex items-center justify-between">
              <span>NAME</span>
              <span className="text-[10px] opacity-40">REQUIRED</span>
            </label>
            <CustomInput
              id={"reg-name"}
              type={"text"}
              placeholder={"OPERATOR_ID"}
              value={name}
              setValue={setName}
              required
              hasArrow={true}
            />
          </div>

          {/* Email Field */}
          <div>
            <label className="font-label-sm text-label-sm text-primary-container flex items-center justify-between">
              <span>EMAIL</span>
              <span className="text-[10px] opacity-40">REQUIRED</span>
            </label>
            <CustomInput
              id={"reg-email"}
              type={"email"}
              placeholder={"NODE_ADDRESS"}
              value={email}
              setValue={setEmail}
              required
              hasArrow={true}
            />
          </div>

          {/* Password Field */}
          <div>
            <label className="font-label-sm text-label-sm text-primary-container flex items-center justify-between">
              <span>PASSWORD</span>
              <span className="text-[10px] opacity-40">ENCRYPTED</span>
            </label>
            <CustomInput
              id={"reg-password"}
              type={"password"}
              placeholder={"ACCESS_KEY"}
              value={password}
              setValue={setPassword}
              required
              hasArrow={true}
            />
          </div>

          <div className="pt-4">
            <button
              type="submit"
              className="w-full group relative overflow-hidden bg-primary-container text-on-primary font-label-sm text-label-sm py-4 tracking-[0.2em] uppercase transition-all hover:scale-[1.02] active:scale-95 active:skew-x-2 flicker-hover"
            >
              <span className="relative z-10">Authorize Access</span>
              <div className="absolute inset-0 bg-secondary translate-x-full group-hover:translate-x-0 transition-transform duration-300 opacity-20" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterModal;
