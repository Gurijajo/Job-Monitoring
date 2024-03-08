import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  //NOTIFICATION MESSAGES
  private renderer: Renderer2;

  constructor(private rendererFactory: RendererFactory2) {
    this.renderer = this.rendererFactory.createRenderer(null, null);
  }

  showNotification(message: string): void {
    this.showNotificationWithClass(message, 'custom-not', 'neutral-not');
  }

  showSuccess(message: string): void {
    this.showNotificationWithClass(message, 'custom-not', 'success-not');
  }

  showError(message: string): void {
    this.showNotificationWithClass(message, 'custom-not', 'error-not');
  }

  showInfo(message: string): void {
    this.showNotificationWithClass(message, 'custom-not', 'info-not');
  }

  private showNotificationWithClass(
    message: string,
    ...cssClasses: string[]
  ): void {
    const notification = this.renderer.createElement('div');
    cssClasses.forEach((cssClass) => {
      this.renderer.addClass(notification, cssClass);
    });

    this.renderer.appendChild(notification, this.renderer.createText(message));

    document.body.appendChild(notification);

    setTimeout(() => {
      document.body.removeChild(notification);
    }, 3000);
  }

  //MODAL POP-UPS

  private typeM = '';
  private show = false;
  private scheduleID: number | null = null;

  showModal(type: string, id: number | null = null) {
    this.typeM = type;
    this.show = true;
    if (id) this.scheduleID = id;
  }

  hideModal() {
    this.typeM = '';
    this.show = false;
  }

  getModalState() {
    return {
      typeM: this.typeM,
      showModal: this.show,
      id: this.scheduleID,
    };
  }
}
