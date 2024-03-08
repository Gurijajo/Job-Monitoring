import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { AdminService } from '../../services/admin.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-roleform',
  templateUrl: './roleform.component.html',
  styleUrls: ['./roleform.component.css'],
})
export class RoleformComponent {
  userData: any[] = [];

  selectedRoleIds: { [userId: number]: number } = {};
  roleOptions: any[] = [
    { id: 1, title: 'Admin' },
    { id: 2, title: 'Worker' },
  ];

  constructor(
    private userService: UserService,
    private adminService: AdminService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.userService.getUsers().subscribe(
      (users: any[]) => {
        this.userData = this.processUserData(users);

        this.userData.forEach((user) => {
          if (user.firstName.toLowerCase() !== 'admin') {
            this.selectedRoleIds[user.id] = user.roleId;
          }
        });
      },
      (error) => {
        console.error('Error fetching user data:', error);
      }
    );
  }

  private processUserData(users: any[]): any[] {
    return users;
  }

  getRoleTitle(jobId: number): string {
    switch (jobId) {
      case 1:
        return 'Admin';
      case 2:
        return 'Worker';
      default:
        return 'Unknown';
    }
  }

  acceptNewRole(userId: number): void {
    if (this.selectedRoleIds[userId] !== undefined) {
      const selectedRoleId = this.selectedRoleIds[userId];
      this.adminService.changeUserRole(userId, selectedRoleId).subscribe(
        (response: any) => {
          this.notificationService.showSuccess('Role changed successfully!');
          console.log('Role changed successfully:', response);
          this.refreshRoles();
          setTimeout(() => {
            window.location.reload();
          }, 1500);
        },
        (error: any) => {
          this.notificationService.showInfo('Error changing user role!');
          console.error('Error changing user role:', error);
        }
      );
    }
  }

  deleteUser(id: number) {
    this.adminService.deleteUser(id).subscribe(
      () => {
        this.notificationService.showSuccess(`User #${id} removed successfully`);
        this.refreshRoles();
      },
      () => {
        this.notificationService.showError(`Something went wrong, could not delete user #${id}`);
        console.log('Something went wrong, could not delete user');
      }
    )
  }

  private refreshRoles(): void {
    this.userService.getUsers().subscribe(
      (users: any[]) => {
        this.userData = this.processUserData(users);
      },
      (error: any) => {
        this.notificationService.showInfo('Error fetching user data!');
        console.error('Error fetching user data:', error);
      }
    );
  }
}
