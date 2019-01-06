import { Injectable } from '@angular/core';
import { SimulateProvider } from '../simulate/simulate';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class CarProvider {

  constructor(public simulate:SimulateProvider) {
  }

  pollForRiderPickup() {
    return this.simulate.riderPickedUp();
  }

  pollForRiderDropoff() {
    return this.simulate.riderDroppedOff();
  }

  dropoffCar(pickupLocation, dropoffLocation) {
    return this.simulate.dropoffPickupCar(pickupLocation, dropoffLocation);
  }

  getPickupCar() {
    return this.simulate.getPickupCar();
  }

  findPickupCar(pickupLocation) {
    return this.simulate.findPickupCar(pickupLocation);
  }

  getCars(lat, lng) {
    return Observable
      .interval(2000)
      .switchMap(()=> this.simulate.getCars(lat, lng))
      .share();
  }

}
