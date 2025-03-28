import React from "react";
import { Form, Input, Select, Button, Spin, Alert } from "antd";
import useEditUser from "../../../hooks/Users/useEditUser";

const { Option } = Select;

const EditUserForm = ({ userId }) => {
	const {
		loading,
		roleList,
		prodiList,
		alert,
		errors,
		formData,
		handleChangeForm,
		handleSubmit,
	} = useEditUser(userId);

	return (
		<div className="w-full ml-3 bg-white p-6 rounded-lg shadow-lg">
			<h2 className="text-2xl font-semibold mb-4">Edit User</h2>

			{/* Display Alert if available */}
			{alert && (
				<Alert message={alert.message} type={alert.severity} className="mb-4" />
			)}

			{loading ? (
				<div className="flex justify-center">
					<Spin size="large" />
				</div>
			) : (
				<Form
					layout="vertical"
					onFinish={handleSubmit}
					initialValues={formData}>
					<Form.Item
						label="Name"
						name="name"
						rules={[{ required: true, message: "Name is required!" }]}>
						<Input
							name="name"
							placeholder="Enter name"
							onChange={handleChangeForm}
						/>
					</Form.Item>

					<Form.Item
						validateStatus={errors?.email ? "error" : ""}
						help={errors?.email || ""}
						label="Email"
						name="email"
						rules={[
							{ required: true, message: "Email is required!" },
							{ type: "email", message: "Invalid email format!" },
						]}>
						<Input
							name="email"
							type="email"
							placeholder="Enter email"
							onChange={handleChangeForm}
						/>
					</Form.Item>

					<Form.Item
						label="Password (Leave blank to keep current)"
						name="password">
						<Input.Password
							placeholder="Enter new password"
							onChange={(e) => handleChangeForm(e)}
						/>
					</Form.Item>

					<Form.Item
						label="Prodi"
						name="prodi_id"
						rules={[{ required: true, message: "Please select a Prodi!" }]}>
						<Select
							placeholder="Select Prodi"
							onChange={(value) =>
								handleChangeForm({ target: { name: "prodi_id", value } })
							}>
							{prodiList.map((prodi) => (
								<Option key={prodi.id} value={prodi.id}>
									{prodi.name}
								</Option>
							))}
						</Select>
					</Form.Item>

					<Form.Item
						label="Role"
						name="role"
						rules={[{ required: true, message: "Please select a role" }]}>
						<Select
							name="role
							"
							onChange={(value) =>
								handleChangeForm({ target: { name: "role", value } })
							}>
							{roleList.map((role) => (
								<Option key={role} value={role}>
									{role}
								</Option>
							))}
						</Select>
					</Form.Item>

					<Form.Item>
						<Button type="primary" htmlType="submit" block loading={loading}>
							Update User
						</Button>
					</Form.Item>
				</Form>
			)}
		</div>
	);
};

export default EditUserForm;
