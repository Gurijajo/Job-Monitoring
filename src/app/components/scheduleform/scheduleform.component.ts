import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../../services/notification.service';
import { ScheduleService } from '../../services/schedule.service';
import { FormService } from '../../services/form.service';
import { AdminService } from '../../services/admin.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-scheduleform',
  templateUrl: './scheduleform.component.html',
  styleUrls: ['./scheduleform.component.css'],
})
export class ScheduleformComponent implements OnInit {
  unapprovedSchedules: any[] = [];
  numRequests = 0;
  approvedSchedules: any[] = [];

  ngOnInit(): void {
    this.loadSchedules();

    this.formService.getRefreshScheduleFormObservable().subscribe(() => {
      this.loadSchedules();
    });
  }

  constructor(
    private formService: FormService,
    private adminService: AdminService,
    private notificationService: NotificationService,
    private scheduleService: ScheduleService,
    private userService: UserService
  ) {}

  loadSchedules(): void {
    this.userService.getDashboard().subscribe(
      (data) => {
        const schedulesArr = Object.values(data);
        this.unapprovedSchedules = schedulesArr.filter(
          (i) => i.isApproved === false
        );
        this.approvedSchedules = schedulesArr.filter(
          (i) => i.isApproved === true
        );
        this.numRequests = this.unapprovedSchedules.length;
      },
      (error) => {
        console.error('Error fetching jobs:', error);
      }
    );
    this.formService.setUnapprovedSchedules(this.unapprovedSchedules);
  }

  approveSchedule(id: number): void {
    console.log('Before calling approveSchedule API');
    this.adminService.approveSchedule(id).subscribe({
      next: () => {
        console.log('After successful approval API response');
        this.notificationService.showSuccess('Schedule approved successfully!');
        this.fetchUnapprovedSchedules();
        this.scheduleService.refreshSchedule();
        this.formService.refreshScheduleForm();
      },
      error: (error) => {
        console.log('Error approving schedule:', error);
        this.notificationService.showInfo('Error approving schedule!');
      },
    });
    console.log('After calling approveSchedule API');
  }

  declineSchedule(id: number): void {
    this.adminService.declineSchedule(id).subscribe({
      next: () => {
        this.notificationService.showError('Schedule declined successfully!');
        this.fetchUnapprovedSchedules();
        this.scheduleService.refreshSchedule();
        this.formService.refreshScheduleForm();
      },
      error: (error) => {
        this.notificationService.showInfo('Error declining schedule!');
        console.log(error);
      },
    });
  }

  closeForm() {
    this.formService.closeForm();
  }

  private fetchUnapprovedSchedules(): void {
    this.unapprovedSchedules = this.formService.getUnapprovedSchedules();
  }
}
