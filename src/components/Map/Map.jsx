import React from 'react'
import GoogleMapReact from 'google-map-react';
import styles from './style.module.css';
import PlaceMarker from './PlaceMarker';
import mapStyles from './mapStyles';
import Tooltip from '@mui/material/Tooltip';
import Zoom from '@mui/material/Zoom';


const restaurant = 'restaurant'
const hotel = 'hotel'
const attraction = 'attraction'

const Map = ({ setCoordinates, setBounds, coordinates, places, setChildClicked, weather }) => {

    // console.log(weather?.lat, weather?.lon)
    // console.log(weather)

    return (
        <div className={styles.mapBox}>
            <GoogleMapReact
                bootstrapURLKeys={{ key: '' }}
                defaultCenter={coordinates}
                center={coordinates}
                defaultZoom={14}
                margin={[50, 50, 50, 50]}
                options={{ disableDefaultUI: true, zoomControl: true, styles: mapStyles }}
                onChange={(e) => {
                    setCoordinates({ lat: e.center.lat, lng: e.center.lng })
                    setBounds({ ne: e.bounds.ne, sw: e.bounds.sw })
                }}
                onChildClick={(child) => setChildClicked(child)}
            >
                {places?.map((place, i) => (
                    <div
                        lat={place.latitude}
                        lng={place.longitude}
                        key={i}
                        className={styles.mapMarker}
                    >
                        {place.category?.key === restaurant ? <PlaceMarker type={restaurant} placeName={place.name} /> : null}
                        {place.subcategory_type === hotel ? <PlaceMarker type={hotel} placeName={place.name} /> : null}
                        {place.category?.key === attraction ? <PlaceMarker type={attraction} placeName={place.name} /> : null}


                    </div>
                ))}



                {weather?.lat && weather?.lon ?
                    <Tooltip title={weather?.current?.weather[0]?.main} TransitionComponent={Zoom} style={{cursor:'pointer'}}>
                        <img
                            lat={weather.lat}
                            lng={weather.lon}
                            src={`https://openweathermap.org/img/wn/${weather?.current?.weather[0]?.icon}@2x.png`}
                            alt="Weather Icon"
                        />
                    </Tooltip>
                    : null}

            </GoogleMapReact>
        </div>
    )
}

export default Map