import CreateUserForm from "../../components/Common/Users/CreateUserForm";
import DefaultLayout from "../../layouts/DefaultLayout";

const CreateUser = () => {
	return (
		<DefaultLayout title="Create User">
			<div className="w-full flex flex-col justify-center items-start pr-10">
				<div className="m-3 py-3 w-full">
					<CreateUserForm />
				</div>
			</div>
		</DefaultLayout>
	);
};

export default CreateUser;
