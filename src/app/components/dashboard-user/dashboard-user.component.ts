import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NotificationService } from '../../services/notification.service';
import { UserService } from '../../services/user.service';
import { ScheduleComponent } from '../schedule/schedule.component';
import { TokenService } from '../../services/token.service';
import { ScheduleService } from 'src/app/services/schedule.service';

@Component({
  selector: 'app-dashboard-user',
  templateUrl: './dashboard-user.component.html',
  styleUrls: ['./dashboard-user.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, ScheduleComponent],
})
export class DashboardUserComponent {
  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    private notificationService: NotificationService,
    private tokenService: TokenService,
    private scheduleService: ScheduleService
  ) {}

  users: any[] = [];
  scheduleForm!: FormGroup;
  scheduleDate: string = '';
  selectedShift: 'morning' | 'evening' = 'morning';
  schedules: any[] = [];

  ngOnInit() {
    this.createForm();

    this.scheduleService.getAllSchedules().subscribe(
      (data) => {
        this.schedules = data;
      },
      (error) => {
        console.error('Error fetching schedules:', error);
      }
    );
    console.log('check');
  }

  // ngDoCheck() {
  //   console.log(this.scheduleForm.get('startTime')?.value);
  //   console.log(this.scheduleForm.get('endTime')?.value);
  // }

  createForm() {
    this.scheduleForm = this.fb.group({
      startTime: [0],
      endTime: [0],
      userId: [0],
    });
  }

  setShift(shift: 'morning' | 'evening') {
    this.selectedShift = shift;

    const shiftTimes = {
      morning: { startTime: 8, endTime: 16 },
      evening: { startTime: 16, endTime: 8 },
    };

    this.scheduleForm.patchValue(shiftTimes[shift]);
  }

  addSchedule() {
    const user = this.tokenService.getUser();

    if (!user) {
      console.error(
        'User ID is not present or has an invalid format in the decoded token.'
      );
      return;
    }

    const sShift =
      this.scheduleForm.get('startTime')?.value === 8 ? '08' : '16';
    const eShift = this.scheduleForm.get('endTime')?.value === 8 ? '08' : '16';

    let finishDate = new Date(this.scheduleDate);
    if (sShift === '16') {
      finishDate.setDate(finishDate.getDate() + 1);
    }
    const shiftFinishDate = finishDate.toISOString().slice(0, -14);

    const startTime = `${this.scheduleDate}T${sShift}:00:00`;
    const endTime = `${shiftFinishDate}T${eShift}:00:00`;

    if (this.schedules.some((s) => s.startTime === startTime)) {
      this.notificationService.showError('Schedule is already taken!');
      this.scheduleForm.reset();
      return;
    }
    const scheduleData = {
      startTime,
      endTime,
      userId: +user.userId,
    };

    this.userService.addScheduleRequest(scheduleData).subscribe({
      next: (response) => {
        console.log('Schedule requested successfully:', response);
        this.notificationService.showSuccess(
          'Schedule requested successfully!'
        );
      },
      error: (error) => {
        console.error('Error adding schedule:', error);
      },
    });
  }
}
