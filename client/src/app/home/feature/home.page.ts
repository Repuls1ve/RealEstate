import { ChangeDetectionStrategy, Component } from '@angular/core'
import { SearchFormParams } from 'src/app/shared/ui/search-form/search-form.component'
import { HomeStore } from './home.store'

@Component({
  selector: 'home-page',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [HomeStore]
})
export class HomePage {
  constructor(private readonly homeStore: HomeStore) {}

  public onSearch(params: SearchFormParams): void {
    this.homeStore.onSearch(params)
  }
}