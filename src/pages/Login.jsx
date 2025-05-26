import React, { useContext } from "react";
import { Form, Input, Button, Card, Typography, Select } from "antd";
import { useLoginForm } from "../hooks/useLoginForm";
import { SelectionContext } from "../context/SelectionContext";

const { Title } = Typography;
const { Option } = Select;

const Login = () => {
	const {
		userName,
		password,
		loading,
		handleChangeUserName,
		handleChangePassword,
		handleSubmit,
		handleSubmitRps,
	} = useLoginForm();

	const { selectedOption, setSelectedOption } = useContext(SelectionContext);
	const isDisabled = !selectedOption;

	return (
		<div
			className="flex justify-center items-center w-full h-screen"
			style={{
				backgroundImage: 'url("/kurikulum/img/bg_polban.png")',
				backgroundSize: "cover",
				backgroundPosition: "center",
			}}>
			<Card className="w-96 shadow-lg">
				<div className="flex flex-col items-center mb-4">
					<img src="/kurikulum/img/polban.png" alt="Logo Polban" className="w-16 h-16" />
					<h1 className="text-blue-950 font-bold font-sans text-xl mt-4 text-center">
						Penyusunan <span className="text-blue-500">Kurikulum</span>
					</h1>
				</div>

				<Form
					layout="vertical"
					onFinish={
						selectedOption === "dosen" ? handleSubmitRps : handleSubmit
					}>
					<Form.Item
						label="Pilih Opsi"
						name="option"
						rules={[{ required: true, message: "Silakan pilih opsi" }]}>
						<Select
							placeholder="Pilih opsi"
							onChange={setSelectedOption}
							value={selectedOption}>
							<Option value="kurikulum">Penyusunan Kurikulum</Option>
							<Option value="dosen">Dosen</Option>
						</Select>
					</Form.Item>
					<Form.Item
						label="UserName"
						name="username"
						rules={[{ required: true, message: "Please enter your email" }]}>
						<Input
							type="string"
							value={userName}
							onChange={(e) => handleChangeUserName(e)}
							placeholder="Enter your username"
							disabled={isDisabled}
						/>
					</Form.Item>
					<Form.Item
						label="Password"
						name="password"
						rules={[{ required: true, message: "Please enter your password" }]}>
						<Input.Password
							value={password}
							onChange={(e) => handleChangePassword(e)}
							placeholder="Enter your password"
							disabled={isDisabled}
						/>
					</Form.Item>
					<Form.Item>
						<Button
							type="primary"
							htmlType="submit"
							block
							loading={loading}
							disabled={isDisabled}>
							{loading ? "Logging in..." : "Login"}
						</Button>
					</Form.Item>
				</Form>
			</Card>
		</div>
	);
};

export default Login;
