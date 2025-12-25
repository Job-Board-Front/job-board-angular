import { inject, Injectable } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  user,
} from '@angular/fire/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _auth = inject(Auth);
  private _router = inject(Router);

  user$ = user(this._auth);

  register(email: string, password: string) {
    return createUserWithEmailAndPassword(this._auth, email, password).then(() => {
      console.log('----------User registered------------');
      this._router.navigate(['/']);
    });
  }

  login(email: string, password: string) {
    return signInWithEmailAndPassword(this._auth, email, password).then((value) => {
      console.log('---------User signed in------------');
      this._router.navigate(['/']);
    });
  }

  logout() {
    return signOut(this._auth).then((value) => {
      console.log('------------------User signed out-----------------');
      this._router.navigate(['/login']);
    });
  }
}
