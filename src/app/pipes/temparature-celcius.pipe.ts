import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'temparatureCelcius'
})
export class TemparatureCelciusPipe implements PipeTransform {

  transform(value: number, ...args: unknown[]): unknown {
    return Math.round(value - 273.15);
  }

}
