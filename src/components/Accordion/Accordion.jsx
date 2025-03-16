import { Collapse } from "antd";

const Accordion = ({ title, children }) => {
	const items = [
		{
			key: "1",
			label: <span className="text-2xl mb-2 font-semibold">{title}</span>,
			children,
		},
	];

	return (
		<Collapse
			defaultActiveKey={["1"]}
			bordered={false}
			expandIconPosition="start"
			className="mb-2 bg-white border border-gray-300 rounded-lg"
			items={items}
		/>
	);
};

export default Accordion;
