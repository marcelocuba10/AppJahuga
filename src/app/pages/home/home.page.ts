import { Component } from '@angular/core';
import { Ground } from 'src/app/models/ground';
import { Booking } from '../../models/booking';
import { Router, NavigationExtras } from '@angular/router';

import { Observable } from 'rxjs';
import { ApiService } from './../../services/api.service';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {

  grounds: any;
  booking = {} as Booking;
  booking$: Observable<Booking[]>;
  //grounds$: Observable<Ground[]>;

  constructor(
    private router: Router,
    public apiService: ApiService,
    public appService: AppService
  ) {
    console.log('Load constructor');
  }

  ngOnInit() {
    console.log("Load ngOnInit");
  }

  async ionViewWillEnter() {
    console.log('Load ionViewWillEnter');
    //get grounds from api
    this.appService.presentLoading(1);
    this.apiService.getGrounds().subscribe(response => {
      this.grounds = response;

      //check if found grounds
      if (Array.isArray(this.grounds)) {
        this.appService.presentLoading(0);
        console.log(this.grounds);
      } else {
        this.appService.presentLoading(0);
        this.appService.presentAlert('Sin canchas disponibles por el momento');
        console.log("No results");
      }
    });
  }

  //send data for next page, in this case page day
  addBooking(ground: Ground) {
    this.booking.id = Date.now();
    this.booking.groundId = ground.id;
    this.booking.date = Date.now();

    let navigationExtras: NavigationExtras = {
      state: {
        booking: this.booking
      }
    };

    this.router.navigate(['day'], navigationExtras);
  }

}
