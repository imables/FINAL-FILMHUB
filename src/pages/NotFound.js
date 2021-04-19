import { Link } from "react-router-dom"

/**
 * Handles 404 errors
 *
 * @author Owen Lambert
 */

const NotFound = () => {
    return (
        <div className="not-found">
            <h2>Sorry</h2>
            <p>That page cannot be found.</p>
            <Link to="/">Back to the homepage</Link>
        </div>
    );
}
 
export default NotFound;