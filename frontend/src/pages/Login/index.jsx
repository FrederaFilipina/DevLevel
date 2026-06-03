import { useState } from "react";
import LoginForm from "../../components/LoginForm";
import RegisterModal from "../../components/RegisterModal";

function Login() {
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isGlitching, setIsGlitching] = useState(false);

  const triggerRegister = () => {
    setIsGlitching(true);
    setTimeout(() => {
      setIsGlitching(false);
      setIsRegisterModalOpen(true);
    }, 400); // Glitch duration
  };

  return (
    <main className="flex flex-col w-full min-h-screen bg-background items-center justify-center relative overflow-hidden">
      {/* Full Screen Glitch Overlay */}
      {isGlitching && <div className="glitch-overlay" />}

      {/* Background Hologram (Fundo Holográfico) */}
      <div className={`fixed inset-0 z-0 flex items-center justify-center opacity-70 transition-opacity duration-500 gpu-accelerated ${isGlitching ? 'opacity-30' : 'opacity-70'}`}>
        <div className="relative w-[800px] h-[800px] rounded-full border border-primary-container/80 flex items-center justify-center iris-glow">
          <div className="w-[600px] h-[600px] rounded-full border border-primary-container/60 flex items-center justify-center">
            <div className="w-[400px] h-[400px] rounded-full border-[20px] border-secondary/420 flex items-center justify-center">
              <div className="w-[200px] h-[200px] rounded-full bg-gradient-to-tr from-primary-container/30 to-secondary/10"></div>
            </div>
          </div>

          {/* Decorative Orbitals */}
          <div className="absolute inset-0 border border-dashed border-primary-container rounded-full animate-[spin_120s_linear_infinite] gpu-accelerated"></div>
          <div className="absolute inset-[10%] border-2 border-secondary/20 rounded-full animate-[spin_80s_linear_infinite_reverse] gpu-accelerated"></div>
        </div>
      </div>

      {/* Scanline Layer */}
      <div className="fixed inset-0 z-10 pointer-events-none overflow-hidden gpu-accelerated">
        <div className="scanline-effect opacity-50"></div>
      </div>

      {/* Calibration Interface Box */}
      <div className="bg-surface-container-low border border-primary-container/20 p-8 glitch-border relative sm:w-80 w-[90%] z-20 animate-drop-in">
        {/* Decorative Corner Accents */}
        <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-primary-container"></div>
        <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-primary-container"></div>

        {/* O conteúdo do seu formulário ou interface de cadastro entra aqui */}
        <div className="text-center text-code-md text-primary-container">
          <LoginForm onRegisterClick={triggerRegister} />
        </div>
      </div>

      <RegisterModal 
        isOpen={isRegisterModalOpen} 
        onClose={() => setIsRegisterModalOpen(false)} 
      />
    </main>
  );
}

export default Login;
