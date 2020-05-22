import React from 'react';

const PreviewImage = ({poster, name}) => {
    // SVG from https://www.svgrepo.com/svg/77175/popcorn
    const image = poster ? 
                <img src={poster} alt={name.concat(' poster')}/> :        
                <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                    viewBox="0 0 512 512" style={{enableBackground: "new 0 0 512 512"}}>
                    <path style={{fill: "#F7B239"}} d="M92.483,73.768c-1.617-3.948-2.506-8.273-2.506-12.8c0-18.621,15.091-33.725,33.725-33.725
                        c9.337,0,17.785,3.8,23.902,9.93c6.009-17.489,22.595-30.073,42.132-30.073c13.245,0,25.142,5.78,33.293,14.969
                        C227.786,9.189,240.168,0,254.693,0c15.36,0,28.308,10.28,32.391,24.32c8.152-10.469,20.871-17.219,35.166-17.219
                        c19.537,0,36.136,12.584,42.146,30.073c6.104-6.131,14.552-9.93,23.902-9.93c18.621,0,33.725,15.104,33.725,33.725
                        c0,4.527-0.903,8.852-2.52,12.8c22.757,1.994,40.61,21.086,40.61,44.369c0,11.587-4.433,22.151-11.695,30.073l-67.112,79.859
                        l-105.095,29.642l-125.305-33.684l-60.632-20.211l-26.705-55.606c-7.249-7.923-11.682-18.486-11.682-30.073
                        C51.887,94.855,69.726,75.763,92.483,73.768z"/>
                    <polygon style={{fill: "#F95428"}} points="448.418,148.211 381.561,148.211 130.425,148.211 63.569,148.211 63.138,148.211 108.14,512 
                        159.717,512 352.256,512 403.847,512 448.849,148.211 "/>
                    <g>
                        <path style={{fill: "#F2F2F2"}} d="M381.561,148.211L352.256,512H292.15l3.665-120.994c19.847-12.989,21.41-106.024,3.597-119.283
                            l0.013-0.013l3.732-123.5H381.561z"/>
                        <path style={{fill: "#F2F2F2"}} d="M216.185,391.02L219.837,512h-60.12l-29.292-363.789h78.417l3.732,123.486l0.013,0.013
                            C194.776,284.968,196.339,378.031,216.185,391.02z"/>
                    </g>
                    <path style={{fill: "E09B2D"}} d="M189.489,73.768c-1.617-3.948-2.506-8.273-2.506-12.8c0-18.621,15.091-33.725,33.725-33.725
                        c9.337,0,17.785,3.8,23.902,9.93c4.952-14.411,17.094-25.473,32.143-28.927C270.839,3.119,263.136,0,254.693,0
                        c-14.525,0-26.907,9.189-31.663,22.07c-8.152-9.189-20.049-14.969-33.293-14.969c-19.537,0-36.123,12.584-42.132,30.073
                        c-6.117-6.131-14.565-9.93-23.902-9.93c-18.634,0-33.725,15.104-33.725,33.725c0,4.527,0.889,8.852,2.506,12.8
                        c-22.757,1.994-40.596,21.086-40.596,44.369c0,11.587,4.433,22.151,11.682,30.073h66.856h30.149
                        c-7.249-7.923-11.682-18.486-11.682-30.073C148.892,94.855,166.731,75.763,189.489,73.768z"/>
                    <polygon style={{fill: "#E54728"}} points="130.425,148.211 159.717,512 108.14,512 63.138,148.211 63.569,148.211 "/>
                    <path style={{ fill: "#F7B239"}} d="M299.412,271.724c17.812,13.258,29.346,34.466,29.346,58.382c0,25.492-13.096,47.912-32.943,60.901
                        c-11.439,7.505-25.128,11.857-39.828,11.857c-14.686,0-28.376-4.352-39.801-11.843c-19.847-12.989-32.957-35.422-32.957-60.915
                        c0-23.916,11.547-45.137,29.359-58.395c12.113-9.027,27.136-14.363,43.399-14.363C272.249,257.347,287.286,262.696,299.412,271.724z
                        "/>
                </svg>
    return (
        <section id="preview-image" className="preview-image">
            {image}
        </section>
    )
}

export default PreviewImage;