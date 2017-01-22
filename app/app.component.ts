import { Component } from '@angular/core';
import { Observable }  from 'rxjs/Observable';



import { Buttons } from './shared/buttons';
import { ButtonService } from './shared/button.service';

import { GridService } from './shared/grid.service';


@Component({
 // moduleId: module.id,
  selector: 'my-app',
  templateUrl: 'app/app.component.html',
  styleUrls: ['app/app.component.css'],
  providers: [ButtonService]
})

export class AppComponent {

  constructor(
    private btnService: ButtonService
  ) {

    btnService.buttonOutput$
      .debounceTime(200)
      .subscribe(n => this.updatePos(n));


  };

//  router: any;

  //btnPos;
 //

  updateGrid() {
    for (let el in this.btnPos) {
      this.btnPos[el].update();
    }
  }

  updatePos(pos) {
    for (let el in this.btnPos) {
      let extra = pos[el][2] ?
          pos[el][2] : {reset: true};
      this.btnPos[el].setPos(pos[el], extra);
    }
  }

  isLoaded: boolean = false;
  btnPos: Buttons = {home: null,about: null,folio: null,framer: null};

  ngOnInit(): void {



    ['home', 'about','folio','framer']
      .forEach(el => this.btnPos[el] = new GridService());


    Observable.fromEvent(window, 'resize')
      .debounceTime(200)
      .subscribe(e => this.updateGrid());
  }
}
