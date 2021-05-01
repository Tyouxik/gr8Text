import { isLocalURL } from "next/dist/next-server/lib/router/router";
import React, { useState, useEffect, useRef } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import _ from "../../styles/burgermenu.module.scss";
import Link from "next/link";

export default function BurgerMenu({ links }) {
  const [showContent, setShowContent] = useState(false);

  const toggleBurger = () => {
    setShowContent(!showContent);
  };

  useEffect(() => {
    function handler() {
      if (showContent) {
        setShowContent(false);
      }
    }
    window.addEventListener("click", handler);
    return () => window.removeEventListener("click", handler);
  }, []);

  const linkList = links.map((link) => {
    if (link.type === "link") {
      return (
        <li>
          <Link href={link.path}>{link.label}</Link>
        </li>
      );
    } else if (link.type === "button") {
      return (
        <li>
          <button onClick={link.action}>{link.label}</button>
        </li>
      );
    }
  });

  return (
    <div className={_.burger_menu}>
      <button className={_.burger_btn} onClick={toggleBurger}>
        <GiHamburgerMenu />
      </button>
      {showContent && (
        <div className={_.burger_content}>
          <ul>{linkList}</ul>
        </div>
      )}
    </div>
  );
}
