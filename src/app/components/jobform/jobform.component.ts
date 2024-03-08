import { Component } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { NotificationService } from 'src/app/services/notification.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-jobform',
  templateUrl: './jobform.component.html',
  styleUrls: ['./jobform.component.css'],
})
export class JobformComponent {
  constructor(
    private userService: UserService,
    private adminService: AdminService,
    private notificationService: NotificationService
  ) {}

  Jobs: any[] = [];

  ngOnInit(): void {
    this.userService.getJobs().subscribe(
      (jobs: any[]) => {
        this.Jobs = this.processJobs(jobs);
      },
      (error) => {
        console.error('Error fetching jobs:', error);
      }
    );
  }

  private processJobs(jobs: any[]): any[] {
    return jobs;
  }

  deleteJob(jobId: number): void {
    this.adminService.deleteJob(jobId).subscribe(
      (response: any) => {
        this.notificationService.showError('Job deleted successfully!');
        console.log('Job deleted successfully:', response);
        this.refreshJobs();
      },
      (error: any) => {
        this.notificationService.showInfo('Error deleting job!');
        console.error('Error deleting job:', error);
      }
    );
  }

  private refreshJobs(): void {
    this.userService.getJobs().subscribe(
      (jobs: any[]) => {
        this.Jobs = jobs;
      },
      (error) => {
        console.error('Error fetching jobs:', error);
      }
    );
    setTimeout(() => {
      window.location.reload();
    }, 1500);
  }

  addJob(): void {
    const jobTitle = (document.getElementById('jobInput') as HTMLInputElement)
      .value;
    this.adminService.addJob(jobTitle).subscribe(
      (response: any) => {
        this.notificationService.showSuccess('Job added successfully!');
        console.log('Job added successfully:', response);
        this.refreshJobs();
      },
      (error: any) => {
        this.notificationService.showInfo('Error adding job!');
        console.error('Error adding job:', error);
      }
    );
  }
}
