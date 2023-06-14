import PropTypes from 'prop-types';

const RowTable = ({ rows }) => {
	const tableData = rows.map((element, index) => (
		<div key={element.id}>
			<div className="row">
				<div className="col-sm-3">
					<p className="mb-0">{element.name}</p>
				</div>
				<div className="col-sm-9">
					<p className="text-muted mb-0">{element.value}</p>
				</div>

			</div>
			{index === (rows.length - 1) ? null : <hr />}
		</div>
	));

	return (
		<div className="card mb-4">
			<div className="card-body">
				{tableData}
			</div>
		</div>
	);
};

RowTable.propTypes = {
	rows: PropTypes.arrayOf(PropTypes.shape(
		{
			name: PropTypes.string,
			value: PropTypes.node
		}
	))
};
export default RowTable;
