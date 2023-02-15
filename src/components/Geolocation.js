// import { useEffect } from "react";

// const GeoLocation = () => {


//     useEffect(() => {
//         if (navigator.geolocation) {
//             navigator.permissions
//               .query({ name: "geolocation" })
//               .then(function (result) {
//                 if (result.state === "granted") {
//                   console.log(result.state);
//                   //If granted then you can directly call your function here
//                 } else if (result.state === "prompt") {
//                   console.log(result.state);
//                 } else if (result.state === "denied") {
//                   //If denied then you have to show instructions to enable location
//                 }
//                 result.onchange = function () {
//                   console.log(result.state);
//                 };
//               });
//           } else {
//             alert("Sorry Not available!");
//           }
//     }, [])

//     return (
//         <div></div>
//     )
// }

// export default GeoLocation;


import React from "react";
import { useGeolocated } from "react-geolocated";

const GeoLocation = () => {
    const { coords, isGeolocationAvailable, isGeolocationEnabled } =
        useGeolocated({
            positionOptions: {
                enableHighAccuracy: false,
            },
            userDecisionTimeout: 5000,
        });

        

    return !isGeolocationAvailable ? (
        <div>Your browser does not support Geolocation</div>
    ) : !isGeolocationEnabled ? (
        <div>Geolocation is not enabled</div>
    ) : coords ? (
        <table>
            <tbody>
                <tr>
                    <td>latitude</td>
                    {/* {console.log(coords.latitude)} */}
                    <td>{coords.latitude}</td>
                </tr>
                <tr>
                    <td>longitude</td>
                    <td>{coords.longitude}</td>
                </tr>
                <tr>
                    <td>altitude</td>
                    <td>{coords.altitude}</td>
                </tr>
                <tr>
                    <td>heading</td>
                    <td>{coords.heading}</td>
                </tr>
                <tr>
                    <td>speed</td>
                    <td>{coords.speed}</td>
                </tr>
            </tbody>
        </table>
    ) : (
        <div>Getting the location data&hellip; </div>
    );
};

export default GeoLocation;