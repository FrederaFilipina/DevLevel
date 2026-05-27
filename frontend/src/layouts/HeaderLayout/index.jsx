import { Outlet } from "react-router"

const HeaderLayout = () => {
  return (
    <main>
    <header class="fixed top-0 w-full z-50 flex justify-between items-center px-margin-mobile h-16 border-b border-primary-container/30 bg-background/80 backdrop-blur-md shadow-[0_0_15px_rgba(0,243,255,0.2)]">
      <div class="flex items-center gap-2">
        <h1 class="font-headline-lg-mobile text-headline-lg-mobile font-black tracking-tighter text-primary-container drop-shadow-[0_0_8px_rgba(0,243,255,0.8)]">
          DEVLEVEL_OS
        </h1>
      </div>
    </header>

    <section>
        <Outlet />
    </section>
    </main>
  );
};

export default HeaderLayout;
