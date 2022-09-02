import React, { Component } from "react";
import {
  StyledBannerMessageError,
  StyledBannerMessageSuccess,
} from "./StyledBannerMessage";

export default class Banner extends Component {
  render() {
    if (this.props.geoError) {
      return (
        <StyledBannerMessageError>
          {this.props.geoError.message}
        </StyledBannerMessageError>
      );
    } else if (this.props.geoLocation.latitude) {
      return null;
    } else {
      return null;
    }
  }
}
