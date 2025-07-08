import React, { useState, useEffect, useRef } from "react";
import ScrambledText from "../Animations/ScrambledText";
import Magnet from "../Animations/ButtonMagnet";
import styles from "./NavBar.module.css";

export const NavBar: React.FC = () => {
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (isSearchActive && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isSearchActive]);

  return (
    <div className={`col-12 ${styles.navbarCustom}`}>
      <div className={styles.searchWrapper}>
        <input
          ref={inputRef}
          type="text"
          className={styles.input}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onFocus={() => setIsSearchActive(true)}
          onBlur={() => !inputValue && setIsSearchActive(false)}
        />
        
        {!isSearchActive && inputValue === "" && (
          <div className={styles.placeholderOverlay}>
            <ScrambledText
              radius={0}
              duration={1.2}
              speed={0.5}
              scrambleChars=".:"
              playOnMount={true}
            >
              Search in database
            </ScrambledText>
          </div>
        )}
      </div>

      <Magnet
        padding={100}
        disabled={false}
        magnetStrength={10}
        className={styles.magnet}
      >
        <button
          onClick={() => {
            setIsSearchActive((prev) => !prev);
            if (!isSearchActive && inputRef.current) {
              inputRef.current.focus();
            }
          }}
          className={styles.searchButton}
        >
          <i className={`bi bi-search ${styles.searchIcon}`}></i>
        </button>
      </Magnet>
    </div>
  );
};
