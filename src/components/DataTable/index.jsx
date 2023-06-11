import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { PaginationControl } from 'react-bootstrap-pagination-control';
import Table from 'react-bootstrap/Table';
import './index.scss';

const DataTable = ({ columns, rows, itemsPerPage, onClick }) => {
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
						<tr key={index} style={{ cursor: 'pointer' }} onClick={() => onClick(row.id)}>
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
	columns: PropTypes.array.isRequired,
	onClick: PropTypes.func
};
export default DataTable;
