import { memo } from "react";
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function Pagination({ pageCount, currentPage, changeCurrentPage }) {

	const cn = bem('Pagination');

	return (
		pageCount > 0 &&
		<div className={cn()}>
			{
				currentPage > 1 &&
				<button className={cn('button')} onClick={() => changeCurrentPage(1)}>1</button>
			}
			{
				currentPage > 3 && pageCount > 4 &&
				<div className={cn('gap')}>...</div>
			}
			{
				currentPage === pageCount && pageCount > 3 &&
				<button className={cn('button')} onClick={() => changeCurrentPage(currentPage - 2)}>{currentPage - 2}</button>
			}
			{
				currentPage > 2 &&
				<button className={cn('button')} onClick={() => changeCurrentPage(currentPage - 1)}>{currentPage - 1}</button>
			}
			<button className={cn('button') + ' ' + cn('button_active')}>{currentPage}</button>
			{
				pageCount - currentPage > 1 &&
				<button className={cn('button')} onClick={() => changeCurrentPage(currentPage + 1)}>{currentPage + 1}</button>
			}
			{
				currentPage === 1 && pageCount > 3 &&
				<button className={cn('button')} onClick={() => changeCurrentPage(currentPage + 2)}>{currentPage + 2}</button>
			}
			{
				pageCount - currentPage > 2 && pageCount > 4 &&
				<div className={cn('gap')}>...</div>
			}
			{
				pageCount > currentPage &&
				<button className={cn('button')} onClick={() => changeCurrentPage(pageCount)}>{pageCount}</button>
			}
		</div>
	)
}

Pagination.propTypes = {
	pageCount: PropTypes.number,
	currentPage: PropTypes.number,
	changeCurrentPage: PropTypes.func
};

Pagination.defaultProps = {
	changeCurrentPage: () => { },
}

export default memo(Pagination);
