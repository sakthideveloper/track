import { Component } from '@angular/core';
import { IonicPage, NavController, ToastController } from 'ionic-angular';
import { PickupPubSubProvider } from '../../providers/pickup-pub-sub/pickup-pub-sub';

@IonicPage()
@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
})
export class DashboardPage {

  public isPickupRequested: boolean;
  public isRiderPickedUp: boolean;
  public pickupSubscription: any;
  public timeTillArrival: number;
  public destination: string;

  constructor(
    public nav: NavController,
    private pickupPubSub: PickupPubSubProvider,
    private toastCtrl: ToastController) {
      this.isPickupRequested = false;
      this.isRiderPickedUp = false;
      this.timeTillArrival = 5;
      // this.pickupSubscription = this.pickupPubSub.watch().subscribe(e => {
      //   this.processPickupSubscription(e);
      // })
  }

  processPickupSubscription(e) {
    switch(e.event) {
      case this.pickupPubSub.EVENTS.ARRIVAL_TIME:
        this.updateArrivalTime(e.data);
        break;
      case this.pickupPubSub.EVENTS.PICKUP:
        this.riderPickedUp();
        break;
      case this.pickupPubSub.EVENTS.DROPOFF:
        this.riderDroppedOff();
        break;
    }
  }

  setDestination(destination) {
    this.destination = destination;
  }

  riderPickedUp() {
    this.isRiderPickedUp = true;
  }

  rateDriver() {
    let toast = this.toastCtrl.create({
      message: 'Yeah, Job Done, Awesome Sakthi..!',
      duration: 3000,
      position: 'bottom'
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }

  riderDroppedOff() {
    this.rateDriver();
    this.isRiderPickedUp = false;
    this.isPickupRequested = false;
    this.destination = null;
    this.timeTillArrival = 5;
  }

  updateArrivalTime(seconds) {
    let minutes = Math.floor(seconds/60);
    this.timeTillArrival = minutes;
  }

  confirmPickup() {
    this.isPickupRequested = true;
  }

  cancelPickup() {
    this.isPickupRequested = false;
  }

}
