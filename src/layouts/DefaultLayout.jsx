import { useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";

const DefaultLayout = ({ children, title }) => {
	const [isCollapseSidebar, setIsCollapseSidebar] = useState(true);

	return (
		<div className="flex flex-col min-h-screen w-full font-sans text-black ">
			{/* Main Layout */}
			<div className="w-full flex flex-1 relative">
				{/* Sidebar */}
				<Sidebar isOpen={isCollapseSidebar} />

				{/* Main Content */}
				<div
					className={`flex-1 min-h-screen w-full bg-gray-200 transition-all duration-300 ${
						isCollapseSidebar ? "ml-64" : "ml-0"
					}`}>
					{/* Header */}
					<Header
						title={title}
						openSidebar={() => {
							setIsCollapseSidebar(!isCollapseSidebar);
							console.log(isCollapseSidebar);
						}}
					/>
					{children}
				</div>
			</div>
		</div>
	);
};

export default DefaultLayout;
