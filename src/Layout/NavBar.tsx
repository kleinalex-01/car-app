import React, { useState } from "react";
import ScrambledText from "../Animations/ScrambledText";
import Magnet from "../Animations/ButtonMagnet"

export const NavBar: React.FC = () => {
    return (
        <>
        <div className="col-12 navbar px-5">
            <ScrambledText
                className="scrambled-text"
                radius={50}
                duration={1.2}
                speed={0.5}
                scrambleChars={".:"}
                >Search in database
            </ScrambledText>
            <Magnet
                padding={100}
                disabled={false}
                magnetStrength={10}
                className="magnet"><i className="bi bi-search"></i>
            </Magnet>
        </div>
        </>
    )
}