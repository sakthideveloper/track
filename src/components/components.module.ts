import { NgModule } from '@angular/core';
import { AvailableCarsComponent } from './available-cars/available-cars';
import { DestinationAddressComponent } from './destination-address/destination-address';
import { MapComponent } from './map/map';
import { PickupComponent } from './pickup/pickup';
import { PickupCarComponent } from './pickup-car/pickup-car';
import { IonicModule } from 'ionic-angular';
@NgModule({
	declarations: [AvailableCarsComponent,
    DestinationAddressComponent,
    MapComponent,
    PickupComponent,
    PickupCarComponent],
	imports: [IonicModule],
	exports: [AvailableCarsComponent,
    DestinationAddressComponent,
    MapComponent,
    PickupComponent,
    PickupCarComponent]
})
export class ComponentsModule {}
