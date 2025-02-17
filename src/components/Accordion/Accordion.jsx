import { Collapse } from "antd";

const { Panel } = Collapse;

const Accordion = ({ title, children }) => {
	return (
		<Collapse
			defaultActiveKey={["1"]}
			bordered={false}
			expandIconPosition="right"
			className="mb-2 bg-white border border-gray-300 rounded-lg">
			<Panel
				key="1"
				header={<span className="text-2xl mb-2 font-semibold">{title}</span>}>
				{children}
			</Panel>
		</Collapse>
	);
};

export default Accordion;
