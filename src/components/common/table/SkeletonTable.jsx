/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/require-default-props */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import PropTypes from 'prop-types';

const defaultSkeleton = (count) =>
  new Array(count)
    .join()
    .split(',')
    .map((item, index) => index);

function InlineWrapperWithMargin({ children }) {
  return <span style={{ marginRight: '0.5rem' }}>{children}</span>;
}

function SkeletonTable({
  countColumns,
  countRows,
  showFilter = true,
  totalFilter = 1,
}) {
  return (
    <div className="mt-5">
      {showFilter && (
        <Skeleton
          count={totalFilter}
          inline
          width={170}
          height={40}
          wrapper={InlineWrapperWithMargin}
        />
      )}
      <table className="table table-zebra w-full my-5 py-5 px-5">
        <thead>
          <tr>
            {defaultSkeleton(countColumns).map(() => (
              <th className="text-center">
                <Skeleton />
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {defaultSkeleton(countRows).map(() => (
            <tr>
              {defaultSkeleton(countColumns).map(() => (
                <td>
                  <Skeleton />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
        <tbody />
      </table>
    </div>
  );
}
SkeletonTable.propTypes = {
  countColumns: PropTypes.array,
  countRows: PropTypes.array,
  showFilter: PropTypes.bool,
  totalFilter: PropTypes.number,
};

export default SkeletonTable;
