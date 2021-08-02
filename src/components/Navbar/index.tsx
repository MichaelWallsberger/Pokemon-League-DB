import React from "react";
import Link from "next/link";
import classNames from "classnames";
import { useRouter } from "next/router";

interface NavigationProps {
  navbarOutwards: boolean;
  setNavbarOutwards: React.Dispatch<React.SetStateAction<boolean>>;
}

const links = [
  { text: "Participants", location: "/participants", icon: "account_circle" },
  { text: "Divisions", location: "/divisions", icon: "table_chart" },
  { text: "Matches", location: "/matches", icon: "sports_esports" },
  { text: "Rules", location: "/rulesets", icon: "event_note" },
  { text: "Rerolls", location: "/pokererolls", icon: "casino" },
  // {
  //   text: "Generator",
  //   location: "/random_pokemon_generator",
  //   sprite: "000.png",
  //   alt: "generate random Pokemons",
  // },
  // { text: "Test Page", location: "/test", icon: "bug_report" },
  // { text: "Edit", location: "/edit", icon: "edit" },
];

export const Navigation: React.FC<NavigationProps> = ({ navbarOutwards, setNavbarOutwards }) => {
  const router = useRouter();

  return (
    <div
      className={
        "navbar-container w-full sm:w-12 md:hover:w-40 transition-all duration-200 ease-linear" +
        (navbarOutwards ? " navbar-container-maximum" : "")
      }
      style={navbarOutwards ? { width: "10rem" } : {}}
    >
      <div className="navbar-btn-expand-div">
        {navbarOutwards ? (
          <span
            className="material-icons navbar-pin navbar-pin-float"
            onClick={() => setNavbarOutwards(false)}
          >
            push_pin
          </span>
        ) : (
          <span
            className="invisible md:visible material-icons navbar-pin navbar-pin-stick"
            onClick={() => setNavbarOutwards(true)}
          >
            push_pin
          </span>
        )}
      </div>

      <ul className="navbar-ul">
        {links.map((link) => {
          return (
            <li key={link.text} className="navbar-li">
              <Link href={`${link.location}`}>
                <a
                  className={classNames(
                    router.pathname == link.location ? "navbar-link-active" : "",
                    "navbar-item"
                  )}
                >
                  {/* icon */}
                  {link?.icon ? <span className="material-icons nav-icon">{link.icon}</span> : ""}

                  {/* sprite */}
                  {/* {link?.sprite ? (
                    <img
                      className="nav-icon nav-icon-image"
                      src={link.sprite}
                      alt={`${link.alt}`}
                    />
                  ) : (
                    ""
                  )} */}

                  <p className="whitespace-nowrap hidden md:block">{link.text}</p>
                </a>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
