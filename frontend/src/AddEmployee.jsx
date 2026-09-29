import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function AddEmployee() {

    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        department: "",
        designation: "",
        employeeId: "",
        status: "Active"
    });

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
                "/employees",
                form
            );

            alert(
                "Employee created successfully"
            );

            navigate("/employees");

        } catch (error) {

            console.error(error);

            alert(
                error.response?.data?.message ||
                "Failed to create employee"
            );

        }

    };

    return (
        <div>

            <h1>Add Employee</h1>

            <form onSubmit={handleSubmit}>

                <div>
                    <label>Name</label>
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
                    <label>Email</label>
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
                    <label>Phone</label>
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
                    <label>Department</label>
                    <br />

                    <input
                        name="department"
                        value={form.department}
                        onChange={handleChange}
                        required
                    />
                </div>

                <br />

                <div>
                    <label>Designation</label>
                    <br />

                    <input
                        name="designation"
                        value={form.designation}
                        onChange={handleChange}
                        required
                    />
                </div>

                <br />

                <div>
                    <label>Employee ID</label>
                    <br />

                    <input
                        name="employeeId"
                        value={form.employeeId}
                        onChange={handleChange}
                        required
                    />
                </div>

                <br />

                <div>
                    <label>Status</label>
                    <br />

                    <select
                        name="status"
                        value={form.status}
                        onChange={handleChange}
                    >
                        <option value="Active">
                            Active
                        </option>

                        <option value="Inactive">
                            Inactive
                        </option>
                    </select>
                </div>

                <br />

                <button type="submit">
                    Add Employee
                </button>

            </form>

        </div>
    );
}

export default AddEmployee;