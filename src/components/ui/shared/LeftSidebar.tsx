import { useUserContext } from "@/context/AuthContext";
import { Link, NavLink } from "react-router-dom";
import { sidebarLinks } from "@/constants";
import { INavLink } from "@/types";

const LeftSidebar = () => {
  const userCtx = useUserContext();

  return (
    <nav className="leftsidebar">
      <div className="flex flex-col gap-11">
        <Link to="/" className="">
          <img
            src="/assets/images/logo.svg"
            alt="logo"
            width={170}
            height={36}
          />
        </Link>
        <Link
          to={`/profile/${userCtx.user.id}`}
          className="flex gap-3 items-center"
        >
          <img
            src={
              userCtx.user.imageUrl || "/assets/icons/profile-placeholder.svg"
            }
            alt="profile"
            className="h-14 w-14 rounded-full"
          />
          <div className="flex flex-col">
            <p className="body-bold">{userCtx.user.name}</p>
            <p className="small-regular">@${userCtx.user.username}</p>
          </div>
        </Link>
        <ul className="flex flex-col">
          {sidebarLinks.map((link: INavLink) => {
            return (
              <li key={link.label} className="leftsidebar-link">
                <NavLink
                  to={link.route}
                  className="flex gap-4 items-center p-4"
                >
                  <img
                    src={link.imageURL}
                    alt={link.label}
                    className="group-hover:invert-white"
                  />
                  {link.label}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
};

export default LeftSidebar;
