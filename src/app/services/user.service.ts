import { User } from '../models/user.model';
import { Subject } from '../../../node_modules/rxjs';

export class UserService {
    private users: User[] = [
        {
            firstName: 'Oneil',
            lastName: 'DEDOH',
            email: 'oneildedoh@gmail.com',
            drinkPreference: 'Orangina',
            hobbies: [
                'Coder',
                'Plays Game',
                'Musique'
            ]
        }
    ];
    userSubject = new Subject<User[]>();

    emitUsers() {
        this.userSubject.next(this.users.slice());
    }

    addUser(user: User) {
        this.users.push(user);
        this.emitUsers();
    }
}
