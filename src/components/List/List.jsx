import React, { useState, useEffect } from 'react'
import { CircularProgress, Grid, Typography, InputLabel, MenuItem, FormControl, Select } from '@mui/material';
import styles from './style.module.css';
import PlaceDetails from '../PlaceDetails/PlaceDetails';


const selectStyle = {
    '.css-11u53oe-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input': { padding: '15px 0px 5px 10px' },
    '.MuiOutlinedInput-notchedOutline': { border: 'none', outline: 'none' },
    borderRadius: '0px',
    boxShadow: 'none',
    fontFamily: 'Quicksand, sans-serif'
}

const List = ({ places, childClicked, isLoading }) => {

    const [type, setType] = useState('restaurants')
    const [rating, setRating] = useState('')

    return (
        <div className={styles.container}>
            <div className={styles.formContainer}>
                <Typography variant='h4'>Restaurants, Hotels & Attractions around you</Typography>
                <FormControl>
                    <InputLabel>Type</InputLabel>
                    <Select value={type} onChange={e => setType(e.target.value)} className={styles.selectInput} sx={selectStyle}>
                        <MenuItem value='restaurants' >Restaurants</MenuItem>
                        <MenuItem value='hotels' >Hotels</MenuItem>
                        <MenuItem value='attractions' >Attractions</MenuItem>
                    </Select>
                </FormControl>
                <FormControl>
                    <InputLabel>Rating</InputLabel>
                    <Select value={rating} onChange={e => setRating(e.target.value)} className={styles.selectInput} sx={selectStyle}>
                        <MenuItem value={0}>All</MenuItem>
                        <MenuItem value={3} >Above 3.0</MenuItem>
                        <MenuItem value={4} >Above 4.0</MenuItem>
                        <MenuItem value={4.5} >Above 4.5</MenuItem>
                    </Select>
                </FormControl>
                <Grid container>
                    {isLoading ? 
                        (
                            <div className={styles.circularProgress} >
                                <CircularProgress size={'3rem'} />
                            </div>
                        ) 
                        : 
                        (
                        places?.map((place,i) => (
                            <Grid item xs={12} key={i}>
                                <PlaceDetails place={place} isSelected={parseInt(childClicked) === i} />
                            </Grid>
                        )))}
                </Grid>
            </div>
        </div>
    )
}

export default List