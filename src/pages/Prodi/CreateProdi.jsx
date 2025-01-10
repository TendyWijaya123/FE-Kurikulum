import CreateProdiForm from "../../components/Common/Prodi/CreateProdiForm";
import DefaultLayout from "../../layouts/DefaultLayout";

const CreateProdi = () => {
	return (
		<DefaultLayout title="Create Prodi">
			<div className="w-full flex flex-col justify-center items-start pr-10">
				<div className="m-3 py-3 w-full">
					<CreateProdiForm />
				</div>
			</div>
		</DefaultLayout>
	);
};


export default CreateProdi;