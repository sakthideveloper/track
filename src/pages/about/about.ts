import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";

import {} from "googlemaps";

@IonicPage()
@Component({
  selector: "page-about",
  templateUrl: "about.html"
})
export class AboutPage {
  marker1;
  map: google.maps.Map;
  route;
  timerhandle;
  timers = [];

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    this.initialize();
  }

  initialize() {
    this.map = new google.maps.Map(document.getElementById("map"), {
      center: { lat: this.pathCoords[0].lat, lng: this.pathCoords[0].lng },
      zoom: 13,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    });

    let marker = new google.maps.Marker({
      position: new google.maps.LatLng(24.94676383440351, 67.13702201843262),
      map: this.map
    });
    marker = new google.maps.Marker({
      position: new google.maps.LatLng(24.94276562875255, 67.18474388122559),
      map: this.map,
      icon: "../assets/imgs/home.png"
    });
  }

  moveMarker(map, marker1, latlng) {
    marker1.setPosition(latlng);
    map.panTo(latlng);
  }
  autoRefresh(map) {
    let i;
    this.route = new google.maps.Polyline({
      path: [],
      geodesic: true,
      strokeColor: "#000000",
      strokeOpacity: 1.0,
      strokeWeight: 2,
      editable: false,
      map: map
    });

    this.marker1 = new google.maps.Marker({
      map: this.map,
      position: new google.maps.LatLng(24.94676383440351, 67.13702201843262),
      icon: "../assets/imgs/bike.png"
    });

    for (i = 0; i < this.pathCoords.length; i++) {
      let timerhandle = setTimeout(coords => {
          var latlng = new google.maps.LatLng(coords.lat, coords.lng);
          this.route.getPath().push(latlng);
          this.moveMarker(this.map, this.marker1, latlng);
        },
        300 * i,
        this.pathCoords[i]
      );
      this.timers.push(timerhandle);
    }
  }

  stop() {
    for (let i = 0; i < this.timers.length; i++) {
      clearTimeout(this.timers[i]);
    }
    this.route.setMap(null);
    this.marker1.setMap(null);
    this.marker1 = [];
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
    },
    {
      lat: 24.946744378729154,
      lng: 67.13951110839844
    },
    {
      lat: 24.947308592037547,
      lng: 67.14011192321777
    },
    {
      lat: 24.94783389175996,
      lng: 67.1405839920044
    },
    {
      lat: 24.948417555490515,
      lng: 67.14116334915161
    },
    {
      lat: 24.94902067177291,
      lng: 67.14184999465942
    },
    {
      lat: 24.949740516372685,
      lng: 67.14257955551147
    },
    {
      lat: 24.94909849301358,
      lng: 67.14345932006836
    },
    {
      lat: 24.948631564832016,
      lng: 67.14403867721558
    },
    {
      lat: 24.948106268511754,
      lng: 67.14472532272339
    },
    {
      lat: 24.94752260330603,
      lng: 67.14545488357544
    },
    {
      lat: 24.946783290074784,
      lng: 67.14635610580444
    },
    {
      lat: 24.945907781824943,
      lng: 67.14740753173828
    },
    {
      lat: 24.944993355453292,
      lng: 67.14860916137695
    },
    {
      lat: 24.943709255897694,
      lng: 67.15015411376953
    },
    {
      lat: 24.941763625005482,
      lng: 67.15279340744019
    },
    {
      lat: 24.940401665098086,
      lng: 67.15451002120972
    },
    {
      lat: 24.939309654225738,
      lng: 67.15601205825806
    },
    {
      lat: 24.939275604733375,
      lng: 67.15608447790146
    },
    {
      lat: 24.939239123123972,
      lng: 67.1561998128891
    },
    {
      lat: 24.939275604733375,
      lng: 67.15641438961029
    },
    {
      lat: 24.939331543180167,
      lng: 67.15677112340927
    },
    {
      lat: 24.939565025118608,
      lng: 67.157261967659
    },
    {
      lat: 24.94012927130989,
      lng: 67.15838849544525
    },
    {
      lat: 24.940328702535293,
      lng: 67.15898394584656
    },
    {
      lat: 24.940338430879503,
      lng: 67.15927362442017
    },
    {
      lat: 24.940260604104388,
      lng: 67.16037333011627
    },
    {
      lat: 24.940231419051027,
      lng: 67.1607381105423
    },
    {
      lat: 24.940343295051314,
      lng: 67.16156959533691
    },
    {
      lat: 24.94059623172093,
      lng: 67.16286242008209
    },
    {
      lat: 24.940868624476717,
      lng: 67.164106965065
    },
    {
      lat: 24.941213978712003,
      lng: 67.16572701931
    },
    {
      lat: 24.94161283732836,
      lng: 67.16765820980072
    },
    {
      lat: 24.9421478895418,
      lng: 67.17001855373383
    },
    {
      lat: 24.942318132940574,
      lng: 67.17079639434814
    },
    {
      lat: 24.942770492828537,
      lng: 67.17302799224854
    },
    {
      lat: 24.943203394821786,
      lng: 67.17518985271454
    },
    {
      lat: 24.94359251891071,
      lng: 67.17712104320526
    },
    {
      lat: 24.943864905041604,
      lng: 67.17803835868835
    },
    {
      lat: 24.944969035510336,
      lng: 67.17934727668762
    },
    {
      lat: 24.94623853011741,
      lng: 67.18083322048187
    },
    {
      lat: 24.946885432298547,
      lng: 67.1815949678421
    },
    {
      lat: 24.94726481695956,
      lng: 67.1820455789566
    },
    {
      lat: 24.94776336553854,
      lng: 67.18263298273087
    },
    {
      lat: 24.94821813736032,
      lng: 67.1832150220871
    },
    {
      lat: 24.949594602266778,
      lng: 67.18494772911072
    },
    {
      lat: 24.950115028453187,
      lng: 67.18566656112671
    },
    {
      lat: 24.949983706165003,
      lng: 67.18631565570831
    },
    {
      lat: 24.949993433746716,
      lng: 67.18661069869995
    },
    {
      lat: 24.95001775269762,
      lng: 67.18688428401947
    },
    {
      lat: 24.94977942677173,
      lng: 67.18697547912598
    },
    {
      lat: 24.949623785101817,
      lng: 67.18683063983917
    },
    {
      lat: 24.94943896036326,
      lng: 67.18671262264252
    },
    {
      lat: 24.94925413534736,
      lng: 67.18659996986389
    },
    {
      lat: 24.94814517942712,
      lng: 67.18636393547058
    },
    {
      lat: 24.946627644618534,
      lng: 67.18611717224121
    },
    {
      lat: 24.94444858757967,
      lng: 67.18583822250366
    },
    {
      lat: 24.942609978219703,
      lng: 67.18559145927429
    },
    {
      lat: 24.94276562875255,
      lng: 67.18474388122559
    }
  ];
}
