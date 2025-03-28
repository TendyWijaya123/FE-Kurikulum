import React from "react";
import { Form, Input, Select, Button, Alert, Card } from "antd";
import useCreateUser from "../../../hooks/Users/useCreateUser";

const { Option } = Select;

const CreateUserForm = () => {
	const {
		loading,
		prodiList,
		alert,
		errors,
		formData,
		roleList,
		handleChangeForm,
		handleSubmit,
	} = useCreateUser();

	return (
		<Card title="Create New User" className="w-full shadow-lg">
			{/* Display Alert if available */}
			{alert && (
				<Alert
					message={alert.message}
					type={alert.severity}
					showIcon
					className="mb-4"
				/>
			)}

			<Form layout="vertical" onFinish={handleSubmit} initialValues={formData}>
				<Form.Item
					label="Name"
					name="name"
					rules={[{ required: true, message: "Please enter your name" }]}>
					<Input name="name" onChange={handleChangeForm} />
				</Form.Item>

				<Form.Item
					validateStatus={errors?.email ? "error" : ""}
					help={errors?.email || ""}
					label="Email"
					name="email"
					rules={[
						{
							required: true,
							type: "email",
							message: "Please enter a valid email",
						},
					]}>
					<Input name="email" onChange={handleChangeForm} />
				</Form.Item>

				<Form.Item
					label="Prodi"
					name="prodi_id"
					rules={[{ required: true, message: "Please select a Prodi" }]}>
					<Select
						name="prodi_id"
						onChange={(value) =>
							handleChangeForm({ target: { name: "prodi_id", value } })
						}>
						<Option value="">Select Prodi</Option>
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
						name="role"
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
						{loading ? "Creating..." : "Create User"}
					</Button>
				</Form.Item>
			</Form>
		</Card>
	);
};

export default CreateUserForm;
