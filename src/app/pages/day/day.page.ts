import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { Booking } from 'src/app/models/booking';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-day',
  templateUrl: './day.page.html',
  styleUrls: ['./day.page.scss'],
})
export class DayPage implements OnInit {

  booking = {} as Booking;
  bookings = [];
  ground: any;
  days = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado', 'Domingo'];
  //days_selected = [];
  days_selected: [number, string];
  days_show:any =  [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public apiService: ApiService,
  ) {
    //we receive the data that comes from page home
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.booking = this.router.getCurrentNavigation().extras.state.booking;
        console.log(this.booking);
      }
    });

    console.log("Loading constructor");
    this.compareDays();


    this.days_show = this.days.filter(item => this.days_selected.indexOf(item) < 0);
    console.log(this.days_show);
  }

  async compareDays() {

    this.apiService.getGroundById(this.booking.groundId).subscribe(response => {
      this.ground = response;
      this.days_selected = this.ground.day;
      
      return this.days_selected;
    });
  }

  ionViewWillEnter() {
    console.log("Loading ionViewWillEnter");

    this.compareDays();

  }

  public daysColors() {

    //let a1 = ['Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado', 'Domingo'];

    // var array1 = ["Panda", "Zebra", "Lion", "Cat", "Dog", "Fish", "whatever", "Bird"];
    // var array2 = ["Panda", "Cat"];

    // function checkAvailability(arr, val) {
    //   return arr.some(function (arrVal) {
    //     return val !== arrVal;
    //   });
    // }

    // for (let entry of array1) {
    //   if (checkAvailability(array2, entry)) {
    //     console.log(entry);
    //     //break, we have the first match which is all we need. Include this news article result or whatever logic needs to happen
    //   }
    // }


    // let missing = this.days.filter(item => a1.indexOf(item) < 0);
    // console.log(missing);

    let missing2 = this.days.filter(item => this.days_selected.indexOf(item) < 0);
    console.log(missing2);


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
