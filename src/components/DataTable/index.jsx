import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import Table from 'react-bootstrap/Table';
import { PaginationControl } from 'react-bootstrap-pagination-control';
import './index.scss';

const DataTable = ({ columns, rows, itemsPerPage }) => {
	const navigate = useNavigate();
	const [page, setPage] = useState(1);
	const [paginatedData, setPaginatedData] = useState([]);

	useEffect(() => {
		const indexOfLast = page * itemsPerPage;
		const indexOfFirst = indexOfLast - itemsPerPage;
		const updatedData = rows.slice(indexOfFirst, indexOfLast);
		setPaginatedData(updatedData);
	}, [page, rows, itemsPerPage]);

	useEffect(() => {
		setPage(1);
	}, [itemsPerPage]);

	// !!! MAKE REUSABLE ONCLICK TABLE !!!
	return (
		<>
			<Table striped hover responsive="sm">
				<thead>
					<tr>
						{columns.map((element, index) => (
							<th key={index}>{element.title}</th>
						))}
					</tr>
				</thead>
				<tbody>
					{paginatedData.map((row, index) => (
						<tr key={index} style={{ cursor: 'pointer' }} onClick={() => navigate(`/user-details/${row.email}`)}>
							{columns.map(column => (
								<td key={column.key}>{row[column.key]}</td>
							))}
						</tr>
					))}
				</tbody>
			</Table>

			<PaginationControl
				page={page}
				between={4}
				total={rows.length}
				limit={itemsPerPage}
				changePage={page => {
					setPage(page);
				}}
				ellipsis={2}
			/>
		</>
	);
};

DataTable.propTypes = {
	rows: PropTypes.array,
	itemsPerPage: PropTypes.number.isRequired,
	columns: PropTypes.array.isRequired
};
export default DataTable;
