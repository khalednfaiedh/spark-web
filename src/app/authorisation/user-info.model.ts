import {UserModel} from './user.model';

export class UserInfoModel{
    user_name: string;
    authorities: Array<string>;
    user: UserModel;
}