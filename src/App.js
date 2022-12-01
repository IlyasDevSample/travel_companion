import React, { useEffect, useState } from 'react'
import { CssBaseline, Grid } from '@mui/material'
import Header from './components/Header/Header'
import List from './components/List/List'
import Map from './components/Map/Map'
import { getPlacesData } from './api/index'

const App = () => {
    const [places, setPlaces] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [coordinates, setCoordinates] = useState({})
    const [bounds, setBounds] = useState({})
    const [childClicked, setChildClicked] = useState(null)
    
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

        // console.log(bounds)
        // console.log(coordinates)
        setIsLoading(true)
        getPlacesData(bounds.sw, bounds.ne)
            .then((data) => {
                console.log(data)
                setPlaces(data)
                setIsLoading(false)

            }).catch((err) => {
                console.log(err)
            })

    }, [coordinates, bounds])

    return (
        <>
            <CssBaseline />
            <Header />
            <Grid container spacing={0} style={{ width: '100%' }}>
                <Grid item xs={12} md={4}>
                    <List places={places} childClicked={childClicked} isLoading={isLoading} />
                </Grid>
                <Grid item xs={12} md={8}>
                    <Map setCoordinates={setCoordinates}
                        setBounds={setBounds}
                        coordinates={coordinates}
                        places={places}
                        setChildClicked={setChildClicked} 
                        />
                </Grid>
            </Grid>
        </>
    )
}

export default App