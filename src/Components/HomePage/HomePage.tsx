import React from "react";
import Carousel from "./Carousel";

export const HomePage: React.FC = () => {

    return (
        <>
            <Carousel 
                baseWidth={400}
                autoplay={true}
                autoplayDelay={3000}
                pauseOnHover={true}
                loop={true}
                round={false}
            />
        </>
    )
}