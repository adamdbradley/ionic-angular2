import {bootstrap, Component, Decorator, Template, NgElement} from 'angular2/angular2';

@Component({selector: 'ionic-app'})
@Template({
  url: 'ionicApp.html',
  directives: [IonHeaderBarCmp]
})
class IonicCmp {
  constructor() {

  }
}


@Component({selector: 'ion-header-bar'})
@Template({url: 'ionHeaderBar.html'})
class IonHeaderBarCmp {
  constructor() {
    console.log('ionHeaderBar')
  }
}


export function main() {
  bootstrap(IonicCmp);
}
