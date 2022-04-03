import { ComponentFixture, TestBed } from '@angular/core/testing'
import { NewestListingsComponent } from './newest-listings.component'

describe('ListingsComponent', () => {
  let component: NewestListingsComponent
  let fixture: ComponentFixture<NewestListingsComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewestListingsComponent ]
    })
    .compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(NewestListingsComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
