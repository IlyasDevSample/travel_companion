import React, { useEffect, useState } from 'react'
import { CssBaseline, Grid } from '@mui/material'
import Header from './components/Header/Header'
import List from './components/List/List'
import Map from './components/Map/Map'
import { getPlacesData, getPlacesWeather } from './api/index'

const App = () => {
    const [places, setPlaces] = useState([])
    const [filteredPlaces, setFilteredPlaces] = useState([])
    const [weather, setWeather] = useState({})
    const [isLoading, setIsLoading] = useState(false)
    const [coordinates, setCoordinates] = useState({})
    const [bounds, setBounds] = useState({})
    const [childClicked, setChildClicked] = useState(null)
    const [type, setType] = useState('restaurants')
    const [rating, setRating] = useState(0)
    
    useEffect(() => {

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(({ coords }) => {
                setCoordinates({
                    lat: coords.latitude,
                    lng: coords.longitude
                })
            }, () => {
                // alert('Please Allow Location')
                setCoordinates({
                    lat: 33.9693414,
                    lng: -6.8712035
                })
            })
        }
        else {
            setCoordinates({
                lat: 33.9693414,
                lng: -6.8712035
            })
        }

    }, [])

    useEffect(() => {
        
        const filteredPlaces = places?.filter((place) => place?.rating > rating)
        setFilteredPlaces(filteredPlaces ? filteredPlaces : [] )
        
    }, [rating])
    
    useEffect(() => {

        getPlacesWeather(coordinates.lat, coordinates.lng)
            .then((data) => {
                // console.log(data)
                setWeather(data)
            })
            .catch((err) => {
                console.log(err)
            })

    }, [bounds])
    

    useEffect(() => {

        setIsLoading(true)
        getPlacesData(bounds.sw, bounds.ne, type)
            .then((data) => {
                // console.log(data)
                setFilteredPlaces([])
                setRating(0)
                setPlaces(data?.filter((dta) => dta.rating))
                setIsLoading(false)

            }).catch((err) => {
                console.log(err)
            })

    }, [bounds, type])

    return (
        <>
            <CssBaseline />
            <Header setCoordinates={setCoordinates} />
            <Grid container spacing={0} style={{ width: '100%' }}>
                <Grid item xs={12} md={4}>
                    <List places={filteredPlaces.length ? filteredPlaces : places} 
                        childClicked={childClicked} 
                        isLoading={isLoading} 
                        type={type}
                        setType={setType}
                        rating={rating}
                        setRating={setRating}
                    />
                </Grid>
                <Grid item xs={12} md={8}>
                    <Map setCoordinates={setCoordinates}
                        setBounds={setBounds}
                        coordinates={coordinates}
                        places={filteredPlaces?.length ? filteredPlaces : places}
                        setChildClicked={setChildClicked}
                        weather={weather}
                        />
                </Grid>
            </Grid>
        </>
    )
}

export default App