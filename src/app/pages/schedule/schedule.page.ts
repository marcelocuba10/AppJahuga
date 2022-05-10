import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { Booking } from 'src/app/models/booking';
import { Schedule } from 'src/app/models/schedule';
import { Subscription } from 'rxjs';
import { AppService } from 'src/app/services/app.service';
import { ApiService } from 'src/app/services/api.service';


@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.page.html',
  styleUrls: ['./schedule.page.scss'],
})
export class SchedulePage implements OnInit {

  booking = {} as Booking;
  //schedule = {} as Schedule;
  bookings = [];
  schedules = [];
  reserved = [];
  notReserved = [];
  daySelected = [];
  private schedulesSubscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apiService: ApiService
  ) {

    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.booking = this.router.getCurrentNavigation().extras.state.booking;
        console.log("constructor inicia 2do");
        console.log(this.booking);
      }
    });

  }

  //filter the day by selected in this page
  ngOnInit() {

  }

  ionViewWillEnter() {

    console.log("primero ionViewWillEnter");

    //get schedules
    this.apiService.getSchedules().subscribe(res => {
      this.schedules = res;
      console.log("muestra todos los horarios")
      console.log(this.schedules);
    });

    //get all bookings
    this.apiService.getBookings().subscribe(res => {
      this.bookings = res;

      console.log("muestra todos las reservas")
      console.log(this.bookings);

      //filter & save bookings by day selected in array
      console.log("filter booking by day selected")
      let i = 0;
      this.bookings.forEach(element => {
        if (element['day'] == this.booking.day) {

          this.daySelected[i] = element;
          i++;

        } else {
          console.log("not day found select or day not same");
          i++;
        }

      });

      console.log("day booking selected");
      console.log(this.daySelected);

      let b = 0;
      this.daySelected.forEach(element => {
        console.log('for dayselected');
        this.schedules.forEach(item => {
          if (element['schedule'] == item['name']) {
            console.log('schedule not available');
            item['status'] = null;
          }
        })
      });

      // let c = 0;
      // this.reserved.forEach(element => {
      //   this.schedules.forEach(item => {
      //     if (element['schedule'] !== item['name']) {
      //       //console.log(element);
      //       this.notReserved[c] = item;
      //       c++;
      //     }
      //     else {
      //       console.log("es igual");
      //       c++;
      //     }
      //   })
      // });

      console.log(this.schedules)

    });
  }

  addBooking(schedule:any) {

    //save parameter data selected in array booking
    this.booking.schedule = schedule;
    //prepare data for send next page
    let navigationExtras: NavigationExtras = {
      state: {
        booking: this.booking
      }
    };
    this.router.navigate(['details'], navigationExtras);

  }

}
