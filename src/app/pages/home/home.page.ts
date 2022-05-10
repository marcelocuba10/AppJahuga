import { Component } from '@angular/core';
import { Ground } from 'src/app/models/ground';
import { Booking } from '../../models/booking';
import { Router, NavigationExtras } from '@angular/router';

import { Observable } from 'rxjs';
import { ApiService } from './../../services/api.service';

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
  ) { }

  ionViewWillEnter() {
    this.apiService.getGrounds().subscribe(response => {
      this.grounds = response;
      console.log(this.grounds);
    });
  }

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
