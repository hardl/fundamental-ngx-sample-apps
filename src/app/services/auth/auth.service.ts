import { Injectable } from '@angular/core';
import { Router } from  "@angular/router";
import { auth } from  'firebase/app';
import { AngularFireAuth } from  "@angular/fire/auth";
import { User } from  'firebase';
import {Observable, Observer, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private user: User;


  private readonly _loggedIn: Subject<any> = new Subject<any>();
  private _userObserLoginObservable = this._loggedIn.asObservable();

  userSubscription = this._userObserLoginObservable.subscribe((emitedValue) => {
    console.log(emitedValue);
  })

  constructor(public  afAuth:  AngularFireAuth, public  router:  Router) {
    this.afAuth.authState.subscribe(userFromAuth => {
      if (userFromAuth) {
        this.user = userFromAuth;
        localStorage.setItem('user', JSON.stringify(this.user)); //store a user in local storage
      } else {
        localStorage.setItem('user', null);
      }
    })
   }
   
   get userObserLoginObservable() {
     return this._userObserLoginObservable;
   }

   async login(email: string, password: string) {
    var result = await this.afAuth.signInWithEmailAndPassword(email, password).then(() => {
      this._loggedIn.next(true);
      this.router.navigate(['/dashboard']);
    }).catch((error) => {
      console.log('invalid username and password')
    })
  }

  async register(email: string, password: string) {
    var result = await this.afAuth.createUserWithEmailAndPassword(email, password).then(() => {
        this.afAuth.signInWithEmailAndPassword(email, password).then(() => {
          this._loggedIn.next(true);
        this.router.navigate(['/dashboard']);
      }).catch((error) => {
        console.log('invalid username and password')
      })
    }).catch((error) => {
      console.log('Registration could not be completed!')
    });
    this.sendEmailVerification();
  }

  async sendEmailVerification() {
    await this.afAuth.currentUser.then ( 
      u => u.sendEmailVerification().then(
        () => {
          this.router.navigate(['auth']);
        }
      )
    )
  }

  async sendPasswordResetEmail(passwordResetEmail: string) {
    return await this.afAuth.sendPasswordResetEmail(passwordResetEmail);
  }

  async logout(){
    await this.afAuth.signOut();
    localStorage.removeItem('user');
    this._loggedIn.next(false);
    this.router.navigate(['auth']);
  }

  get isLoggedIn(): boolean {
    const  user  =  JSON.parse(localStorage.getItem('user'));
    return  user  !==  null;
  }

  async  loginWithGoogle(){
    await  this.afAuth.signInWithPopup(new auth.GoogleAuthProvider()).then(() => {
      this._loggedIn.next(true);
      this.router.navigate(['/dashboard']);
    }).catch((error) => {
      console.log('Action did not get completed with google')
    });
  }
}