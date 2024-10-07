import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './users.entity';
import { DataSource } from 'typeorm';

// Crea un mock del manager
const mockManager = {
  save: jest.fn(),
};

// Crea un mock del DataSource
const mockDataSource = {
  createQueryRunner: jest.fn().mockReturnValue({
    connect: jest.fn(),
    startTransaction: jest.fn(),
    manager: mockManager, // Usa el mock del manager aquí
    commitTransaction: jest.fn(),
    rollbackTransaction: jest.fn(),
    release: jest.fn(),
  }),
};

const mockRepository = {
  find: jest.fn(),
};

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: mockRepository,
        },
        {
          provide: DataSource, // Proporciona el mock del DataSource
          useValue: mockDataSource,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createUser', () => {
    it('should save a user', async () => {
      const user = {
        id: 1,
        firstName: 'John',
        surname: 'Doe',
        email: 'sergi@gmail.com',
        role: 1,
      };
      mockManager.save.mockResolvedValue(user); // Simula que se guarda el usuario

      const result = await service.createUser(user);

      expect(mockManager.save).toHaveBeenCalledWith(user); // Verifica que se llamó al método con el usuario correcto
      expect(result).toEqual(user); // Verifica el resultado
    });
  });
});
