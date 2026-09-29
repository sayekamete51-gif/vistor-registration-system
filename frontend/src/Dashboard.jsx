import { useEffect, useState } from "react";
import API from "../services/api";

function Dashboard() {

    const [visitorStats, setVisitorStats] = useState({});
    const [employeeStats, setEmployeeStats] = useState({});

    useEffect(() => {
        loadStats();
    }, []);

    const loadStats = async () => {
        try {

            const visitorResponse =
                await API.get("/visitors/stats");

            const employeeResponse =
                await API.get("/employees/stats");

            setVisitorStats(visitorResponse.data);
            setEmployeeStats(employeeResponse.data);

        } catch (error) {

            console.error(
                "Failed to load dashboard:",
                error
            );

        }
    };

    return (
        <div>

            <h1>Employee Visitor System</h1>

            <h2>Dashboard</h2>

            <hr />

            <h3>Employee Statistics</h3>

            <p>
                Total Employees:
                {" "}
                {employeeStats.totalEmployees || 0}
            </p>

            <p>
                Active Employees:
                {" "}
                {employeeStats.activeEmployees || 0}
            </p>

            <p>
                Inactive Employees:
                {" "}
                {employeeStats.inactiveEmployees || 0}
            </p>

            <hr />

            <h3>Visitor Statistics</h3>

            <p>
                Total Visitors:
                {" "}
                {visitorStats.totalVisitors || 0}
            </p>

            <p>
                Pending:
                {" "}
                {visitorStats.pending || 0}
            </p>

            <p>
                Approved:
                {" "}
                {visitorStats.approved || 0}
            </p>

            <p>
                Rejected:
                {" "}
                {visitorStats.rejected || 0}
            </p>

            <p>
                Completed:
                {" "}
                {visitorStats.completed || 0}
            </p>

        </div>
    );
}

export default Dashboard;