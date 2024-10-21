import { Test, TestingModule } from '@nestjs/testing';
import { ClassroomService } from './classroom.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Classroom } from './classroom.entity';
import { UtilsService } from '../utils/utils.service';
import { HttpException, HttpStatus } from '@nestjs/common';


describe('ClassroomService', () => {
  let service: ClassroomService;
  let repository: Repository<Classroom>;
  let utilsService: UtilsService;

  const mockClassroomRepository = {
    find: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    findOneBy: jest.fn(),
    delete: jest.fn(),
  };

  const mockUtilsService = {
    convertJSONtoXML: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ClassroomService,
        {
          provide: getRepositoryToken(Classroom),
          useValue: mockClassroomRepository,
        },
        {
          provide: UtilsService,
          useValue: mockUtilsService,
        },
      ],
    }).compile();

    service = module.get<ClassroomService>(ClassroomService);
    repository = module.get<Repository<Classroom>>(getRepositoryToken(Classroom));
    utilsService = module.get<UtilsService>(UtilsService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getAllClassroom', () => {
    it('should return an array of classrooms', async () => {
      const result = [new Classroom()];
      mockClassroomRepository.find.mockResolvedValue(result);

      expect(await service.getAllClassroom()).toBe(result);
      expect(mockClassroomRepository.find).toHaveBeenCalled();
    });

    it('should return classrooms in XML format if xml parameter is true', async () => {
      const result = [new Classroom()];
      const xmlResult = '<Classrooms></Classrooms>';
      mockClassroomRepository.find.mockResolvedValue(result);
      mockUtilsService.convertJSONtoXML.mockResolvedValue(xmlResult);

      expect(await service.getAllClassroom('true')).toBe(xmlResult);
      expect(mockUtilsService.convertJSONtoXML).toHaveBeenCalled();
    });
  });

  describe('createClassroom', () => {
    it('should create and return a classroom', async () => {
      const classroomData = { id_classroom: 1, name: 'New Classroom' };
      const createdClassroom = new Classroom();
      mockClassroomRepository.create.mockReturnValue(createdClassroom);
      mockClassroomRepository.save.mockResolvedValue(createdClassroom);

      expect(await service.createClassroom(classroomData)).toBe(createdClassroom);
      expect(mockClassroomRepository.create).toHaveBeenCalledWith(classroomData);
      expect(mockClassroomRepository.save).toHaveBeenCalledWith(createdClassroom);
    });
  });

  describe('getClassroom', () => {
    it('should return a classroom by id', async () => {
      const classroomId = 1;
      const classroom = new Classroom();
      mockClassroomRepository.findOneBy.mockResolvedValue(classroom);

      expect(await service.getClassroom(classroomId)).toBe(classroom);
      expect(mockClassroomRepository.findOneBy).toHaveBeenCalledWith({ id_classroom: classroomId });
    });

    it('should return classroom in XML format if xml parameter is true', async () => {
      const classroomId = 1;
      const classroom = new Classroom();
      const xmlResult = '<Classroom></Classroom>';
      mockClassroomRepository.findOneBy.mockResolvedValue(classroom);
      mockUtilsService.convertJSONtoXML.mockResolvedValue(xmlResult);

      expect(await service.getClassroom(classroomId, 'true')).toBe(xmlResult);
      expect(mockUtilsService.convertJSONtoXML).toHaveBeenCalled();
    });

    it('should throw an HttpException if classroom not found', async () => {
      const classroomId = 999;
      mockClassroomRepository.findOneBy.mockResolvedValue(null);

      await expect(service.getClassroom(classroomId)).rejects.toThrow(HttpException);
      await expect(service.getClassroom(classroomId)).rejects.toHaveProperty('status', HttpStatus.NOT_FOUND);
    });
  });

  describe('updateClassroom', () => {
    it('should update and return the classroom', async () => {
      const classroomId = 1;
      const classroomUpdate: Partial<Classroom> = { name: 'Updated Classroom' };
      const existingClassroom = new Classroom();
      mockClassroomRepository.findOneBy.mockResolvedValue(existingClassroom);
      mockClassroomRepository.save.mockResolvedValue(existingClassroom);

      expect(await service.updateClassroom({ id_classroom: classroomId, ...classroomUpdate })).toBe(existingClassroom);
      expect(mockClassroomRepository.findOneBy).toHaveBeenCalledWith({ id_classroom: classroomId });
      expect(mockClassroomRepository.save).toHaveBeenCalledWith(expect.objectContaining(classroomUpdate));
    });

    it('should throw an HttpException if classroom not found', async () => {
      const classroomId = 999;
      const classroomUpdate = { id: classroomId, name: 'Updated Classroom' };
      mockClassroomRepository.findOneBy.mockResolvedValue(null);

      await expect(service.updateClassroom(classroomUpdate)).rejects.toThrow('Classroom not found');
    });
  });

  describe('deleteClassroom', () => {
    it('should successfully delete a classroom', async () => {
      const classroomId = 1;
      mockClassroomRepository.delete.mockResolvedValue({ affected: 1 });

      await service.deleteClassroom(classroomId);
      expect(mockClassroomRepository.delete).toHaveBeenCalledWith(classroomId);
    });
  });
});
