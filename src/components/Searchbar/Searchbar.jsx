import css from './Searchbar.module.css';
import PropTypes from 'prop-types';

export const SearchBar = ({ onSubmit }) => {
  return (
    <header className={css.SearchBar}>
      <form className={css.SearchForm} onSubmit={onSubmit}>
        <button type="submit" className={css.SearchFormBtn}>
          <span className={css.SearchFormLabel}>Search</span>
        </button>

        <input
          name="searchText"
          className={css.SearchFormInput}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
};

SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
