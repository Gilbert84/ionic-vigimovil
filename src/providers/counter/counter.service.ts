import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';




@Injectable()
export class CounterService {


	constructor() {
		console.log('obteniendo info de wsService');

	}
}