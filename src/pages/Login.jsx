import React, { useContext } from "react";
import { Form, Input, Button, Card, Typography, Select } from "antd";
import { useLoginForm } from "../hooks/useLoginForm";
import { SelectionContext } from "../context/SelectionContext";

const { Title } = Typography;
const { Option } = Select;

const Login = () => {
  const {
    email,
    password,
    loading,
    handleChangeEmail,
    handleChangePassword,
    handleSubmit,
    handleSubmitRps,
  } = useLoginForm();

  const { selectedOption, setSelectedOption } = useContext(SelectionContext);
  const isDisabled = !selectedOption;

  return (
    <div className="flex justify-center items-center bg-blue-950 w-full h-screen">
      <Card className="w-96 shadow-lg">
        <Title level={2} className="text-center text-blue-950">Login</Title>
        <Form layout="vertical" onFinish={selectedOption === "dosen" ? handleSubmitRps : handleSubmit}>
          <Form.Item label="Pilih Opsi" name="option" rules={[{ required: true, message: "Silakan pilih opsi" }]}>            
				<Select placeholder="Pilih opsi" onChange={setSelectedOption} value={selectedOption}>
					<Option value="kurikulum">Penyusunan Kurikulum</Option>
					<Option value="dosen">Dosen</Option>
				</Select>
          </Form.Item>
          <Form.Item label="Email" name="email" rules={[{ required: true, message: "Please enter your email" }]}>            
            <Input 
              type="email"
              value={email}
              onChange={(e) => handleChangeEmail(e)}
              placeholder="Enter your email"
              disabled={isDisabled}
            />
          </Form.Item>
          <Form.Item label="Password" name="password" rules={[{ required: true, message: "Please enter your password" }]}>            
            <Input.Password
              value={password}
              onChange={(e) => handleChangePassword(e)}
              placeholder="Enter your password"
              disabled={isDisabled}
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block loading={loading} disabled={isDisabled}>
              {loading ? "Logging in..." : "Login"}
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Login;
