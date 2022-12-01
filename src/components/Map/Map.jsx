import React from 'react'
import GoogleMapReact from 'google-map-react';
import styles from './style.module.css';
import PlaceMarker from './PlaceMarker';


const restaurant = 'restaurant'
const hotel = 'hotel'
const attraction = 'attraction'

const Map = ({ setCoordinates, setBounds, coordinates, places, setChildClicked }) => {

    return (
        <div className={styles.mapBox}>
            <GoogleMapReact
                bootstrapURLKeys={{ key: '' }}
                defaultCenter={coordinates}
                center={coordinates}
                defaultZoom={14}
                margin={[50, 50, 50, 50]}
                options={''}
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
                        
                        <PlaceMarker type={restaurant} placeName={place.name} />
                        
                    </div>
                ))}
            </GoogleMapReact>
        </div>
    )
}

export default Map