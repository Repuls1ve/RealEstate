import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { PageEvent } from 'src/app/shared/ui/paginator/paginator.store'
import { AgencyListParams, AgencyListStore } from './agency-list.store'

@Component({
  selector: 'agency-list-page',
  templateUrl: './agency-list.page.html',
  styleUrls: ['./agency-list.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [AgencyListStore]
})
export class AgencyListPage implements OnInit {
  public readonly vm$ = this.agencyListStore.vm$

  constructor(
    private readonly agencyListStore: AgencyListStore,
    private readonly route: ActivatedRoute,
    private readonly router: Router
  ) {}

  public ngOnInit(): void {
    this.observeParamsChange()
  }

  public changePage(event: PageEvent): void {
    const queryParams: Pick<AgencyListParams, 'page'> = { page: String(++event.pageIndex) }

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: queryParams,
      queryParamsHandling: 'merge'
    })
  }

  private observeParamsChange(): void {
    this.route.queryParams.subscribe(params => 
      this.agencyListStore.fetchAgencies(params)
    )
  }
}