import { ChangeDetectionStrategy, Component, Input, Output } from '@angular/core'
import { CarouselImage, CarouselStore } from './carousel.store'

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [CarouselStore]
})
export class CarouselComponent {
  public readonly vm$ = this.carouselStore.vm$

  @Input()
  public set images(values: CarouselImage[]) {
    this.carouselStore.setImages(values)
  }

  @Output()
  public readonly slide = this.carouselStore.slide$

  constructor(private readonly carouselStore: CarouselStore) {}

  public selectImage(image: CarouselImage): void {
    this.carouselStore.selectImage(image)
  }

  public nextImage(): void {
    this.carouselStore.nextImage()
  }

  public previousImage(): void {
    this.carouselStore.previousImage()
  }
}
