import React from 'react';

const Search = () => (
    <section id="search" className="search">
        <form>
            <label htmlFor="find-show">
                Show
            </label>
            <input id="find-show" type="search" autoComplete="off"/>
            <button type="submit"><i className="fas fa-search"/></button>
        </form>
        <form>
            <label htmlFor="select-season">
                Season (optional)
            </label>
            <select id="select-season" />
        </form>

    </section>
)

export default Search