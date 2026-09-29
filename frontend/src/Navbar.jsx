import { Link } from "react-router-dom";

function Navbar() {

    return (
        <nav>

            <h2>
                Employee Visitor System
            </h2>

            <Link to="/">
                Dashboard
            </Link>

            {" | "}

            <Link to="/employees">
                Employees
            </Link>

            {" | "}

            <Link to="/employees/add">
                Add Employee
            </Link>

            {" | "}

            <Link to="/visitors">
                Visitors
            </Link>

            {" | "}

            <Link to="/visitors/register">
                Register Visitor
            </Link>

        </nav>
    );
}

export default Navbar;