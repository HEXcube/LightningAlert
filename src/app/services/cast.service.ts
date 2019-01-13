import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CastService {
  private castSession;
  private cast;
  public status = {
    casting: false
  };

  constructor() {}

  initializeCastApi() {
    this.cast = window['chrome'].cast;
    const sessionRequest = new this.cast.SessionRequest(
      this.cast.media.DEFAULT_MEDIA_RECEIVER_APP_ID
    );
    const apiConfig = new this.cast.ApiConfig(
      sessionRequest,
      s => {},
      status => {
        if (status === this.cast.ReceiverAvailability.AVAILABLE) {
        }
      }
    );
    const x = this.cast.initialize(apiConfig, this.onInitSuccess, this.onError);
  }

  onInitSuccess = function(e) {
    console.log('GCast initialization success');
  };

  onError = function(err) {
    console.log('GCast initialization failed', err);
  };

  discoverDevices = function() {
    const self = this;
    const subj = new Subject();
    this.cast.requestSession(
      function(s) {
        self.session = s;
        self.setCasting(true);
        subj.next('CONNECTED');
      },
      function(err) {
        self.setCasting(false);
        if (err.code === 'cancel') {
          self.session = undefined;
          subj.next('CANCEL');
        } else {
          console.error('Error selecting a cast device', err);
        }
      }
    );
    return subj;
  };

  launchMedia = function(media) {
    const mediaInfo = new this.cast.media.MediaInfo(media);
    const request = new this.cast.media.LoadRequest(mediaInfo);
    console.log('launch media with session', this.session);

    if (!this.session) {
      window.open(media);
      return false;
    }
    this.session.loadMedia(
      request,
      this.onMediaDiscovered.bind(this, 'loadMedia'),
      this.onMediaError
    );
    return true;
  };

  onMediaDiscovered = function(how, media) {
    this.currentMedia = media;
  };

  play = function() {
    this.currentMedia.play(null);
  };

  pause = function() {
    this.currentMedia.pause(null);
  };

  stop = function() {
    this.currentMedia.stop(null);
  };

  onMediaError = function(err) {
    console.error('Error launching media', err);
  };

  setCasting(value) {
    this.status.casting = value;
  }

  getStatus() {
    return this.status;
  }
}
