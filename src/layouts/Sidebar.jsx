import MenuSidebar from "../components/Menu/MenuSidebar";

const Sidebar = ({ isOpen }) => {
	return (
		<div
			className={`fixed top-0 left-0 h-full bg-slate-800 z-50 transition-transform duration-300 ease-in-out overflow-y-auto ${
				isOpen ? "translate-x-0" : "-translate-x-64"
			} w-64`}>
			<div className="flex items-center justify-center flex-col mt-5">
				<img src="/img/polban.png" alt="Logo Polban" className="w-16 h-16" />
				<h1 className="text-white font-bold font-sans text-xl mb-4 mt-4 text-center">
					Penyusunan <span className="text-blue-500">Kurikulum</span>
				</h1>
			</div>
			<div className="w-full">
				<MenuSidebar />
			</div>
		</div>
	);
};

export default Sidebar;
