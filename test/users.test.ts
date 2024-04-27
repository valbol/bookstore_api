import mongoose from 'mongoose';
import { expect } from 'chai';
import { userService } from '../src/services';
import { IUser, UserRole } from '../src/types';
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import { User } from '../src/models';

chai.use(chaiAsPromised);

before(async () => {
  await mongoose.connect('mongodb://localhost:27017/test');
});

after(async () => {
  await mongoose.connection.close();
});

beforeEach(async () => {
  await User.deleteMany({});
});

describe('User Service', () => {
  describe('create()', () => {
    it('should create a new user', async () => {
      const user = await userService.create({
        userName: 'John Doe',
        email: 'john.doe@test.com',
        password: '123456',
        role: UserRole.USER,
        loans: [],
      } as IUser);

      expect(user).to.have.property('email', user.email);
      expect(user).to.have.property('userName', user.userName);
    });

    it('should throw an error if the user already exists', async () => {
      const newUser = {
        userName: 'John Doe',
        email: 'john.doe@test.com',
        password: '123456',
        role: UserRole.USER,
        loans: [],
      } as IUser;
      await userService.create(newUser);

      await expect(userService.create(newUser)).to.be.rejectedWith(Error);
    });
  });

  describe('get()', () => {
    it('should retrieve a user by email', async () => {
      const newUser = {
        userName: 'John Doe',
        email: 'new@test.com',
        password: '123456',
        role: UserRole.USER,
        loans: [],
      } as IUser;
      await userService.create(newUser);
      const user = await userService.get(newUser.email);

      expect(user).to.not.be.null;
      expect(user.email).to.equal(newUser.email);
    });

    it('should return null if the user does not exist', async () => {
      const email = 'blalalalballaa@test.com';
      const user = await userService.get(email);

      expect(user).to.be.null;
    });
  });
});
