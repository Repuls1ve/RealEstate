import { NgModule } from '@angular/core'
import { SharedModule } from 'src/app/shared/shared.module';
import { FeedbackRoutingModule } from './routing/feedback-routing.module'
import { FeedbackComponent } from './views/feedback/feedback.component'

@NgModule({
  declarations: [
    FeedbackComponent
  ],
  imports: [
    FeedbackRoutingModule,
    SharedModule
  ]
})
export class FeedbackModule {}
