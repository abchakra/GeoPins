import React from "react";
import ReactMapGL, { NavigationControl, Marker, Popup } from "react-map-gl";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import DeleteIcon from "@material-ui/icons/DeleteTwoTone";


const viewport = {
  latitude: 37.7577,
  longitude: -122.4376,
  zoom: 13
};

// const [viewport, setViewport] = useState(INITIAL_VIEWPORT);

const Map = ({ classes }) => {
  return (

    <div className={classes.root}>
      <ReactMapGL
        width="100vw"
        height="calc(100vh - 64px)"
        mapStyle="mapbox://styles/mapbox/streets-v9"
        mapboxApiAccessToken="pk.eyJ1IjoiYWJoaXNoZWsxOTgyIiwiYSI6ImNqdHd3eXlpMDF3dHI0ZnFuYjZpZ3k0c3UifQ.Mwt9E6qKBZupA9sZAxHcHg"
        {...viewport}
      >


      </ReactMapGL>
    </div
    >
  );
};

const styles = {
  root: {
    display: "flex"
  },
  rootMobile: {
    display: "flex",
    flexDirection: "column-reverse"
  },
  navigationControl: {
    position: "absolute",
    top: 0,
    left: 0,
    margin: "1em"
  },
  deleteIcon: {
    color: "red"
  },
  popupImage: {
    padding: "0.4em",
    height: 200,
    width: 200,
    objectFit: "cover"
  },
  popupTab: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column"
  }
};

export default withStyles(styles)(Map);
