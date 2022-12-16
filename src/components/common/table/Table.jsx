import PropTypes from 'prop-types';

function Table({ columns, rows }) {
  return (
    <table className="table table-zebra w-full">
      <thead>
        <tr>
          {columns.map((item) => (
            <th className="text-center">{item}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((item, index) => (
          <tr>
            <td>{index + 1}</td>
          </tr>
        ))}
      </tbody>
      <tbody />
    </table>
  );
}

Table.propTypes = {
  columns: PropTypes.array,
  rows: PropTypes.array,
};
export default Table;
