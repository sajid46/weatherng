import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'windDirection',
})
export class WindDirectionPipe implements PipeTransform {
  transform(value: number, ...args: unknown[]): unknown {
    if (value == 360) return 'N';
    if (value >= 315) return 'NW';
    if (value >= 270 ) return 'W';
    if (value >= 225) return 'SW';
    if (value >= 180) return 'S';
    if (value >= 135) return 'SE';
    if (value >= 90) return 'E';
    if (value >= 45) return 'NE';
    if (value >= 0) return 'N';
    return null;
  }
}
