import { ChangeDetectionStrategy, Component } from '@angular/core'
import { SearchFormParams } from '@shared/ui/search-form/search-form.store'
import { Review } from '../ui/home-reviews/home-reviews.store'
import { HomeStore } from './home.store'

const reviews: Review[] = [
  {
    id: 1,
    author: 'Park Tea Hyung',
    title: 'Nice and comfortable house for family 1',
    description:
      'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.',
    rating: 4
  },
  {
    id: 2,
    author: 'Park Tea Hyung',
    title: 'Nice and comfortable house for family 2',
    description:
      'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.',
    rating: 5
  },
  {
    id: 3,
    author: 'Park Tea Hyung',
    title: 'Nice and comfortable house for family 3',
    description:
      'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.',
    rating: 4
  }
]

@Component({
  selector: 'home-page',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [HomeStore]
})
export class HomePage {
  public readonly reviews = reviews

  constructor(private readonly homeStore: HomeStore) {}

  public onSearch(params: SearchFormParams): void {
    this.homeStore.onSearch(params)
  }
}
