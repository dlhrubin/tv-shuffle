import React, { useState } from 'react';

const getRandom = (arr) => {
    console.log(arr[Math.floor(Math.random() * arr.length)])
}

const Shuffle = ({id, episodeMap, num_episodes, season}) => {
    //const handleClick = () => {
        //if (season) {

        //}
    //}

    return (
        <section id="shuffle" className="shuffle">
            <span>Shuffle</span>
            <button onClick={() => getRandom(["a", "b", "c"])}><i className="fas fa-dice"></i></button>
        </section>
    )
}

export default Shuffle