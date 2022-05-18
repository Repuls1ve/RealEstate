import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core'
import { HomeReviewsStore, Review } from './home-reviews.store'

@Component({
  selector: 'home-reviews',
  templateUrl: './home-reviews.component.html',
  styleUrls: ['./home-reviews.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [HomeReviewsStore]
})
export class HomeReviewsComponent implements OnInit {
  public readonly vm$ = this.homeReviewsStore.vm$

  @Input()
  public set reviews(value: Review[]) {
    this.homeReviewsStore.setReviews(value)
  }

  constructor(private readonly homeReviewsStore: HomeReviewsStore) {}

  public ngOnInit(): void {
    this.selectFirstReview()
  }

  public selectReview(id: Review['id']): void {
    this.homeReviewsStore.selectReview(id)
  }

  public selectFirstReview(): void {
    this.homeReviewsStore.selectFirstReview()
  }

  public selectLastReview(): void {
    this.homeReviewsStore.selectLastReview()
  }

  public nextReview(): void {
    this.homeReviewsStore.nextReview()
  }

  public previousReview(): void {
    this.homeReviewsStore.previousReview()
  }
}
