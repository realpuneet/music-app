import { IoMdHome, IoMdMusicalNote, IoMdSearch } from "react-icons/io";
import { Link } from "react-router";

const item = [
    {logo: <IoMdHome />, name: "Home", path: "/"},
    {logo: <IoMdSearch />, name: "Search", path: "/search"},
    {logo: <IoMdMusicalNote />, name: "Library", path: "/upload"},
]

const Footer = () => {
  return (
    <div className="h-20 bg-white absolute bottom-0 flex justify-evenly items-center w-full">
      {item.map((i, key) => (
        <div key={key} className="text-2xl flex flex-col items-center gap-1">
          {i.logo}
          <Link to={i.path} className="text-sm">{i.name}</Link>
        </div>
      ))}
    </div>
  );
};

export default Footer;
