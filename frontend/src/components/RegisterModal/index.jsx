import { useState } from "react";
import { CustomInput } from "../CustomInput";
import axios from "axios"
import { toast } from "react-toastify"

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
    }, 600);
  };

  const registrar = async(e) => {
    e.preventDefault()
    try {
      const response = await axios.post("http://localhost:3000/cadastro", {
        nome: name, 
        email,
        senha: password
      })
      if(response?.data) {
        toast.success("Operador registrado com sucesso!", {
          position: "top-right",
        })
        limparInputs()
        setTimeout(() => handleClose(), 2000);
      }
    } catch (error) {
      console.log(error.response)
      const errorMsg = error?.response?.data?.message || "ERRO_NO_REGISTRO"
      toast.error(`Registro falhou: ${errorMsg}`, {
        position: "top-right",
      })      
    }
  }

  function limparInputs() {
    setEmail("")
    setName("")
    setPassword("")
  }

  if (!isOpen && !isClosing) return null;

  return (
    <form onSubmit={registrar} className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className={`absolute inset-0 bg-background/90 transition-opacity duration-100 ${isClosing ? "opacity-0" : "opacity-100"}`}
        onClick={handleClose}
      />

      {/* Modal Content - Essential Cyberpunk Style */}
      <div className={`bg-surface-container-low border border-primary/20 p-8 glitch-border relative sm:w-96 w-full max-w-md z-10 gpu-accelerated ${isClosing ? "animate-slow-fade-out" : "animate-slow-fade-in"}`}>
        {/* Decorative Corner Accents */}
        <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-primary"></div>
        <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-primary"></div>

        <div className="flex justify-between items-start mb-6 border-b border-primary/10 pb-4 relative">
            <div className="flex flex-col">
                <span className="text-[8px] text-primary/40 font-code-md tracking-[0.3em] mb-1">NOVO_OPERADOR</span>
                <h2 className="text-xl font-black text-primary uppercase tracking-tighter italic leading-none">
                    REGISTRO
                </h2>
            </div>
            <button 
                onClick={handleClose}
                className="text-primary/30 hover:text-secondary transition-all font-code-md text-[10px] cursor-pointer border border-primary/10 px-2 py-1 bg-primary/5 hover:bg-secondary/10 hover:border-secondary/30"
            >
                [ FECHAR ]
            </button>
            <div className="absolute -bottom-[1px] left-0 w-12 h-[2px] bg-secondary shadow-[0_0_10px_rgba(0,243,255,0.8)]"></div>
        </div>

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
              className="w-full group relative overflow-hidden bg-primary-container text-on-primary font-label-sm text-label-sm py-4 tracking-[0.2em] uppercase transition-all hover:scale-[1.02] active:scale-95 active:skew-x-2"
            >
              <span className="relative z-10">Authorize Access</span>
              <div className="absolute inset-0 bg-secondary translate-x-full group-hover:translate-x-0 transition-transform duration-300 opacity-20" />
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default RegisterModal;
