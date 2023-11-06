import { bottombarLinks } from "@/constants";
import { INavLink } from "@/types";
import { Link, useLocation } from "react-router-dom";

const Bottombar = () => {
  const { pathname } = useLocation();
  return (
    <section className="bottom-bar">
      {bottombarLinks.map((link: INavLink) => {
        const isActive = pathname === link.route;
        return (
          <Link
            to={link.route}
            key={link.label}
            className={`flex-center flex-col gap-1 p-2 transition ${
              isActive && "bg-primary-500 rounded-[10px]"
            }`}
          >
            <img
              src={link.imageURL}
              alt={link.label}
              width={16}
              height={16}
              className={`${isActive} && invert-white`}
            />
            <p className="tiny-medium text-light-2">{link.label}</p>
          </Link>
        );
      })}
    </section>
  );
};

export default Bottombar;
