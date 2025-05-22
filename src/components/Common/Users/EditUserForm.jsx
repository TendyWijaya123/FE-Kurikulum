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
						validateStatus={errors?.name ? "error" : ""}
						help={errors?.name || ""}
						required>
						<Input
							name="name"
							placeholder="Enter name"
							onChange={handleChangeForm}
						/>
					</Form.Item>

					<Form.Item
						label="Email"
						name="email"
						validateStatus={errors?.email ? "error" : ""}
						help={errors?.email || ""}
						required>
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
							name="password"
							placeholder="Enter new password"
							onChange={(e) => handleChangeForm(e)}
						/>
					</Form.Item>

					<Form.Item
						label="Prodi"
						name="prodi_id"
						validateStatus={errors?.prodi_id ? "error" : ""}
						help={errors?.prodi_id || ""}
						required>
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
						validateStatus={errors?.role ? "error" : ""}
						help={errors?.role || ""}
						required>
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
