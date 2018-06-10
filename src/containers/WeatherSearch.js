import * as React from 'react';
import axios from 'axios';

const weather_app_id = 'b34a6922db15e8792e036c09f21b3d89';
const place_search_api = 'AIzaSyAdMGtUFm3jBS-sKB5K1BgXjH1UDpiY0PM';
const geocode_api = 'AIzaSyDtsj2r7n9bUEkI2gjLBfUpPj7ptiR7qlQ';

export class WeatherSearch extends React.Component {
    constructor() {
        super();
        this.state = {
            searchInput: '',
            places: []
        }
    }

    getPlaces = (input) => {
        const url = `https://maps.googleapis.com/maps/api/place/queryautocomplete/json?key=${place_search_api}&input=${input}`;
        axios.get(url)
        .then((response) => {
            this.setState({places: response.data.predictions});
        });
    }

    handleClick = (place) => {
        const {place_id} = place;
        const url = `https://maps.googleapis.com/maps/api/geocode/json?place_id=${place_id}&key=${geocode_api}`;
        axios.get(url)
        .then((response) => {
            const result = response.data.results[0];
            const formattedAddress = result.formatted_address;
            const location = result.geometry.location;
            const weather_url = `http://api.openweathermap.org/data/2.5/weather?lat=${location.lat}&lon=${location.lng}&APPID=${weather_app_id}`;
            return axios.get(weather_url);
        })
        .then((response) => {
            console.log(response.data);
        });
    }

    renderPlaces = () => {
        const {places = []} = this.state;

        return places.map((place, index) => {
            const {description} = place;

            return (
                <div key={index} onClick={() => this.handleClick(place)}>
                    <h3>{description}</h3>
                </div>
            );
        });
    }

    onChange = (e) => {
        this.setState({searchInput: e.target.value});
        this.getPlaces(e.target.value);
    }

    render() {
        const {searchInput} = this.state;

        return(
            <div>
                <input type='text' onChange={this.onChange} value={searchInput} placeholder='Enter places here'/>
                {this.renderPlaces()}
            </div>
        );
    }
}