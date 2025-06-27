import React from "react";

function getBackgroundClassBySemesterAndJenjang(semester, jenjangProdi) {
	if (jenjangProdi === "D4") {
		if ([1, 2].includes(semester)) return "bg-green-200";
		if ([3, 4, 5].includes(semester)) return "bg-yellow-200";
		if (semester === 6) return "bg-orange-400 text-white";
		if (semester === 7) return "bg-blue-700 text-white";
		if (semester === 8) return "bg-yellow-300";
	}

	if (jenjangProdi === "D3") {
		if ([1, 2].includes(semester)) return "bg-green-200";
		if ([3, 4].includes(semester)) return "bg-yellow-200";
		if (semester === 5) return "bg-orange-400 text-white";
		if (semester === 6) return "bg-yellow-300";
	}

	if (jenjangProdi === "S2") {
		if ([1, 2].includes(semester)) return "bg-green-200";
		if ([3, 4].includes(semester)) return "bg-yellow-200";
	}

	return "bg-gray-200";
}

const GroupNode = ({ data }) => {
	const label = data.label ?? "Semester Belum diisi";
	const jenjangProdi = data.jenjangProdi ?? "Tidak diketahui";
	const semester = data.semester ?? 0;
	const backgroundClass = getBackgroundClassBySemesterAndJenjang(
		semester,
		jenjangProdi
	);
	return (
		<div className="w-full h-full flex items-center border border-gray-400 bg-white">
			<h2
				className={`h-full text-lg font-bold border-r border-gray-400 flex items-center leading-none ${backgroundClass}`}>
				{label}
			</h2>
			<div className="flex-1"></div>
		</div>
	);
};

export default GroupNode;
