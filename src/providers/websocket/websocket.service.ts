import { Injectable } from '@angular/core';
import * as Rx from 'rxjs/Rx';




@Injectable()
export class WebsocketService {

	private subject: Rx.Subject<MessageEvent>;

	constructor() {}

  	public connect(url): Rx.Subject<MessageEvent> {

    	if (!this.subject) {

			console.log("Conectando a: " + url);
			  this.subject = this.create(url);
			  
		} 
    	return this.subject;
  	}

  	private create(url): Rx.Subject<MessageEvent> {

		let ws = new WebSocket(url);

		let observable = Rx.Observable.create(
		(obs: Rx.Observer<MessageEvent>) => {
			ws.onmessage = obs.next.bind(obs);
			ws.onerror = obs.error.bind(obs);
			ws.onclose = obs.complete.bind(obs);
			return ws.close.bind(ws);
		}).retry();

		let observer = {
			next: (data: Object) => {
				if (ws.readyState === WebSocket.OPEN) {
					ws.send(JSON.stringify(data));
					console.log('data', data);
				}
				console.log('ws.readyState',ws.readyState);
			}
		}

		return Rx.Subject.create(observer, observable);

  	}

}


