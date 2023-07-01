import css from './Button.module.css';
import PropTypes from 'prop-types';

export const Button = ({ handleBtnClick }) => {
  return (
    <div className={css.ButtonWrap}>
      <button onClick={handleBtnClick} className={css.Button}>
        Load more
      </button>
    </div>
  );
};

Button.propTypes = {
  handleBtnClick: PropTypes.func.isRequired,
};
