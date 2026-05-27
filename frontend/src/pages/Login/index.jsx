import LoginForm from "../../components/LoginForm";

function Login() {
  return (
    <main className="flex flex-col w-full min-h-screen bg-background items-center justify-center">
      {/* Background Hologram (Fundo Holográfico) */}
      <div className="fixed inset-0 z-0 flex items-center justify-center opacity-70">
        <div className="relative w-[800px] h-[800px] rounded-full border border-primary-container/80 flex items-center justify-center iris-glow">
          <div className="w-[600px] h-[600px] rounded-full border border-primary-container/60 flex items-center justify-center">
            <div className="w-[400px] h-[400px] rounded-full border-[20px] border-secondary/420 flex items-center justify-center">
              <div className="w-[200px] h-[200px] rounded-full bg-gradient-to-tr from-primary-container/50 to-secondary/20 blur-2xl"></div>
            </div>
          </div>

          {/* Decorative Orbitals */}
          <div className="absolute inset-0 border border-dashed border-primary-container rounded-full animate-[spin_60s_linear_infinite]"></div>
          <div className="absolute inset-[10%] border-2 border-secondary/20 rounded-full animate-[spin_40s_linear_infinite_reverse]"></div>
        </div>
      </div>

      {/* Scanline Layer */}
      <div className="fixed inset-0 z-10 pointer-events-none overflow-hidden">
        <div className="scanline-effect"></div>
      </div>

      {/* Calibration Interface Box */}
      <div className="bg-surface-container-low/80 backdrop-blur-xl border border-primary-container/20 p-8 glitch-border relative sm:w-80 w-[90%]">
        {/* Decorative Corner Accents */}
        <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-primary-container"></div>
        <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-primary-container"></div>

        {/* O conteúdo do seu formulário ou interface de cadastro entra aqui */}
        <div className="text-center text-code-md text-primary-container">
          <LoginForm/>
        </div>
      </div>
    </main>
  );
}

export default Login;
