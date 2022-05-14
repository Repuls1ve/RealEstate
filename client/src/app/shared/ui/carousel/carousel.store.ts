import { EventEmitter, Injectable } from '@angular/core'
import { ComponentStore } from '@ngrx/component-store'
import { filter, map, Observable, tap } from 'rxjs'

export interface CarouselImage {
  readonly id: number
  readonly source: string
  readonly alt: string
  readonly isActive: boolean
}

export interface CarouselState {
  readonly images: CarouselImage[]
}

export const MockImages: CarouselImage[] = [
  {
    id: 1,
    source:
      'https://img.gtsstatic.net/reno/imagereader.aspx?imageurl=https%3A%2F%2Fsir.azureedge.net%2F977i215%2Fvek4hby1cxf8m6ppvhv9g81ay5i215&option=N&permitphotoenlargement=false&w=1600',
    alt: 'Carousel Item',
    isActive: true
  },
  {
    id: 2,
    alt: 'Carousel Item 2',
    source:
      'https://img.gtsstatic.net/reno/imagereader.aspx?imageurl=https%3A%2F%2Fsir.azureedge.net%2F977i215%2Fec9ysebdddpj4s26rzr833zep2i215&option=N&permitphotoenlargement=false&w=1200',
    isActive: false
  },
  {
    id: 3,
    alt: 'Carousel Item 3',
    source:
      'https://img.gtsstatic.net/reno/imagereader.aspx?imageurl=https%3A%2F%2Fsir.azureedge.net%2F977i215%2Fdrma9wtpyjd142th9s14b0pqa6i215&option=N&permitphotoenlargement=false&w=1600',
    isActive: false
  },
  {
    id: 4,
    alt: 'Carousel Item 4',
    source:
      'https://img.gtsstatic.net/reno/imagereader.aspx?imageurl=https%3A%2F%2Fsir.azureedge.net%2F977i215%2Fvx86aqg6z8f5m4pt2e0eakn743i215&option=N&permitphotoenlargement=false&w=1600',
    isActive: false
  },
  {
    id: 5,
    alt: 'Carousel Item 5',
    source:
      'https://img.gtsstatic.net/reno/imagereader.aspx?imageurl=https%3A%2F%2Fsir.azureedge.net%2F977i215%2Fv6snnrx459gh4tp8qpa8enn7z3i215&option=N&permitphotoenlargement=false&w=1600',
    isActive: false
  }
]

@Injectable()
export class CarouselStore extends ComponentStore<CarouselState> {
  constructor() {
    super({
      images: MockImages
    })
  }

  public readonly slide$ = new EventEmitter<CarouselImage[]>()

  public readonly setImages = this.updater((state, values: CarouselImage[]) => ({
    ...state,
    images: values
  }))

  public readonly images$ = this.select(state => state.images)

  public readonly activeImage$ = this.select(state => state.images.find(image => image.isActive)!)

  public readonly vm$ = this.select(this.images$, this.activeImage$, (images, active) => ({
    images,
    active
  }))

  public readonly selectImage = this.effect((image$: Observable<CarouselImage>) =>
    image$.pipe(
      filter(image =>
        this.get()
          .images.map(target => target.id)
          .includes(image.id)
      ),
      map(image =>
        this.get().images.map(target =>
          target.id == image.id ? { ...image, isActive: true } : { ...target, isActive: false }
        )
      ),
      tap(images => this.setImages(images)),
      tap(images => this.slide$.emit(images))
    )
  )

  public readonly nextImage = this.effect(origin$ =>
    origin$.pipe(
      map(() => this.get().images),
      map(images => {
        const isLastActive = images[images.length - 1].isActive
        const activeImage = images.find(image => image.isActive)!

        if (isLastActive) {
          return images[0]
        }

        return images.find(image => image.id == activeImage.id + 1)!
      }),
      tap(next => this.selectImage(next))
    )
  )

  public readonly previousImage = this.effect(origin$ =>
    origin$.pipe(
      map(() => this.get().images),
      map(images => {
        const isFirstActive = images[0].isActive
        const activeImage = images.find(image => image.isActive)!

        if (isFirstActive) {
          return images[images.length - 1]
        }

        return images.find(image => image.id == activeImage.id - 1)!
      }),
      tap(previous => this.selectImage(previous))
    )
  )
}
