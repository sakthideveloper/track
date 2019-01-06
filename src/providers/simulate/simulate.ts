import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {} from 'googlemaps';

@Injectable()
export class SimulateProvider {


  public directionsService: google.maps.DirectionsService;
  public myRoute: any;
  public myRouteIndex: number;

  constructor() {
    this.directionsService = new google.maps.DirectionsService();
  }

  riderPickedUp() {
    // simulate rider picked up after 1 second
    return Observable.timer(1000);
  }

  riderDroppedOff() {
    // simulate rider dropped off after 1 second
    return Observable.timer(1000);
  }

  getPickupCar() {
    return Observable.create(observable => {

      let car = this.myRoute[this.myRouteIndex];
      console.log("getting pickup car:", car);
      observable.next(car);
      this.myRouteIndex++;

    })
  }

  getSegmentedDirections(directions) {

    console.log("directions segmented:", directions);
    let route = directions.routes[0];
    let legs = route.legs;
    let path = [];
    let increments = [];
    let duration = 0;

    console.log("directions legs:", legs);

    let numOfLegs = legs.length;

    console.log("directions numOfLegs length:", numOfLegs);

    // work backwards though each leg in directions route
    while (numOfLegs--) {

      console.log("directions numOfLegs--:", numOfLegs);

      let leg = legs[numOfLegs];
      let steps = leg.steps;
      let numOfSteps = steps.length;

      console.log("directions numOfSteps:", numOfSteps);

      while(numOfSteps--) {

        let step = steps[numOfSteps];
        let points = step.path;
        let numOfPoints = points.length;

        duration += step.duration.value;

        console.log("directions numOfSteps--:", numOfSteps);

        while(numOfPoints--) {

          console.log("directions numOfPoints--:", numOfSteps);

          let point = points[numOfPoints];

          console.log("directions point:", point);

          path.push(point);

          console.log("directions path:", path);

          increments.unshift({
            position: point,  // car position
            time: duration,  // time left before arrival
            path: path.slice(0) // clone array to prevent referencing final path array
          })
        }
      }
    }

    console.log("directions increments:", increments);

    return increments;
  }

  calculateRoute(start, end) {

    return Observable.create(observable => {

      this.directionsService.route({
        origin: start,
        destination: end,
        travelMode: google.maps.TravelMode.DRIVING
      }, (response, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          console.log("directions response observable:", response);
          observable.next(response);
        }
        else {
          observable.error(status);
        }
      })
    });
  }

  simulateRoute(start, end) {

    return Observable.create(observable => {
      this.calculateRoute(start, end).subscribe(directions => {
        // get route path
        this.myRoute = this.getSegmentedDirections(directions);
        // return pickup car
        this.getPickupCar().subscribe(car => {

          console.log("directions getPickupCar car:", car);
          observable.next(car); // first increment in car path
        })
      })
    });
  }

  findPickupCar(pickupLocation) {

    this.myRouteIndex = 0;

    let car = this.cars1.cars[0]; // pick one of the cars to simulate pickupLocation
    let start = new google.maps.LatLng(car.coord.lat, car.coord.lng);
    let end = pickupLocation;

    console.log("directions simulate car:", car);

    console.log("start simulate car route start",start);
    console.log("start simulate car route end",end);

    return this.simulateRoute(start, end);
  }

  dropoffPickupCar(pickupLocation, dropoffLocation) {
    return this.simulateRoute(pickupLocation, dropoffLocation);
  }

  getCars(lat, lng) {

    let carData = this.cars[this.carIndex];

    console.log("carData getCars",carData);

    this.carIndex++;

    console.log(" this.carIndex",this.carIndex);

    console.log(" this.cars.length-1", this.cars.length-1);

    if (this.carIndex > this.cars.length-1) {
      this.carIndex = 0;
    }

    return Observable.create(
      observer => observer.next(carData)
    )
  }

  private carIndex: number = 0;

  private cars1 = {
    cars: [{
      id: 1,
      coord: {
        lat: 12.9760,
        lng: 80.2212
      }
    },
    {
      id: 2,
      coord: {
        lat: 12.9010,
        lng: 80.2279
      }
    }
  ]
 };

 private cars2 = {
    cars: [{
      id: 1,
      coord: {
        lat: 13.0374,
        lng: 80.2123
      }
    },
    {
      id: 2,
      coord: {
        lat: 13.0521,
        lng: 80.2125
      }
    }
  ]
 };

 private cars3 = {
    cars: [{
      id: 1,
      coord: {
        lat: 12.9760,
        lng: 80.2212
      }
    },
    {
      id: 2,
      coord: {
        lat: 12.9760,
        lng: 80.2212
      }
    }
  ]
 };

 private cars4 = {
    cars: [{
      id: 1,
      coord: {
        lat: 12.9760,
        lng: 80.2212
      }
    },
    {
      id: 2,
      coord: {
        lat: 12.9760,
        lng: 80.2212
      }
    }
  ]
 };

 private cars5 = {
    cars: [{
      id: 1,
      coord: {
        lat: 12.9760,
        lng: 80.2212
      }
    },
    {
      id: 2,
      coord: {
        lat: 12.9760,
        lng: 80.2212
      }
    }
  ]
 };

 private cars: Array<any> = [this.cars1, this.cars2, this.cars3, this.cars4, this.cars5];

}
