import { Test, TestingModule } from '@nestjs/testing';
import { ClassroomController } from './classroom.controller';
import { ClassroomService } from './classroom.service';
import { HttpException, HttpStatus } from '@nestjs/common';

describe('ClassroomController', () => {
  let controller: ClassroomController;
  let service: ClassroomService;

  const mockClassrooms = [
    {
      id: 1,
      name: 'Aula 1',
      description: 'Descripción del aula 1',
      capacity: 20,
    },
    {
      id: 2,
      name: 'Aula 2',
      description: 'Descripción del aula 2',
      capacity: 25,
    },
  ];

  const mockClassroom = {
    id: 1,
    name: 'Aula 1',
    description: 'Descripción del aula 1',
    capacity: 20,
  };

  const mockClassroomService = {
    getAllClassroom: jest.fn().mockReturnValue(mockClassrooms),
    getClassroom: jest.fn().mockImplementation((id: number) => {
      if (id === 1) return mockClassroom;
      throw new HttpException('Classroom not found', HttpStatus.NOT_FOUND);
    }),
    createClassroom: jest.fn().mockReturnValue(mockClassroom),
    updateClassroom: jest.fn().mockImplementation((dto: any) => ({
      ...mockClassroom,
      ...dto,
    })),
    deleteClassroom: jest.fn().mockReturnValue(true),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClassroomController],
      providers: [
        {
          provide: ClassroomService,
          useValue: mockClassroomService,
        },
      ],
    }).compile();

    controller = module.get<ClassroomController>(ClassroomController);
    service = module.get<ClassroomService>(ClassroomService);
  });

  describe('getAllClassrooms', () => {
    it('should return an array of classrooms', async () => {
      expect(await controller.getAllClassrooms()).toEqual(mockClassrooms);
      expect(service.getAllClassroom).toHaveBeenCalledWith(undefined);
    });

    it('should pass the xml query param to the service', async () => {
      const xml = 'true';
      expect(await controller.getAllClassrooms(xml)).toEqual(mockClassrooms);
      expect(service.getAllClassroom).toHaveBeenCalledWith(xml);
    });
  });

  describe('getClassroom', () => {
    it('should return a single classroom', async () => {
      expect(await controller.getClassroom('1')).toEqual(mockClassroom);
      expect(service.getClassroom).toHaveBeenCalledWith(1, undefined);
    });

    it('should throw a 404 error if classroom is not found', async () => {
      try {
        await controller.getClassroom('3');
      } catch (error) {
        expect(error).toBeInstanceOf(HttpException);
        expect(error.getStatus()).toBe(HttpStatus.NOT_FOUND);
      }
    });
  });

  describe('createClassroom', () => {
    it('should create a new classroom', async () => {
      const newClassroom = { name: 'Aula Nueva', description: 'Descripción' };
      expect(await controller.createClassroom(newClassroom)).toEqual(mockClassroom);
      expect(service.createClassroom).toHaveBeenCalledWith(newClassroom);
    });
  });

  describe('updateClassroom', () => {
    it('should update an existing classroom', async () => {
      const updateClassroomDto = { name: 'Aula Actualizada' };
      expect(await controller.updateClassroom('1', updateClassroomDto)).toEqual({
        ...mockClassroom,
        ...updateClassroomDto,
        id_classroom: 1,
      });
      expect(service.updateClassroom).toHaveBeenCalledWith({
        ...updateClassroomDto,
        id_classroom: 1,
      });
    });
  });

  describe('deleteClassroom', () => {
    it('should delete a classroom', async () => {
      expect(await controller.deleteClassroom('1')).toBe(true);
      expect(service.deleteClassroom).toHaveBeenCalledWith(1);
    });
  });
});
