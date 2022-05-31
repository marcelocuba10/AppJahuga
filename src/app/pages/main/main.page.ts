import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {

  //important call MenuController, show icon "menu"
  constructor(
    private menu: MenuController,
  ) {
    this.menu.enable(true);
  }

  ngOnInit() {
  }

}
