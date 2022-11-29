import React from 'react'
import GoogleMapReact from 'google-map-react';
import { Paper, Typography, useMediaQuery } from '@mui/material'
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';

const Map = () => {

    const coordinates = {
        lat: 33.9693414,
        lng: -6.8713035
    }

    return (
        <div style={{ height: 'calc(100vh - 64px)', width: '100%', marginLeft: '12px', margin: 'auto' }}>
            <GoogleMapReact
                bootstrapURLKeys={{key:''}}
                defaultCenter={coordinates}
                center={coordinates}
                defaultZoom={14}
                margin={[50, 50, 50, 50]}
                options={''}
                onChange={''}
                onChildClick={''}
            >

            </GoogleMapReact>
        </div>
    )
}

export default Map