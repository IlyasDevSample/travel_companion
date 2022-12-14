import React, { useState } from 'react'
import { Autocomplete } from '@react-google-maps/api'
import { AppBar, Toolbar, Typography, InputBase} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import styles from './style.module.css'

const Header = ({ setCoordinates }) => {

    const [autoComplete, setAutoComplete] = useState(null)

    const onPlaceChanged = () => {
        console.log(autoComplete)

        setCoordinates({
            lat: autoComplete.getPlace().geometry.location.lat(),
            lng: autoComplete.getPlace().geometry.location.lng()
        })
    }
    
    return (
        <AppBar position='static' className={styles.appBar}>
            <Toolbar className={styles.toolBar}>
                <Typography variant='h5'>
                    Travel Companion
                </Typography>
                <div className={styles.searchBox}>
                    <Typography variant='h6'>
                        Explore New Places
                    </Typography>
                    <Autocomplete onLoad={(autoC) => setAutoComplete(autoC)} onPlaceChanged={onPlaceChanged}>
                        <div className={styles.search}>
                            <SearchIcon className={styles.icon} />
                            <InputBase placeholder='Search ...'/>
                        </div>
                        
                    </Autocomplete>
                </div>
            </Toolbar>
        </AppBar>

    )
}

export default Header