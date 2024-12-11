import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthenticationService } from 'src/app/pages/authentication/services/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  @Input() showToggle = true;
  @Input() toggleChecked = false;
  @Output() toggleMobileNav = new EventEmitter<void>();
  @Output() toggleMobileFilterNav = new EventEmitter<void>();
  @Output() toggleCollapsed = new EventEmitter<void>();

  showFiller = false;
  isLogged:boolean=false;

  constructor(public dialog: MatDialog,private authenticationService:AuthenticationService) {
    this.authenticationService.userSubject.subscribe(res=>{
      this.isLogged = res != null;
    })
  }

  logout(){
    this.authenticationService.logout();
  }
}
