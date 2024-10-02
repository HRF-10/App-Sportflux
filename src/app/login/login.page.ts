import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  username: string = '';
  password: string = '';

  constructor(private router: Router) {}

  login() {
    // Cek username dan password
    if (this.username === 'user 1' && this.password === '123') {
      // Jika berhasil, arahkan ke halaman home
      this.router.navigate(['/tabs/home']);
    } else {
      // Tampilkan pesan kesalahan
      alert('Username atau password salah!');
    }
  }

}