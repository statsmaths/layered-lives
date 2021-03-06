import React from 'react';
import Select, { components } from 'react-select';
import {
  useHistory
} from "react-router-dom";

import {
  MapContainer, Circle, TileLayer, ZoomControl, Tooltip
} from 'react-leaflet';
import { Legend } from "./legend.js";
import { InterviewBox } from "./interviewbox.js";

import 'leaflet/dist/leaflet.css';
import './interviewmap.css';

const customStyles = {
  placeholder: (defaultStyles) => {
    return {
        ...defaultStyles,
        color: '#757575',
    }
  }
}

function MapOption(props)
{
  let history = useHistory();
  function handleClick(data) {
    let res = new URLSearchParams(history.location.search);
    res.set("maptype", data.value);

    history.push({
        "pathname": "/map",
        "search": "?" + res.toString()
    });
  }

  return (
    <div onClick={() => handleClick(props)}>
      <components.Option {...props} />
    </div>
  );
};

function queryUrl(query, key, fallback = null) {
  let res = (new URLSearchParams(query)).get(key);
  return res === null ? fallback : res;
}

class InterviewMap extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
        data: null,
        mapname: { value: "geo_all", label: 'Select a map ...' },
        selectid: -1,
      }
    }

    componentDidMount() {
      fetch("./data/json/geo.json").then(res => {
        return res.json()
      }).then(res => {
        this.setState({
          data: res
        });
      })
    }

    handleSelectPoint(value) {
      this.setState({
        selectid: value,
      });
    }

    render() {

      if (!this.state.data) {
        return <span></span>
      }

      const mapname_options = [
        { value: 'geo_all', label: 'All Interviews' },
        { value: 'geo_writers', label: 'Prolific Writers' },
        { value: 'geo_women_writers', label: 'Women Writers' },
        { value: 'geo_men_writers', label: 'Men Writers' },
        { value: 'geo_black_writers', label: 'Black Writers' },
        { value: 'geo_white_writers', label: 'White Writers' },
        { value: 'geo_black_interviewee', label: 'Black Interviewees' },
        { value: 'geo_white_interviewee', label: 'White Interviewees' },
        { value: 'geo_ethnic', label: 'Interviewee Ethnicity' },
        { value: 'geo_occupation', label: 'Occupations' }
      ];

      let mtype = queryUrl(this.props.location.search, "maptype", "geo_all");
      let btype = queryUrl(this.props.location.search, "state", "all");
      let geodata = this.state.data[mtype].points;
      let geolegend = this.state.data[mtype].legend;

      let bounds = [[25.53511, -92.33793], [38.47061, -75.68696]];

      if (btype === "al") { bounds = [[30.223334, -88.473227], [35.008028, -84.889080]]; }
      if (btype === "ar") { bounds = [[33.004106, -94.617919], [36.499600, -89.644395]]; }
      if (btype === "fl") { bounds = [[24.523096, -87.634938], [31.000888, -80.031362]]; }
      if (btype === "ga") { bounds = [[30.357851, -85.605165], [35.000659, -80.839729]]; }
      if (btype === "la") { bounds = [[28.928609, -94.043147], [33.019457, -88.817017]]; }
      if (btype === "nc") { bounds = [[33.842316, -84.321869], [36.588117, -75.460621]]; }
      if (btype === "sc") { bounds = [[32.034600, -83.353910], [35.215402, -78.542030]]; }
      if (btype === "tn") { bounds = [[34.982972, -90.310298], [36.678118, -81.646900]]; }
      if (btype === "va") { bounds = [[36.540738, -83.675395], [39.466012, -75.242266]]; }

      var map = (
        <div id="map-container">
          <MapContainer
            bounds={bounds}
            zoomControl={false}
            scrollWheelZoom={false}
            touchZoom={false}
            minZoom={5}
            maxZoom={8}
            maxBounds={[[20, -95], [45, -70]]}
            attributionControl={false}>
            <ZoomControl
              position='topright'
              />
            <Legend
              position='bottomright'
              geolegend={geolegend}
              />
            <TileLayer
              url="./data/tiles/{z}/{x}/{y}.png"
              attribution=""
              scrollWheelZoom="false"
              touchZoom="false"
              doubleClickZoom="false"
            />

            {
              geodata.map( (val, i) => {
                return (
                  <div key={i}>
                    <Circle
                      center={[val.lat, val.lon]}
                      radius={val.size * 1600}
                      pathOptions={{
                        color: val.color,
                        fillOpacity: 0.5,
                        weight: 1
                      }}
                      eventHandlers={{
                        click: () => this.handleSelectPoint(i)
                      }}>
                      <Tooltip direction="top" offset={[0,-6]}>
                        <b>{val.title}</b><br/>
                        {val.subtitle}
                      </Tooltip>
                    </Circle>
                  </div>
                )
              })
            }

            <div className="custom-leaflet leaflet-top leaflet-right">
              <div className="custom-leaflet-inner" >

              </div>
            </div>

          </MapContainer>
        </div>
      )

      return (
        <div>
          <Select
            styles={customStyles}
            options={ mapname_options }
            className="mapselect"
            isSearchable={false}
            components={{ Option: MapOption }}
            placeholder="Select a map ..."
            />
          <div id="map-container">
            {map}
            <InterviewBox
              selectid={ this.state.selectid }
              selection={ geodata[this.state.selectid] }
              handleSelectPoint={this.handleSelectPoint.bind(this)}
            />
          </div>
        </div>
      );

    }


}


export {InterviewMap};
