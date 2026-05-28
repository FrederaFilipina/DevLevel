import { useState } from "react";
import { CustomInput } from "../CustomInput";

const LoginForm = ({ onRegisterClick }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegisterClick = (e) => {
    e.preventDefault();
    onRegisterClick();
  };

  return (
    <div className="space-y-3">
      {/* Neural Node Address Label */}
      <div>
        <label className="font-label-sm text-label-sm text-primary-container flex items-center justify-between">
          <span>EMAIL</span>
          <span className="text-[10px] opacity-40">REQUIRED</span>
        </label>

        {/* COLOCAR O EMAIL */}
        <CustomInput
            id={"email"}
            type={"email"}
            key={"email"}
            placeholder={"NODE_ADDRESS"}
            value={email}
            setValue={setEmail}
            required
            hasArrow={true}
        />

      </div>
      {/* Access Key Label */}
      <div>
        <label className="font-label-sm text-label-sm text-primary-container flex items-center justify-between">
          <span>PASSWORD</span>
          <span className="text-[10px] opacity-40">ENCRYPTED</span>
        </label>

        {/* COLOCAR A SENHA */}
        <CustomInput
            id={"password"}
            type={"password"}
            key={"password"}
            placeholder={"ACESS_KEY"}
            value={password}
            setValue={setPassword}
            required
            hasArrow={true}
        />

      </div>

      <div className="text-left mb-2">
        <button 
          onClick={handleRegisterClick}
          className="text-[12px] font-label-sm text-primary-container/80 hover:text-primary-container transition-colors uppercase tracking-widest cursor-pointer"
        >
          _NOT_REGISTERED_YET?
        </button>
      </div>

      <div className="pt-4">
        <button
          type="submit"
          className="w-full group relative overflow-hidden bg-primary-container cursor-pointer text-on-primary font-label-sm text-label-sm py-4 tracking-[0.2em] uppercase transition-all hover:scale-[1.02] active:scale-95 active:skew-x-2"
        >
          <span className="relative z-10">Initiate Linkage</span>

          {/* Glitch Hover Effect Overlay */}
          <div className="absolute inset-0 bg-secondary translate-x-full group-hover:translate-x-0 transition-transform duration-300 opacity-20" />
        </button>
      </div>
    </div>
  );
};

export default LoginForm;
