import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-header',
  standalone: true,
  imports: [],
  templateUrl: './admin-header.component.html',
  styleUrl: './admin-header.component.scss'
})
export class AdminHeaderComponent {

  confirmLogout() {
    const confirmed = window.confirm("Çıkış yapmak istiyor musunuz?");
    if (confirmed) {
      this.logout();
    }
  }

  logout() {
    // Çıkış işlemlerini burada gerçekleştirin
    // Örneğin, token'ı temizleyip login sayfasına yönlendirme yapabilirsiniz.
    localStorage.removeItem('token'); // Token'ı temizleme örneği
    // Yönlendirme örneği, router kullanarak:
    // this.router.navigate(['/login']);
    console.log('User logged out');
  }

}
