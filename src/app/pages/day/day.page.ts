import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { Booking } from 'src/app/models/booking';

@Component({
  selector: 'app-day',
  templateUrl: './day.page.html',
  styleUrls: ['./day.page.scss'],
})
export class DayPage implements OnInit {

  booking = {} as Booking;
  bookings = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.booking = this.router.getCurrentNavigation().extras.state.booking;
        console.log(this.booking);
      }
    });
  }

  ionViewWillEnter() {
    console.log("second is ionViewWillEnter");
  }


  //filter the day by selected in this page
  ngOnInit() {


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
