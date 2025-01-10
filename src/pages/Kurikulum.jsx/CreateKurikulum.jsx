import CreateKurikulumForm from "../../components/Common/Kurikulum/CreateKurikulumForm";
import DefaultLayout from "../../layouts/DefaultLayout";

const CreateKurikulum = () => {
	return (
		<DefaultLayout title="Create Prodi">
			<div className="w-full flex flex-col justify-center items-start pr-10">
				<div className="m-3 py-3 w-full">
					<CreateKurikulumForm />
				</div>
			</div>
		</DefaultLayout>
	);
};

export default CreateKurikulum;
