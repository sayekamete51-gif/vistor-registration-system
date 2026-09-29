import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";

import Navbar from "./components/Navbar";

import Dashboard from "./pages/Dashboard";
import Employees from "./pages/Employees";
import AddEmployee from "./pages/AddEmployee";
import Visitors from "./pages/Visitors";
import RegisterVisitor from "./pages/RegisterVisitor";

function App() {
    return (
        <BrowserRouter>

            <Navbar />

            <Routes>

                <Route
                    path="/"
                    element={<Dashboard />}
                />

                <Route
                    path="/employees"
                    element={<Employees />}
                />

                <Route
                    path="/employees/add"
                    element={<AddEmployee />}
                />

                <Route
                    path="/visitors"
                    element={<Visitors />}
                />

                <Route
                    path="/visitors/register"
                    element={<RegisterVisitor />}
                />

            </Routes>

        </BrowserRouter>
    );
}

export default App;