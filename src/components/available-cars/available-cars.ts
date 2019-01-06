import { Component, Input, OnInit } from '@angular/core';
import { CarProvider } from '../../providers/car/car';
import * as SlidingMarker from 'marker-animate-unobtrusive';

import {} from 'googlemaps';

@Component({
  selector: 'available-cars',
  templateUrl: 'available-cars.html'
})
export class AvailableCarsComponent implements OnInit{

  @Input() map: google.maps.Map;
  @Input() isPickupRequested: boolean;

  public carMarkers: Array<google.maps.Marker>;

  constructor(public carService: CarProvider) {
    this.carMarkers = [];
  }

  ngOnInit() {
    this.fetchAndRefreshCars();
  }

  ngOnChanges() {
    if(this.isPickupRequested) {
      this.removeCarMarkers();
    }
  }

  removeCarMarkers() {
     let numOfCars = this.carMarkers.length;
     while(numOfCars--) {
       let car = this.carMarkers.pop();
       car.setMap(null);
     }
  }

  addCarMarker(car) {
    console.log("Add car marker");
    let carMarker = new SlidingMarker({
      map: this.map,
      position: new google.maps.LatLng(car.coord.lat, car.coord.lng),
      icon: '../assets/imgs/bike.png'
    });

    carMarker.setDuration(2000);
    carMarker.setEasing('linear');

    carMarker.set('id', car.id); // MVCObject()

    this.carMarkers.push(carMarker);
  }

  updateCarMarker(car) {
    for (var i=0, numOfCars=this.carMarkers.length; i < numOfCars; i++) {
      // find car and update it
      if ((<any>this.carMarkers[i]).id === (<any>car).id) {
        this.carMarkers[i].setPosition(new google.maps.LatLng(car.coord.lat, car.coord.lng));
        return;
      }

    }

    // car does not exist in carMarkers
    this.addCarMarker(car);
  }

  fetchAndRefreshCars() {
    this.carService.getCars(9,9)
      .subscribe(carsData => {

        let listOfCars:any = carsData;

        console.log("Getting carsData:", carsData);
        console.log("isPickupRequested check", this.isPickupRequested);

        if (!this.isPickupRequested) {
          listOfCars.cars.forEach( car => {

            console.log("each car for fetch", car);
            this.updateCarMarker(car);
          })
        }
      })
  }
}
