import React from "react";

const TemporaryUnavailable = () => {
	return (
		<div className="min-h-screen bg-blue-900 flex flex-col justify-center items-center text-white">
			<div className="text-center">
				<h1 className="text-6xl font-extrabold">403</h1>
				<p className="text-2xl mt-4">Waktu pengisian belum dibuka</p>
			</div>
			<button
				onClick={() => window.history.back()}
				className="mt-6 px-6 py-3 bg-blue-600 hover:bg-blue-500 rounded-lg text-white text-lg">
				Go Back
			</button>
		</div>
	);
};

export default TemporaryUnavailable;
