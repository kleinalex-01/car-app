import FuzzyText from "../Animations/NotFound"
import { Link } from "react-router-dom"

export const NotFound: React.FC = () => {
    return (
        <>
        <div className={`main-container container-fluid d-flex flex-column justify-content-center align-items-center vh-100`}>
            <FuzzyText
                baseIntensity={0.1}
                hoverIntensity={0.2}
                enableHover={true}
            >
                Page Not Found
            </FuzzyText>
            <Link to="/">
                <i className="bi bi-arrow-left"></i>
            </Link>
        </div>
        </>
    )
}