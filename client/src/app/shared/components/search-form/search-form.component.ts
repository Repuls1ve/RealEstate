import { Component } from '@angular/core'
import { ButtonTheme } from '../button/button.component'

export type SearchBranch = 'sell' | 'rent'

@Component({
  selector: 'search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss']
})
export class SearchFormComponent {
  public branch: SearchBranch = 'sell'

  public setBranch(branch: SearchBranch): void {
    this.branch = branch
  }

  public getTheme(current: SearchBranch): ButtonTheme {
    return this.branch == current ? 'contained' : 'outlined'
  }
}
