import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { TaskI } from '../models/task.interface';
import { User } from '../shared/user.interface';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase';
//import { User } from 'firebase';
import * as firebase from 'firebase'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  private usersCollection: AngularFirestoreCollection<TaskI>;
  private todos: Observable<TaskI[]>;

  public user$: Observable<User>;

  constructor(private db: AngularFirestore, private afauht: AngularFireAuth) {
    this.user$ = this.afauht.authState.pipe(
      switchMap((user) => {
        if(user){
          return this.db.doc<User>(`users/${user.uid}`).valueChanges()
        }
        return of(null);
      })
    )

  }

  async resetPassword(email: string): Promise<void> {
    try{
      return this.afauht.sendPasswordResetEmail(email);
    }
    catch(err){
      console.log(err);
    }
  }

  async loginGoogle(): Promise<User> {
    try{
      const {user} = await this.afauht.signInWithPopup(new firebase.auth.GoogleAuthProvider());
      this.upDateUserData(user);
      return user;
    }
    catch(err){
      console.log(err);
    }
  }

  async sendVerificationEmail(): Promise<void> {
    try{
      return(await this.afauht.currentUser).sendEmailVerification();
    }
    catch(err){
      console.log(err);
    }
  }

  async register(email: string, password: string): Promise<User> {
    try{
      const {user} = await this.afauht.createUserWithEmailAndPassword(email, password);
      await this.sendVerificationEmail();
      return user;
    }
    catch(err){
      console.log(err);
    }
  }
  
  async login(email: string, password: string): Promise<User> {
    try{
      const { user } = await this.afauht.signInWithEmailAndPassword(email, password);
      this.upDateUserData(user);
      return user;
    }
    catch(err){
      console.log(err);
    }
  }

  isEmailVerified(user: User): boolean {
    return user.emailVerified === true ? true : false
  }
  
  async logout(): Promise<void> {
    try{
      await this.afauht.signOut();
    }
    catch(err){
      console.log(err);
    }

  }

  private upDateUserData(user: User){
    const userRef: AngularFirestoreDocument<User> = this.db.doc(`users/${user.uid}`);
    const data: User = {
      uid: user.uid,
      email: user.email,
      emailVerified: user.emailVerified,
      displayName: user.displayName,
    };

    return userRef.set(data, {merge: true});
  }


  
  //   this.usersCollection = db.collection<TaskI>('todos');
  //   this.todos = this.usersCollection.snapshotChanges().pipe(
  //     map(actions => {
  //       return actions.map(a => {
  //         const data = a.payload.doc.data();
  //         const id = a.payload.doc.id;
  //         return {id, ...data};
  //       });
  //     })
  //   );
  // }

  // getTodos(){
  //   return this.todos;
  // }

  // getTodo(id: string){
  //   return this.todosCollection.doc<TaskI>(id).valueChanges();
  // }

  // updateTodo(todo:TaskI, id: string){
  //   return this.todosCollection.doc(id).update(todo);
  // }
  
  // addTodo(todo: TaskI){
  //   return this.todosCollection.add(todo);
  // }
  
  // removeTodo(id: string){
  //   return this.todosCollection.doc(id).delete();
  // }


}