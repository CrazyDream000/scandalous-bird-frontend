import { Link } from "react-router-dom";
import { ConnectButton } from "@rainbow-me/rainbowkit";

const Header = () => {
  return (
    <div className="w-full flex justify-between items-center h-20 bg-orange-500 px-10 lg:px-20 py-5">
      <div className="text-white flex gap-4">
        <Link className="hover:text-gray-300 text-xl retro flex items-center gap-2" to="/">
          <img alt="logo" src="/images/logo.png" className="w-10 h-10"></img>
          <div className="hidden sm:block">Scandalous birds</div>
        </Link>
      </div>
     <ConnectButton></ConnectButton>
    </div>
  );
};

export default Header;
