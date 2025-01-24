import { Users } from './entities/users.entity';

export const UsersProviders = [
  {
    provide: 'USER_REPOSITORY',
    useValue: Users,
  },
];

