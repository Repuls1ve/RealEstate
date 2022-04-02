import { ComponentFixture, TestBed } from '@angular/core/testing'
import { BenefitsComponent } from './benefits.component'

describe('BenefitsSectionComponent', () => {
  let component: BenefitsComponent
  let fixture: ComponentFixture<BenefitsComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BenefitsComponent ]
    })
    .compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(BenefitsComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
