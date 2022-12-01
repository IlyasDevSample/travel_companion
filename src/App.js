import React, { useEffect, useState } from 'react'
import { CssBaseline, Grid } from '@mui/material'
import Header from './components/Header/Header'
import List from './components/List/List'
import Map from './components/Map/Map'
import { getPlacesData } from './api/index'

const App = () => {
    const [places, setPlaces] = useState([])
    const [filteredPlaces, setFilteredPlaces] = useState([])
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
                alert('please Turn on your Location')
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
        
        const filteredPlaces = places?.filter((place) => place.rating > rating)
        console.log(rating)
        console.log(filteredPlaces)

        setFilteredPlaces(filteredPlaces)
    }, [rating])
    

    useEffect(() => {

        // console.log(bounds)
        // console.log(coordinates)
        console.log(type)
        setIsLoading(true)
        getPlacesData(bounds.sw, bounds.ne, type)
            .then((data) => {
                console.log(data)
                setFilteredPlaces([])
                setRating(0)
                setPlaces(data)
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
                        places={filteredPlaces.length ? filteredPlaces : places}
                        setChildClicked={setChildClicked} 
                        />
                </Grid>
            </Grid>
        </>
    )
}

export default App