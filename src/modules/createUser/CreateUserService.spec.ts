import { User } from '../../entities/User';
import { UsersRepositoryInMemory } from '../../repositories/in-memory/UsersRepositoryInMemory';
import { IUsersRepository } from '../../repositories/IUsersRepositories';
import { CreateUserService } from './CreateUserService';

describe('Create user', () => {
	let userRepository: IUsersRepository;
	let createUserService: CreateUserService;

	beforeAll(() => {
		userRepository = new UsersRepositoryInMemory();
		createUserService = new CreateUserService(userRepository);
	});

	it('should be able to create a new user', async () => {
		const userData: User = {
			name: 'Test Name',
			email: 'test@test.com',
			username: 'testUserName',
		};

		const user = await createUserService.execute(userData);

		expect(user).toHaveProperty('id');
		expect(user.username).toBe('testUserName');
	});

	it('should not be able to create an existing user', async () => {
		const userData: User = {
			name: 'Test Existing Name',
			email: 'testExisting@test.com',
			username: 'testUserNameExisting',
		};

		await createUserService.execute(userData);

		await expect(createUserService.execute(userData)).rejects.toEqual(
			new Error('User already exists!'),
		);
	});
});
