import css from './Searchbar.module.css';
import PropTypes from 'prop-types';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { toastConfig } from 'services/toastify/toastConfig';

export const SearchBar = ({ onSubmit }) => {
  const handleSubmit = event => {
    event.preventDefault();
    const query = event.target.searchText.value.trim().toLowerCase();
    if (query) {
      onSubmit(query);
      event.target.reset();
    } else {
      toast.error('Please enter a search term', toastConfig);
    }
  };

  return (
    <header className={css.SearchBar}>
      <ToastContainer />
      <form className={css.SearchForm} onSubmit={handleSubmit}>
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
