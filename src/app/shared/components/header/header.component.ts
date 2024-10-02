import { Component, OnInit  } from '@angular/core';
import { AuthService } from '../../../auth/auth.service'; 
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isAuthenticated: boolean = false;
  private authSubscription!: Subscription;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.authSubscription = this.authService.getAuthenticatedStatus().subscribe(isAuthenticated => {
      this.isAuthenticated = isAuthenticated;
    });
  }

  ngOnDestroy(): void {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe(); 
    }
  }

  isAdmin(): boolean {
    return this.authService.isAdmin();
  }

  logout(): void {
    this.authService.clearToken();
    this.isAuthenticated = false;
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }

  goToSpaces(): void {
    this.router.navigate(['/spaces']);
  }

  goToReservations(): void {
    this.router.navigate(['/reservations']);
  }

  goToLogin(): void {
    this.router.navigate(['/login']);
  }
}
