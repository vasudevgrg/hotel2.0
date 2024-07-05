import React, { useState, useEffect } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch } from 'react-redux';
import { hotels } from '../action';
import FilteredHotels from './FilteredHotels';
import "../App.css";
import { Dialog } from '@mui/material';

const MainPageInput = () => {
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [location, setLocation] = useState("");
    const [citySuggestions, setCitySuggestions] = useState([]);

    const dispatch = useDispatch();

    const handleSearch = async () => {
        fetch("http://localhost:5002/hotel/search?pageSize=10&pageNumber=1", {
            method: 'post',
            body: JSON.stringify({
                location, startDate, endDate
            }),
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include"
        }).then(e => e.json()).then(e => {
            console.log(e);
            dispatch(hotels(e.hotels))
        });
    }

    const fetchCitySuggestions = async (query) => {
        // Assuming you have an API endpoint to get city suggestions
        fetch(`http://localhost:5002/hotel/cities/suggestions?cityName=${query}`)
            .then(response => response.json())
            .then(data => {console.log(data);setCitySuggestions(data.cities)});
    }

    useEffect(() => {
        if (location.length > 2) {
            fetchCitySuggestions(location);
        } else {
            setCitySuggestions([]);
        }
    }, [location]);

    return (
        <>
            <h1>Over 174,000+ hotels and homes across 35+ countries</h1>
            <div className='mainpageinput'>
                <input
                    placeholder='search city'
                    value={location}
                    onChange={e => setLocation(e.target.value)}
                />
                <DatePicker
                    placeholderText='Start date'
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                />
                <DatePicker
                    placeholderText='End Date'
                    selected={endDate}
                    onChange={(date) => setEndDate(date)}
                />
              
                <button onClick={handleSearch} style={{display:"flex", margin:"50px"}}>Search</button>
               
            </div>
            <FilteredHotels startDate={startDate} endDate={endDate} />
            <Dialog/>
        </>
    )
}

export default MainPageInput
