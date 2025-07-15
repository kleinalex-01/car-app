import React from "react";
import Carousel from "./Carousel";

export const HomePage: React.FC = () => {

    return (
        <>
            <Carousel 
                autoplay={true}
                pauseOnHover={true}
                loop={true}
                round={false}
            />
        </>
    )
}