import { useEffect, useState } from "react";
import API from "../services/api";

function Visitors() {

    const [visitors, setVisitors] = useState([]);

    const [search, setSearch] = useState("");

    const [status, setStatus] = useState("");

    useEffect(() => {

        loadVisitors();

    }, [search, status]);

    const loadVisitors = async () => {

        try {

            const response = await API.get(
                "/visitors",
                {
                    params: {
                        search,
                        status
                    }
                }
            );

            setVisitors(response.data);

        } catch (error) {

            console.error(error);

        }

    };

    const updateStatus = async (
        id,
        newStatus
    ) => {

        try {

            await API.patch(
                `/visitors/${id}/status`,
                {
                    status: newStatus
                }
            );

            loadVisitors();

        } catch (error) {

            console.error(error);

        }

    };

    const deleteVisitor = async (id) => {

        const confirmed = window.confirm(
            "Delete this visitor?"
        );

        if (!confirmed) return;

        try {

            await API.delete(
                `/visitors/${id}`
            );

            loadVisitors();

        } catch (error) {

            console.error(error);

        }

    };

    return (
        <div>

            <h1>Visitors</h1>

            <input
                placeholder="Search visitor..."
                value={search}
                onChange={(e) =>
                    setSearch(e.target.value)
                }
            />

            {" "}

            <select
                value={status}
                onChange={(e) =>
                    setStatus(e.target.value)
                }
            >

                <option value="">
                    All Status
                </option>

                <option value="Pending">
                    Pending
                </option>

                <option value="Approved">
                    Approved
                </option>

                <option value="Rejected">
                    Rejected
                </option>

                <option value="Completed">
                    Completed
                </option>

            </select>

            <br />
            <br />

            <table border="1">

                <thead>

                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Purpose</th>
                        <th>Person To Meet</th>
                        <th>Date</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>

                </thead>

                <tbody>

                    {visitors.map((visitor) => (

                        <tr key={visitor._id}>

                            <td>
                                {visitor.name}
                            </td>

                            <td>
                                {visitor.email}
                            </td>

                            <td>
                                {visitor.phone}
                            </td>

                            <td>
                                {visitor.purpose}
                            </td>

                            <td>
                                {visitor.personToMeet?.name ||
                                    "N/A"}
                            </td>

                            <td>
                                {new Date(
                                    visitor.visitDate
                                ).toLocaleDateString()}
                            </td>

                            <td>

                                <select
                                    value={visitor.status}
                                    onChange={(e) =>
                                        updateStatus(
                                            visitor._id,
                                            e.target.value
                                        )
                                    }
                                >

                                    <option value="Pending">
                                        Pending
                                    </option>

                                    <option value="Approved">
                                        Approved
                                    </option>

                                    <option value="Rejected">
                                        Rejected
                                    </option>

                                    <option value="Completed">
                                        Completed
                                    </option>

                                </select>

                            </td>

                            <td>

                                <button
                                    onClick={() =>
                                        deleteVisitor(
                                            visitor._id
                                        )
                                    }
                                >
                                    Delete
                                </button>

                            </td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>
    );
}

export default Visitors;