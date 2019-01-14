import { Component, OnInit, Input } from '@angular/core';
import { CastService } from 'src/app/services/cast.service';

@Component({
  selector: 'app-cast',
  templateUrl: './cast.component.html',
  styleUrls: ['./cast.component.scss']
})
export class CastComponent implements OnInit {
  castingStatus: Object;
  @Input() image: string;

  constructor(private ngCastService: CastService) {}

  ngOnInit() {
    const script = window['document'].createElement('script');
    script.setAttribute('type', 'text/javascript');
    script.setAttribute(
      'src',
      'https://www.gstatic.com/cv/js/sender/v1/cast_sender.js?loadCastFramework=1'
    );
    window['document'].body.appendChild(script);

    const ngCastService = this.ngCastService;
    window['__onGCastApiAvailable'] = function(isAvailable) {
      console.log(isAvailable, this.ngCastService);
      if (isAvailable) {
        ngCastService.initializeCastApi();
      }
    };

    this.castingStatus = this.ngCastService.getStatus();

    console.log('casting image', this.image);
  }

  openSession() {
    console.log('nothing works');
    this.ngCastService.discoverDevices();
  }

  closeSession() {
    this.ngCastService.stop();
  }

  playImage() {
    this.ngCastService.launchMedia(
      // tslint:disable-next-line:max-line-length
      this.image
    );
  }
}
