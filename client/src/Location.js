import React, { useState, useEffect } from "react";
import axios from "axios";

const Location = () =>{
    const [ip, setIp] = useState(null); // State to hold the IP address
    const [geoData, setGeoData] = useState(null); // State to hold geolocation 
    const fetchIpAddress = async () => {
        try {
          const response = await axios.get("https://api.ipify.org?format=json");
          setIp(response.data.ip); // Set the IP address in state
        } catch (error) {
          console.error("Error fetching IP address:", error.message);
        }
      };
      const getGeoLocationData = async () => {
        if (!ip) return; // Ensure IP is available before making the request
        try {
          const response = await axios.get(
            `https://geo.ipify.org/api/v2/country?apiKey=at_hLX3rngVbIZ1IHWiSkeVLDqgafmiU&ipAddress=${ip}`
          );
          setGeoData(response.data); // Set geolocation data in state
          console.log("GeoLocation Data:", response.data);
        } catch (error) {
          console.error("Error fetching geolocation data:", error.message);
        }
      };   
    
      useEffect(() => {
        fetchIpAddress();
      }, []);
    
      // Fetch geolocation data when the IP is updated
      useEffect(() => {
        if (ip) {
          getGeoLocationData();
        }
      }, [ip]);
      return (
        <div className="location">
          <br />
          <br />
          {ip ? <p>IP Address: {ip}</p> : <p>Loading IP address...</p>}
          {geoData ? (
            <div>
            
              <p>Country: {geoData.location.country}</p>
              <p>Region: {geoData.location.region}</p>
              <p>City: {geoData.location.city}</p>
              <p>Latitude: {geoData.location.lat}</p>
              <p>Longitude: {geoData.location.lng}</p>
              <p>Timezone: {geoData.location.timezone}</p>
              <p>ISP: {geoData.isp}</p>
            </div>
          ) : (
            <p>Loading Geolocation Data...</p>
          )}
        </div>
      );
    
}

export default Location;
