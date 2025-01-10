import { useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";

const DefaultLayout = ({ children, title }) => {
	const [isCollapseSidebar, setIsCollapseSidebar] = useState(true);

	return (
		<div className="flex min-h-screen w-full font-sans text-black relative overflow-x-auto">
			{/* Main Layout */}
			<div className="w-full flex relative">
				{/* Sidebar */}
				<Sidebar isOpen={isCollapseSidebar} />

				{/* Main Content */}
				<div
					className={`flex flex-col w-full h-full bg-gray-200 transition-all duration-300 ${
						isCollapseSidebar ? "ml-64" : "ml-0"
					}`}>
					{/* Header */}
					<Header
						title={title}
						openSidebar={() => {
							setIsCollapseSidebar(!isCollapseSidebar);
						}}
					/>
					{/* Children */}
					<div className="p-4 flex-1">{children}</div>
				</div>
			</div>
		</div>
	);
};

export default DefaultLayout;
