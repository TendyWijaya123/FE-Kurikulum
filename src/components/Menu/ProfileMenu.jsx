import { useContext, useState } from "react";
import { Avatar } from "@mui/material";
import { AuthContext } from "../../context/AuthProvider";
import { useNavigate } from "react-router-dom";

const ProfileMenu = () => {
	const [isOpenMenu, setIsOpenMenu] = useState(false);
	const { logout, user } = useContext(AuthContext);
	const navigate = useNavigate();
	const aliasName = user.name;

	const toggleMenu = () => {
		setIsOpenMenu((prev) => !prev);
	};

	const handleLogout = () => {
		logout();
		navigate("/login");
	};

	return (
		<div
			className="relative flex items-center gap-2 cursor-pointer"
			onClick={toggleMenu}>
			{/* Foto Profil Default */}
			<Avatar alt={aliasName} src="" className="bg-blue-500">
				{aliasName[0]}
			</Avatar>

			{/* Nama Samaran */}
			<span className="text-sm font-medium text-black">{aliasName}</span>

			{/* Menu List */}
			{isOpenMenu && (
				<div className="absolute top-full z-20 right-0 mt-2 w-40 bg-white shadow-lg rounded-md border border-gray-200">
					<ul>
						<li className="px-4 py-2 text-sm text-gray-700 cursor-pointer hover:bg-gray-100">
							Profile
						</li>
						<li className="px-4 py-2 text-sm text-gray-700 cursor-pointer hover:bg-gray-100">
							Settings
						</li>
						<li
							className="px-4 py-2 text-sm text-gray-700 cursor-pointer hover:bg-gray-100"
							onClick={handleLogout}>
							Logout
						</li>
					</ul>
				</div>
			)}
		</div>
	);
};

export default ProfileMenu;
