import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { Booking } from 'src/app/models/booking';
import { ApiService } from 'src/app/services/api.service';
import { AppService } from 'src/app/services/app.service';

import { map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-day',
  templateUrl: './day.page.html',
  styleUrls: ['./day.page.scss'],
})
export class DayPage implements OnInit {

  booking = {} as Booking;
  bookings = [];
  ground: any = [];
  //days = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado', 'Domingo'];
  days_selected = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public apiService: ApiService,
    private appService: AppService,
  ) {

    //we receive the data that comes from page home
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.booking = this.router.getCurrentNavigation().extras.state.booking;
        console.log(this.booking);
      }
    });

    console.log("Loading constructor");
    this.getDays();
  }

  public getDays() {

    this.appService.presentLoading(1);
    this.apiService.getGroundById(this.booking.groundId).subscribe(response => {
      this.ground = response;
      this.appService.presentLoading(0);
      this.days_selected = this.ground.day;
    });
  }

  ionViewWillEnter() {

    console.log("Loading ionViewWillEnter");
    this.getDays();

    // let missing = this.days.filter(item => a1.indexOf(item) < 0);
    // console.log(missing);

    // let missing2 = this.days.filter(item => this.days_selected.indexOf(item) < 0);
    // console.log(missing2);
  }

  ngOnInit() {
    console.log("Loading ngOnInit");
  }

  addBooking(day: string) {

    //save parameter data selected in array booking
    this.booking.day = day;
    //prepare data for send next page
    let navigationExtras: NavigationExtras = {
      state: {
        booking: this.booking
      }
    };
    this.router.navigate(['schedule'], navigationExtras);
  }

}
