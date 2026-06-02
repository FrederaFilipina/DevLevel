import { Outlet, useNavigate } from "react-router"
import { useAuth } from "../../context/AuthContext"
import { BiSolidLogOut } from "react-icons/bi";


const HeaderLayout = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  console.log(user)

  const handleLogout = () => {
    logout()
    navigate("/")
  }

  return (
    <main>
    
    <header className="fixed top-0 w-full z-50 flex justify-between items-center px-margin-mobile h-16 border-b border-primary-container/30 bg-background/80 backdrop-blur-md shadow-[0_0_15px_rgba(0,243,255,0.2)]">
      <div className="flex items-center gap-2">
        <h1 className="font-headline-lg-mobile text-headline-lg-mobile font-black tracking-tighter text-primary-container drop-shadow-[0_0_8px_rgba(0,243,255,0.8)]">
          DEVLEVEL_OS
        </h1>
      </div>

      {user && (
        <div className="flex items-center gap-4">
          <span className="text-primary-container text-sm opacity-70">{user.name}</span>
          <button
            onClick={handleLogout}
            className="text-red-400 hover:text-secondary cursor-pointer transition-colors font-code-md uppercase tracking-widest flex items-center gap-1"
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
