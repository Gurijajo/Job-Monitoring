import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ScheduleComponent } from '../schedule/schedule.component';
import { ScheduleformComponent } from '../scheduleform/scheduleform.component';
import { DashboardAdminComponent } from './dashboard-admin.component';
import { AdminRoutingModule } from './admin-routing.module';
import { RoleformComponent } from '../roleform/roleform.component';
import { FormsModule } from '@angular/forms';
import { JobformComponent } from '../jobform/jobform.component';

@NgModule({
  declarations: [
    DashboardAdminComponent,
    ScheduleformComponent,
    RoleformComponent,
    JobformComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ScheduleComponent,
    AdminRoutingModule,
    FormsModule,
  ],
})
export class AdminModule {}
