import { Component } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { ImSearch } from 'react-icons/im';

import s from './Searchbar.module.css';

class Searchbar extends Component { 
  state = {
    searchQuery: '',
  };

  handleInputChange = event => {
    this.setState({ searchQuery: event.currentTarget.value.toLowerCase().trim() })
  };

  handleSubmit = event => {
    event.preventDefault();
    
    const { onSubmit } = this.props;
    const { searchQuery } = this.state;

    if (searchQuery.trim() === '') {
      toast.error('Sorry, there are no images');
      return
    }

    onSubmit(searchQuery);
    this.setState({ searchQuery: '' });
  };

  render() { 
    const { searchQuery } = this.state;

    return (
      <header className={s['searchbar']}>
        <form className={s['search-form']}
              onSubmit={this.handleSubmit}>
          <button className={s['search-form__button']}
                  type="submit"> 
            <ImSearch />
            <span className={s['search-form__button-label']}>Search</span>
          </button>

        <input
            className={s['search-form__input']}
            type="text"
            value={searchQuery}
            onChange={this.handleInputChange}
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
        />
      </form>
      </header>
      
    )
  }
}

export default Searchbar;