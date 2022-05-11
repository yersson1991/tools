import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'formatTime'
})
export class FormatTimePipe implements PipeTransform {
  transform(value: any): string {
    return moment(value).format('h:mm a');
  }
}