import { useEffect, useRef, useState } from "react";
import * as tt from "@tomtom-international/web-sdk-maps";
import { services } from "@tomtom-international/web-sdk-services";
import "../../App.css";
import "@tomtom-international/web-sdk-maps/dist/maps.css";
import axios from "axios";
import { Button } from "antd";

const Map = ({ geoLocation }) => {
  const mapElement = useRef();
  const [map, setMap] = useState({});
  const [center, setCenter] = useState([]);

  const [nearestRestaurants, setNearestRestaurants] = useState([]);

  useEffect(() => {
    // restaurants categorySet=7315
    console.log(geoLocation, "this.props");
    const apiKey = "neRRIE2TzDHgPTzkj2VPkd5J4598uBGE";

    const centerIndex = [geoLocation.longitude, geoLocation.latitude];
    setCenter(centerIndex);
    let map = tt.map({
      key: apiKey,
      container: mapElement.current,
      stylesVisibility: {
        // trafficFlow: true,
        // trafficIncidents: true,
      },
      center: centerIndex,
      zoom: 14,
    });
    setMap(map);

    const addMarker = () => {
      let popup = new tt.Popup({
        closeButton: true,
        offset: 25,
        anchor: "bottom",
      }).setText("Hii! This is me.");
      const element1 = document.createElement("div");
      element1.className = "marker";
      const marker1 = new tt.Marker({
        element: element1,
      })
        .setLngLat(centerIndex)
        .setPopup(popup)
        .addTo(map);
    };

    addMarker();

    return () => map.remove();
  }, []);

  const addRestaurantsMarker = () => {
    const URL = `https://api.tomtom.com/search/2/search/pizza.json?countrySet=&lat=${geoLocation.latitude}&lon=${geoLocation.longitude}&limit=100&radius=10000&idxSet=POI&categorySet=7315&key=neRRIE2TzDHgPTzkj2VPkd5J4598uBGE`;
    axios.get(URL).then((res) => {
      // console.log(res.data.results, "res from api");
      const nearestRestaurantsRes = res.data.results.map((restaurant) => {
        const obj = {
          name: restaurant.poi.name,
          position: restaurant.position,
          distance: restaurant.dist,
        };
        return obj;
      });
      setNearestRestaurants(nearestRestaurantsRes);
      console.log(nearestRestaurants, nearestRestaurantsRes);
      showRestaurantMarkers(nearestRestaurantsRes);
    });
  };

  const showRestaurantMarkers = (nearestRestaurantsRes) => {
    nearestRestaurantsRes.forEach((restaurant) => {
      let popup = new tt.Popup({
        closeButton: true,
        offset: 25,
        anchor: "bottom",
      }).setText(restaurant.name);
      const element = document.createElement("div");
      element.className = "restaurant-marker";
      const marker = new tt.Marker({
        element: element,
      })
        .setLngLat([restaurant.position.lon, restaurant.position.lat])
        .setPopup(popup)
        .addTo(map);
    });
  };

  return (
    <>
      {map && (
        <div className="Map">
          <div className="search-bar">
            <Button
              onClick={addRestaurantsMarker}
              type="primary"
              style={{ position: "absolute", zIndex: 1 }}
            >
              Show Nearest Restaurants
            </Button>
          </div>
          <div ref={mapElement} className="map" />
        </div>
      )}
    </>
  );
};

export default Map;
