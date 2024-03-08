import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { NotificationService } from 'src/app/services/notification.service';
import { ScheduleService } from 'src/app/services/schedule.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  standalone: true,
  imports: [RouterLink, CommonModule],
})
export class ModalComponent {
  constructor(
    private router: Router,
    private notificationService: NotificationService,
    private adminService: AdminService,
    private scheduleService: ScheduleService
  ) {}

  modalType = this.notificationService.getModalState().typeM;
  id = this.notificationService.getModalState().id;

  sign = '';
  msg = '';
  link: string | undefined = '';
  color = '';
  linkMsg = '';

  hideModal() {
    this.notificationService.hideModal();
    if (this.link) {
      this.router.navigate([this.link]);
    }
  }

  deleteSchedule() {
    if (this.id) {
      console.log(this.id);
      this.adminService.declineSchedule(this.id).subscribe(
        () => {
          this.notificationService.showSuccess(
            `shift #${this.id} deleted successfully`
          );
          this.scheduleService.refreshSchedule();
        },
        () => {
          console.log('smth went wring');
        }
      );
    }
  }

  ngOnInit(): void {
    console.log(this.modalType);
    if (this.modalType === 'register-scs') {
      this.sign =
        'M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z';
      this.msg = 'Account created successfully';
      this.link = '/sign-in';
      this.linkMsg = 'Continue to Login';
      this.color = '#00b990';
    } else if (this.modalType === 'register-error') {
      this.sign =
        'M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293z';
      this.msg = 'Whoops, email has been already used';
      this.link = undefined;
      this.linkMsg = 'Sign up again';
      this.color = 'red';
    } else if (this.modalType === 'login-error') {
      this.sign =
        'M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293z';
      this.msg = 'Incorrect credentials!';
      this.link = undefined;
      this.linkMsg = 'Sign in again';
      this.color = 'red';
    } else if (this.modalType === 'del-request') {
      this.sign =
        'M4 .5a.5.5 0 0 0-1 0V1H2a2 2 0 0 0-2 2v1h16V3a2 2 0 0 0-2-2h-1V.5a.5.5 0 0 0-1 0V1H4zM16 14V5H0v9a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2M6.854 8.146 8 9.293l1.146-1.147a.5.5 0 1 1 .708.708L8.707 10l1.147 1.146a.5.5 0 0 1-.708.708L8 10.707l-1.146 1.147a.5.5 0 0 1-.708-.708L7.293 10 6.146 8.854a.5.5 0 1 1 .708-.708';
      this.msg = 'Want to delete schedule #' + this.id + '?';
      this.color = 'red';
      this.link = undefined;
    }
  }
}
