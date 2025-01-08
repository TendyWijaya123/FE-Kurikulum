import MenuIcon from "@mui/icons-material/Menu";
import ProfileMenu from "../components/Menu/ProfileMenu";
const Header = ({ openSidebar, title }) => {
	return (
		<header className="flex justify-between items-center bg-white  w-full px-4 py-2 text-white z-1">
			<div className="flex flex-1 gap-2 justify-start">
				<button onClick={openSidebar} className="text-white">
					<MenuIcon sx={{ color: "#000" }} />
				</button>
				<h1 className="text-black font-bold font-sans text-xl mb-4 mt-5 border-solid border-white">
					{title}
				</h1>
			</div>
			<ProfileMenu />
		</header>
	);
};

export default Header;
