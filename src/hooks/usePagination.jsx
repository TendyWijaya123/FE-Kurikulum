import { useState, useEffect } from "react";

const usePagination = (initialPage = 1, totalPages = 1) => {
	const [currentPage, setCurrentPage] = useState(initialPage);
	const [totalPage, setTotalPage] = useState(totalPages);

	const handlePageChange = (event, page) => {
		setCurrentPage(page);
	};

	useEffect(() => {
		setTotalPage(totalPages);
	}, [totalPages]);

	return {
		currentPage,
		totalPage,
		setTotalPage,
		setCurrentPage,
		handlePageChange,
	};
};

export default usePagination;
