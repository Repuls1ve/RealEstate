import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core'
import { ProductTranslateFormStore } from './product-translate-form.store'

@Component({
  selector: 'product-translate-form',
  templateUrl: './product-translate-form.component.html',
  styleUrls: ['./product-translate-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ProductTranslateFormStore]
})
export class ProductTranslateFormComponent implements OnInit {
  public readonly vm$ = this.productTranslateFormStore.vm$

  @Input()
  public set formGroupName(value: string) {
    this.productTranslateFormStore.setFormGroupName(value)
  }

  constructor(private readonly productTranslateFormStore: ProductTranslateFormStore) {}

  public ngOnInit(): void {
    this.setupForm()
  }

  public addOverview(): void {
    this.productTranslateFormStore.addOverview()
  }

  private setupForm(): void {
    this.productTranslateFormStore.setupForm()
  }
}
