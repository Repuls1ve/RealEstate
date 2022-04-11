import { ChangeDetectionStrategy, Component, Input } from '@angular/core'
import { NewestListingsStore } from './newest-listings.store'

@Component({
  selector: 'newest-listings',
  templateUrl: './newest-listings.component.html',
  styleUrls: ['./newest-listings.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [NewestListingsStore]
})
export class NewestListingsComponent {
  public readonly vm$ = this.newestListingsStore.vm$

  @Input()
  public set quantity(value: number) {
    this.newestListingsStore.fetchListings(value)
  }

  constructor(private readonly newestListingsStore: NewestListingsStore) {}
}