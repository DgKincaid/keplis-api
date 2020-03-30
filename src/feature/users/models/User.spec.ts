import { Test } from '@nestjs/testing';
import { MongooseModule } from '@nestjs/mongoose';


import { UserSchema } from './User';
import { IUser } from '../interfaces/IUser';


describe('User Model Tests', () => {

  const userData: Partial<IUser> = {
    firstName: 'John',
    lastName: 'Smith',
    email: 'test@test.com',
    password: 'password123'
  };

  beforeAll(async () => {
    // await mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }, (err) => {
    //   if (err) {
    //     console.error(err);
    //     process.exit(1);
    //   }
    // })

    // const moduleRef = await Test.createTestingModule({
    //   controllers: [ ],
    //   providers: [ ],
    //   imports: [ MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]) ]
    // }).compile();
  })

  test('should be defined', () => {

  })

//   afterEach(async () => {
//     await User.deleteMany({});
//   })

//   afterAll(async () => {
//     await mongoose.disconnect();
//   })

//   test('creates and saves a new user', async () => {
//     const newUser = new User(userData);

//     let count = await User.countDocuments();

//     expect(count).toBe(0);

//     const user = await newUser.save();
//     count = await User.countDocuments();

//     expect(count).toBe(1);

//     expect(user._id).toBeDefined();
//     expect(user.firstName).toBe(userData.firstName);
//     expect(user.lastName).toBe(userData.lastName);
//     expect(user.email).toBe(userData.email);
//   })

//   test('create user without required field should failed', async () => {
//     const userWithoutRequiredField = new User({ email: 'test@test.com' });
//     let err;
//     try {
//         const savedUserWithoutRequiredField = await userWithoutRequiredField.save();
//         err = savedUserWithoutRequiredField;
//     } catch (error) {
//         err = error
//     }

//     expect(err).toBeInstanceOf(mongoose.Error.ValidationError)
//     expect(err.errors.password).toBeDefined();
//     expect(err.errors.firstName).toBeDefined();
//     expect(err.errors.lastName).toBeDefined();
//   });

//   test('should fail because of duplicate email', async () => {
//     const newUser = new User(userData);
//     const newUser2 = new User(userData);

//     let err;

//     try {
//       await newUser.save();
//       const savedUserWithDuplicateEmail = await newUser2.save();
//       err = savedUserWithDuplicateEmail;

//     } catch (error) {
//       err = error;
//     }

//     expect(err.name).toEqual('MongoError');
//     expect(err.errmsg).toBeDefined();
//     expect(err.errmsg).toContain('test@test.com');
//   });

//   test('expect default dttms set', async () => {
//     const newUser = new User(userData);

//     const user = await newUser.save();

//     expect(user.createdDttm).toBeDefined();
//     expect(user.updatedDttm).toBeDefined();
//   })

//   test('should not get password', async () => {
//     const newUser = new User(userData);

//     const user = await newUser.save();

//     const getUser = await User.findById(user._id);

//     console.log(getUser);
//     expect(getUser.password).toBeUndefined();
//   })
})