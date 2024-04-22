//Libraries
import { Link } from "react-router-dom";

//Images
import { Logo } from "../components";
import mainImage from "../assets/images/main.svg";

//Wrapper
import Wrapper from "../assets/wrappers/LandingPage";

function Landing() {
    return (
        <Wrapper>
            <nav>
                <Logo />
            </nav>
            <div className="container page">
                {/* Info */}
                <div className="info">
                    <h1>
                        Job <span>Tracking</span> app
                    </h1>
                    <p>
                        I'm baby wayfarers hoodie next level taiyaki brooklyn
                        cliche blue bottle single-origin coffee chia. Aesthetic
                        post-ironic venmo, quinoa lo-fi tote bag adaptogen
                        everyday carry meggings +1 brunch narwhal.
                    </p>
                    <Link to="/register" className="btn register-link">
                        Register
                    </Link>
                    <Link to="/login" className="btn">
                        Login / Demo User
                    </Link>
                </div>

                {/* Media */}
                <img src={mainImage} alt="Job hunt" className="img main-img" />
            </div>
        </Wrapper>
    );
}

export default Landing;
