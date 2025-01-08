import MenuItemSidebar from "../components/Menu/MenuItemSidebar";
import MenuSidebar from "../components/Menu/MenuSidebar";

const Sidebar = ({ isOpen }) => {
	return (
		<div
			className={`w-64 flex flex-col items-center min-h-screen h-full bg-slate-800 absolute top-0 transition-all duration-300   ${
				isOpen ? "left-0" : "-left-64"
			}`}>
			<h1 className="text-white font-bold font-sans text-xl mb-4 mt-5 border-solid border-white">
				Penyusunan <span className="text-blue-500">Kurikulum</span>
			</h1>
			<div className="w-full">
				<MenuSidebar />
			</div>
		</div>
	);
};

export default Sidebar;
