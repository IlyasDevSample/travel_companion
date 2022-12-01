import React from 'react'
import Tooltip from '@mui/material/Tooltip';
import Zoom from '@mui/material/Zoom';

const PlaceMarker = ({ type, placeName }) => {

    switch (type) {
        case 'restaurant':
            return (
                <div className='markerLocation'>
                    <Tooltip title={placeName} TransitionComponent={Zoom}>
                        <img src={process.env.PUBLIC_URL + '/images/restaurants.png'} alt="restaurant marker" />
                    </Tooltip>
                </div>
            )
        case 'hotel':
            return (
                <div className='markerLocation'>
                    <Tooltip title={placeName} TransitionComponent={Zoom}>
                        <img src={process.env.PUBLIC_URL + '/images/hotels.png'} alt="hotels marker" />
                    </Tooltip>
                </div>
            )
        case 'attraction':
            return (
                <div className='markerLocation'>
                    <Tooltip title={placeName} TransitionComponent={Zoom}>
                        <img src={process.env.PUBLIC_URL + '/images/attractions1.png'} alt="attractions marker" />
                    </Tooltip>
                </div>
            )

        default:
            break;
    }
}

export default PlaceMarker