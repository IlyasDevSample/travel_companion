import axios from 'axios'



export const getPlacesData = async (sw, ne, type) => {
    try {
        const response = await axios.get(`https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`, {

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
export const getPlacesWeather = async (lat, lng) => {
    try {
        const response = await axios
            .get('https://api.openweathermap.org/data/3.0/onecall?', 
            {
                params: {
                    lat: lat,
                    lon: lng,
                    appid: '8f47e6ba3385ee95ea0d4050b3d48694'
                }
            })
        
        return response.data
    } catch (err) {
        console.log(err)
    }
}