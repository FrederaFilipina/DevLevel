import { useEffect, useState } from "react";
import { CustomInput } from "../CustomInput";
import axios from "axios"
import { useAuth } from "../../context/AuthContext";
import { Navigate, useNavigate } from "react-router";
import {toast} from "react-toastify"

const LoginForm = ({ onRegisterClick }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {login, user} = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (user) navigate("/dashboard");
  }, [user, navigate]);

  const handleRegisterClick = (e) => {
    e.preventDefault();
    onRegisterClick();
  };

  const limparInputs = () => {
    setEmail("")
    setPassword("")
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
       const response = await axios.post("http://localhost:3000/login", {
        email,
        senha: password
       })

       const tokenAcesso = response.data.data.tokenRefresh
       const tokenRefresh = response.data.data.tokenAcesso

       if(response?.data) {
        login(email, tokenAcesso, tokenRefresh)
        localStorage.setItem("tokenAcesso", tokenAcesso)
        localStorage.setItem("tokenRefresh", tokenRefresh)
        toast.success("Acesso garantido!", {
          progress: true,
          autoClose: 2000,
          position: "top-right",
          pauseOnHover: false
        })
        limparInputs()
        setTimeout(() => navigate("/dashboard"), 2000);
      }
    } catch (error) {
      console.log(error)
      const errorMsg = error?.response?.data?.message || "FALHA_NA_AUTENTICACAO"
      toast.error(`Acesso negado: ${errorMsg}`, {
        position: "top-right",
        autoClose: 3000,
        pauseOnHover: false
      })
    }
  }

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
            hasArrow
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
            hasArrow
        />

      </div>

      <div className="text-left mb-2">
        <button 
          onClick={handleRegisterClick}
          className="text-[12px] font-label-sm text-primary-container/80 hover:text-primary-container transition-colors uppercase tracking-widest cursor-pointer"
        >
          NÃO_POSSUI_CADASTRO_?
        </button>
      </div>

      <div className="pt-4">
        <button
          type="submit"
          onClick={handleLogin}
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
