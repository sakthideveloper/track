import { Component, Output, EventEmitter } from '@angular/core';
import {} from 'googlemaps';

@Component({
  selector: 'destination-address',
  templateUrl: 'destination-address.html'
})
export class DestinationAddressComponent {

  @Output() newDest: EventEmitter<string> = new EventEmitter<string>();

  public enteredAddress: string;
  public geocoder: google.maps.Geocoder;
  public results: Array<any>;

  constructor() {
    this.enteredAddress = "";
    this.geocoder = new google.maps.Geocoder();
    this.results = [];
  }

  onSubmit() {

    this.results = [];

    this.geocoder.geocode( {address: this.enteredAddress}, (destinations, status) => {

      if (status === google.maps.GeocoderStatus.OK) {
        this.results = destinations.slice(0,4); // show top 4 results
      }
      else if (status === google.maps.GeocoderStatus.ZERO_RESULTS) {
        alert("Destination not found");
      }
    });

  }

  selectDestination(destination) {
    this.results = [];
    this.enteredAddress = destination.formatted_address;
    // pass the destination lat/lng to the parent page

    console.log("destination:", destination);
    this.newDest.next(destination.geometry.location);
  }

}
