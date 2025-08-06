import { IoMdHome, IoMdMusicalNote, IoMdSearch } from "react-icons/io";
import { Link } from "react-router";

const item = [
    {logo: <IoMdHome />, name: "Home", path: "/"},
    {logo: <IoMdSearch />, name: "Search", path: "/search"},
    {logo: <IoMdMusicalNote />, name: "Library", path: "/all-songs"},
]

const Footer = () => {
  return (
    <div className="h-20 bg-gray-700 fixed bottom-0 flex justify-evenly items-center w-full">
      {item.map((i, key) => (
        <div key={key} className=" text-white ">
         
          <Link to={i.path} className="text-sm flex flex-col items-center gap-1"> <span className="text-2xl ">{i.logo}</span>{i.name}</Link>
        </div>
      ))}
    </div>
  );
};

export default Footer;
