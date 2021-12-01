import React from 'react';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';
 
export default class Autocomplete extends React.Component {
  constructor(props) {
    super(props);
  }
 
  render() {
    return (
      <PlacesAutocomplete
        value={this.props.address}
        onChange={this.props.handleChange}
        onSelect={this.props.handleSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div style={{width:"60%", justifyContent: "center"}}>
            <input
              {...getInputProps({
                placeholder: 'Search Places ...',
                className: 'location-search-input',
                style: {width: "90%", justifyContent: "center"}
              })}
            />
            <div className="autocomplete-dropdown-container" style={{width: "90%", marginLeft: "5%", zIndex: 50000}}>
              {loading && <div>Loading...</div>}
              {suggestions.map(suggestion => {
                const className = suggestion.active
                  ? 'suggestion-item--active'
                  : 'suggestion-item';
                // inline style for demonstration purpose
                const style = suggestion.active
                  ? { backgroundColor: '#c4c4c4', cursor: 'pointer', zIndex: 50000 }
                  : { backgroundColor: '#ffffff', cursor: 'pointer' };
                return (
                  <div
                    {...getSuggestionItemProps(suggestion, {
                      className,
                      style,
                    })}
                  >
                    <span>{suggestion.description}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>
    );
  }
}