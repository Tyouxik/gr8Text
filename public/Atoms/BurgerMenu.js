import React, { useState, useEffect, useRef } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import _ from "../../styles/burgermenu.module.scss";
import Link from "next/link";
import PropTypes from "prop-types";

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
  }, [showContent]);

  const linkList = links.map((link, index) => {
    if (link.type === "link") {
      return (
        <li data-test="burger-content-link" key={index}>
          <Link href={link.path}>{link.label}</Link>
        </li>
      );
    } else if (link.type === "button") {
      return (
        <li key={index} data-test="burger-content-button">
          <button onClick={link.action}>{link.label}</button>
        </li>
      );
    }
  });

  return (
    <div className={_.burger_menu} data-test="burger-menu-component">
      <button
        className={_.burger_btn}
        onClick={toggleBurger}
        data-test="burger-menu-button"
      >
        <GiHamburgerMenu />
      </button>
      {showContent && (
        <div className={_.burger_content} data-test="burger-menu-content">
          <ul>{linkList}</ul>
        </div>
      )}
    </div>
  );
}

BurgerMenu.propTypes = {
  links: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      action: PropTypes.func,
      path: PropTypes.string,
    })
  ),
};
