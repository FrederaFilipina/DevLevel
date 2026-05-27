import { CustomInput } from "../CustomInput";

const LoginForm = () => {
  return (
    <div className="space-y-6">
      {/* Agrupador dos campos */}
      {/* Operator ID Label */}
      <div>
        <label className="font-label-sm text-label-sm text-primary-container flex items-center justify-between">
          <span>NAME</span>
          <span className="text-[10px] opacity-40">REQUIRED</span>
        </label>

        {/* COLOCAR O NOME/ID */}
        <CustomInput
            id={"name"}
            type={"text"}
            key={"name"}
            placeholder={"OPERATOR_ID"}
            required
            hasArrow={true}
        />

      </div>
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
            required
            hasArrow={true}
        />

      </div>
      <div className="pt-4">
        <button
          type="submit"
          className="w-full group relative overflow-hidden bg-primary-container text-on-primary font-label-sm text-label-sm py-4 tracking-[0.2em] uppercase transition-all hover:scale-[1.02] active:scale-95 active:skew-x-2 flicker-hover"
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
