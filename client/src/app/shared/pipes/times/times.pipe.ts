import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
  name: 'times'
})
export class TimesPipe implements PipeTransform {
  public transform(value: number): number[] {
    return Array.from(Array(value).keys())
  }
}
