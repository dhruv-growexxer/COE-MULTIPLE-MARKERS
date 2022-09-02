import { Spin } from "antd";
import React, { Component } from "react";
import Banner from "../../components/Banner";
import Map from "../../components/Map";

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      geoLocation: {},
      geoError: null,
      searchResults: [],
    };
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      (e) => {
        this.setState({
          geoLocation: e.coords,
        });
      },
      async (err) => {
        this.setState({
          geoError: err,
        });
      }
    );
  }

  render() {
    const { geoError, geoLocation } = this.state;
    if (geoError) {
      const element = document.getElementById("my-spinner");
      element.classList.add("error-display");
    }
    return (
      <div>
        <Banner geoLocation={geoLocation} geoError={geoError} />
        {!!geoLocation.latitude ? (
          <Map geoLocation={geoLocation} />
        ) : (
          <div id="my-spinner" className="example">
            <Spin />
          </div>
        )}
      </div>
    );
  }
}
