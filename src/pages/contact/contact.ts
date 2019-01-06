import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";

/**
 * Generated class for the ContactPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-contact",
  templateUrl: "contact.html"
})
export class ContactPage {
  messageSuccess: boolean;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.messageSuccess = true;


    for (let index = 0; index < this.pathCoords.length; index++) {
      const element = this.pathCoords[index];

      setTimeout(val => {
        console.log("messageSuccess val", val);
        console.log("element val", element);
        this.messageSuccess = false;
      },  3000 * index, element);
    }
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad ContactPage");
  }

  pathCoords = [
    {
      lat: 24.94676383440351,
      lng: 67.13702201843262
    },
    {
      lat: 24.945829958568236,
      lng: 67.13824510574341
    },
    {
      lat: 24.94567431190732,
      lng: 67.13839530944824
    },
    {
      lat: 24.946121795527365,
      lng: 67.13893175125122
    }
  ]
}
