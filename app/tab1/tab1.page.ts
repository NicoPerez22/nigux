import { Component, ViewChild } from '@angular/core';
import { IonInfiniteScroll } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  // @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  constructor() {}

  segmentChanged(ev: any) {
    console.log('Segment changed', ev);
  }
  
  
  // loadData(event) {
  //   setTimeout(() => {
  //     console.log('Done');
  //     event.target.complete();

  //     // App logic to determine if all data is loaded
  //     // and disable the infinite scroll
  //     if (data.length == 1000) {
  //       event.target.disabled = true;
  //     }
  //   }, 500);
  // }

  // toggleInfiniteScroll() {
  //   this.infiniteScroll.disabled = !this.infiniteScroll.disabled;
  // }
}
