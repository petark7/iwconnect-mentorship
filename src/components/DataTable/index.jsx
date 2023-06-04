import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { PaginationControl } from 'react-bootstrap-pagination-control';
import Modal from '../Modal';
import { isAdmin } from '../../utils/utils';
import './index.scss';

const DataTable = ({ columns, data, dataCount, itemsPerPage }) => {
	const [page, setPage] = useState(1);
	const [paginatedData, setPaginatedData] = useState();
	const [deleteUserModal, setDeleteUserModal] = useState(false);

	useEffect(() => {
		const indexOfLast = page * itemsPerPage;
		const indexOfFirst = indexOfLast - itemsPerPage;
		setPaginatedData(data.slice(indexOfFirst, indexOfLast));
	}, [page, data, itemsPerPage]);

	console.log(paginatedData);
	return (
		<>
			<Table striped hover responsive="sm">
				<thead>
					<tr>
						{columns.map((element, index) => (
							<th key={index}>{element.title}</th>
						))}
						<th>Actions</th>
					</tr>
				</thead>
				<tbody>
					{paginatedData?.map((row, index) => (
						<tr key={index} style={{ cursor: 'pointer' }} onClick={() => setDeleteUserModal(true)}>
							{columns.map(column => (
								<td key={column.key}>{row[column.key]}</td>
							))}
							<td>
								{isAdmin && <Button
									style={{ width: '100px' }}
									variant="danger"
									onClick={() => {}}
								            >
									Delete
                    </Button>}
							</td>
						</tr>
					))}
				</tbody>
			</Table>

			{deleteUserModal
			&& createPortal(<Modal isOpened={setDeleteUserModal} title="Delete user">
				<p>Are you sure you want to delete this user?</p>
				<div className="d-flex justify-content-end gap-1">
					<Button variant="success">Yes</Button>
					<Button variant="danger" onClick={() => setDeleteUserModal(false)}>Cancel</Button>
				</div>
			</Modal>, document.body)}

			<PaginationControl
				style={{ zIndex: 1 }}
				page={page}
				between={4}
				total={dataCount}
				limit={itemsPerPage}
				changePage={page => {
					setPage(page);
				}}
				ellipsis={2}
			/>
		</>
	);
};

const userPropTypes = PropTypes.shape({
	uid: PropTypes.string.isRequired,
	address: PropTypes.string.isRequired,
	age: PropTypes.number.isRequired,
	company: PropTypes.string.isRequired,
	email: PropTypes.string.isRequired,
	image: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	phone: PropTypes.string.isRequired
});

DataTable.propTypes = {
	data: PropTypes.arrayOf(userPropTypes),
	dataCount: PropTypes.number.isRequired,
	itemsPerPage: PropTypes.number.isRequired,
	columns: PropTypes.array.isRequired
};
export default DataTable;
