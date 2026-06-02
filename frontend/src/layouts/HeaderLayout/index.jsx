import { Outlet, useNavigate } from "react-router"
import { useAuth } from "../../context/AuthContext"
import { BiSolidLogOut, BiSun, BiMoon } from "react-icons/bi";
import { useState, useEffect } from "react";


const HeaderLayout = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [isLight, setIsLight] = useState(localStorage.getItem('theme') === 'light');

  useEffect(() => {
    if (isLight) {
        document.body.classList.add('light');
        localStorage.setItem('theme', 'light');
    } else {
        document.body.classList.remove('light');
        localStorage.setItem('theme', 'dark');
    }
  }, [isLight]);

  const handleLogout = () => {
    logout()
    navigate("/")
  }

  return (
    <main>
    
    <header className="fixed top-0 w-full z-50 flex justify-between items-center px-margin-mobile h-16 border-b border-primary-container/30 bg-background/80 backdrop-blur-md shadow-[0_0_15px_rgba(0,243,255,0.2)]">
      <div className="flex items-center gap-4">
        <h1 className="font-headline-lg-mobile text-headline-lg-mobile font-black tracking-tighter text-primary-container drop-shadow-[0_0_8px_rgba(0,243,255,0.8)]">
          DEVLEVEL_OS
        </h1>
        
        {/* Theme Toggle Button */}
        <button 
            onClick={() => setIsLight(!isLight)}
            className="p-2 border border-primary/20 bg-surface-container-low hover:bg-surface-container transition-colors group relative overflow-hidden"
            title={isLight ? "Ativar Modo Noturno" : "Ativar Modo de Alta Luminosidade"}
        >
            <div className="relative z-10 flex items-center justify-center cursor-pointer text-primary">
                {isLight ? <BiMoon size={20}/> : <BiSun size={20}/>}
            </div>
            <div className="absolute inset-0 bg-primary/10 -translate-x-full group-hover:translate-x-0 transition-transform"></div>
        </button>
      </div>

      {user && (
        <div className="flex items-center gap-4">
          <span className="text-primary-container text-sm opacity-70 hidden sm:inline">{user.name}</span>
          <button
            onClick={handleLogout}
            className="text-tertiary hover:text-secondary cursor-pointer transition-colors font-code-md uppercase tracking-widest flex items-center gap-1"
          >
            <BiSolidLogOut size={24}/>LOGOUT
          </button>
        </div>
      )}
    </header>

    <section>
        <Outlet />
    </section>
    </main>
  );
};

export default HeaderLayout;

