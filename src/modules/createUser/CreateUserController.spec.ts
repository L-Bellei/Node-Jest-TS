/**
 * @jest-environment ./prisma/prisma-environment-jest
 */

import request from 'supertest';
import { app } from '../../app';

describe('Create User Controller', () => {
	it('Should be able to create a new user', async () => {
		const response = await request(app).post('/users').send({
			username: 'test-integration',
			email: 'teste@teste.com',
			name: 'testSuperTest',
		});

		expect(response.status).toBe(200);
		expect(response.body).toHaveProperty('username');
	});

	it('Should not be able to create an existing user', async () => {
		await request(app).post('/users').send({
			username: 'test-integration-exist',
			email: 'testeexist@teste.com',
			name: 'testSuperTestExist',
		});

		const user = await request(app).post('/users').send({
			username: 'test-integration',
			email: 'teste@teste.com',
			name: 'testSuperTest',
		});

		expect(user.status).toBe(400);
	});
});
