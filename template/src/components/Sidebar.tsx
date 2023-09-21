import { INavLink, INavLinkGroup, INavStyles, Nav } from "@fluentui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { clearMessageAtom } from "../atoms/messageBarAtoms";
import { useSetAtom } from "jotai";

const Sidebar = () => {
  const navigate = useNavigate();

  const [activeNav, setActiveNav] = useState("home");
  const [navExpanded, setNavExpanded] = useState(true);
  const [expandedNav, setExpandedNav] = useState("");

  const clearMessage = useSetAtom(clearMessageAtom);

  const navStyles: Partial<INavStyles> = {
    root: {
      width: navExpanded ? 180 : 42,
      boxSizing: "border-box",
      border: "1px solid #eee",
      overflowY: "auto",
      backgroundImage: "linear-gradient(to right, #FFFFFF, #FAFAFA)",
    },
    link: {
      height: 42,
      paddingLeft: navExpanded ? undefined : 5,
    },
    linkText: {
      display: navExpanded ? "block" : "none",
    },
  };

  const navLinks: INavLinkGroup[] = [
    {
      links: [
        {
          name: "",
          url: "",
          icon: navExpanded ? "DoubleChevronLeft8" : "DoubleChevronRight8",
          onClick: () => {
            if (navExpanded) {
              setNavExpanded(false);
            } else {
              setNavExpanded(true);
            }
          },
        },
        {
          name: "Home",
          url: "/",
          expandAriaLabel: "Home",
          collapseAriaLabel: "Home",
          iconProps: {
            iconName: "Home",
            styles: { root: { color: "green" } },
          },
        },
        {
          name: "Samples",
          key: "samples",
          url: "/samples",
          expandAriaLabel: "Samples",
          collapseAriaLabel: "Samples",
          isExpanded: expandedNav === "samples",
          links: [
            {
              name: "Items",
              url: "/items",
              iconProps: {
                iconName: "CubeShape",
                styles: { root: { color: "goldenRod" } },
              },
            },
          ],
        },
      ],
    },
  ];

  return (
    <Nav
      onLinkClick={(e, link) => {
        e?.preventDefault();
        clearMessage();
        setActiveNav(link?.key ?? "");
        if (link?.url) {
          navigate(link?.url);
        }
      }}
      ariaLabel="Nav"
      styles={navStyles}
      groups={navLinks}
      onLinkExpandClick={(_, item?: INavLink) => {
        setExpandedNav(item?.key ?? "");
      }}
    />
  );
};
export default Sidebar;
