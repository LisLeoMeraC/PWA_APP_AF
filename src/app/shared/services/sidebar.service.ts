import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  private sidebarOpen = new BehaviorSubject<boolean>(true);
  sidebarOpen$ = this.sidebarOpen.asObservable();

  toggleSidebar() {
    this.sidebarOpen.next(!this.sidebarOpen.value);
  }

  setSidebarState(isOpen: boolean) {
    this.sidebarOpen.next(isOpen);
  }

  get isOpen(): boolean {
    return this.sidebarOpen.value;
  }
}
