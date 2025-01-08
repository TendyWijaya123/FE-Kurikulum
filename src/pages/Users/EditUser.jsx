import React from "react";
import { useParams } from "react-router-dom";
import EditUserForm from "../../components/Common/Users/EditUserForm";
import DefaultLayout from "../../layouts/DefaultLayout";

const EditUser = () => {
	const { userId } = useParams();

	return (
		<DefaultLayout>
			<div className="w-full flex flex-col justify-center items-start pr-10">
				<div className="m-3 py-3 w-full">
					<h1 className="text-4xl font-semibold font-sans text-start">
						Edit User
					</h1>
					<EditUserForm userId={userId} />
				</div>
			</div>
		</DefaultLayout>
	);
};

export default EditUser;
