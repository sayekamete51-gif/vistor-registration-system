import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function RegisterVisitor() {

    const navigate = useNavigate();

    const [employees, setEmployees] =
        useState([]);

    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        purpose: "",
        personToMeet: "",
        visitDate: ""
    });

    useEffect(() => {

        loadEmployees();

    }, []);

    const loadEmployees = async () => {

        try {

            const response =
                await API.get("/employees");

            setEmployees(response.data);

        } catch (error) {

            console.error(error);

        }

    };

    const handleChange = (e) => {

        setForm({
            ...form,
            [e.target.name]: e.target.value
        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            await API.post(
                "/visitors",
                form
            );

            alert(
                "Visitor registered successfully"
            );

            navigate("/visitors");

        } catch (error) {

            console.error(error);

            alert(
                error.response?.data?.message ||
                "Failed to register visitor"
            );

        }

    };

    return (
        <div>

            <h1>Register Visitor</h1>

            <form onSubmit={handleSubmit}>

                <div>
                    <label>
                        Visitor Name
                    </label>

                    <br />

                    <input
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        required
                    />
                </div>

                <br />

                <div>
                    <label>
                        Email
                    </label>

                    <br />

                    <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        required
                    />
                </div>

                <br />

                <div>
                    <label>
                        Phone
                    </label>

                    <br />

                    <input
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        required
                    />
                </div>

                <br />

                <div>
                    <label>
                        Purpose
                    </label>

                    <br />

                    <input
                        name="purpose"
                        value={form.purpose}
                        onChange={handleChange}
                        required
                    />
                </div>

                <br />

                <div>

                    <label>
                        Person To Meet
                    </label>

                    <br />

                    <select
                        name="personToMeet"
                        value={form.personToMeet}
                        onChange={handleChange}
                        required
                    >

                        <option value="">
                            Select Employee
                        </option>

                        {employees.map(
                            (employee) => (

                                <option
                                    key={employee._id}
                                    value={employee._id}
                                >
                                    {employee.name}
                                    {" - "}
                                    {employee.department}
                                </option>

                            )
                        )}

                    </select>

                </div>

                <br />

                <div>

                    <label>
                        Visit Date
                    </label>

                    <br />

                    <input
                        type="date"
                        name="visitDate"
                        value={form.visitDate}
                        onChange={handleChange}
                        required
                    />

                </div>

                <br />

                <button type="submit">
                    Register Visitor
                </button>

            </form>

        </div>
    );
}

export default RegisterVisitor;