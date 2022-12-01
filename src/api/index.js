import axios from 'axios'

const URL = 'https://travel-advisor.p.rapidapi.com/restaurants/list-in-boundary'

export const getPlacesData = async (sw, ne) => {
    try {
        const response = await axios.get(URL, {

            params: {
                bl_latitude: sw.lat,
                tr_latitude: ne.lat,
                bl_longitude: sw.lng,
                tr_longitude:  ne.lng
            },
            headers: {
                'X-RapidAPI-Key': 'ff288476c5mshd72eb7799b53adcp13decbjsnefdb0806ee4c',
                'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com'
            }
        })
        return response.data.data
    } catch (err) {
        console.log(err)
    }
}