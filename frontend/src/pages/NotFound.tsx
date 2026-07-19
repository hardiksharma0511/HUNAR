import { Link } from "react-router-dom";
import { Button } from "../components/ui/Button";

const NotFound = () => (
  <div className="section-padding container-hunar text-center">
    <span className="font-script text-3xl text-saffron">Lost in the bazaar?</span>
    <h1 className="font-display text-5xl mt-2">404</h1>
    <p className="text-charcoal/60 mt-4">The page you're looking for doesn't exist.</p>
    <Link to="/"><Button className="mt-6">Back to Home</Button></Link>
  </div>
);

export default NotFound;
