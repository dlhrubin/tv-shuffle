import React from 'react';

const Search = () => (
    <section id="search" className="search">
        <form>
            <label htmlFor="find-show">
                Show
            </label>
            <input id="find-show" type="search"/>
            <button type="submit"><i className="fas fa-search"/></button>
        </form>
        <form>
            <label htmlFor="select-season">
                Season (optional)
            </label>
            <select id="select-season">
                </select>
        </form>

    </section>
)

export default Search