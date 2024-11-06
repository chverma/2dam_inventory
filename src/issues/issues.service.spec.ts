import { Test, TestingModule } from '@nestjs/testing';
import { IssuesService } from './issues.service';
import { Issue } from './issues.entity';
import { UtilsService } from '../utils/utils.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreateIssueDto, UpdateIssueDto } from './issues.dto';

const oneIssue: Partial<Issue> = {
  id_issue: 1,
  description: 'Lorem ipsum dolor sit amet.',
  notes: 'Lorem ipsum dolor sit amet.',
  user: { id_user: 1 } as any,
  technician: { id_user: 3 } as any,
  status: { id_status: 1 } as any,
  fk_inventari: { id_inventory: 1 } as any,
  conversations: [],
};

const createIssueDto = {
  description: 'Lorem ipsum dolor sit amet.',
  notes: 'Lorem ipsum dolor sit amet.',
  user: 1,
  technician: 3,
  status: 1,
  fk_inventari: 1,
} as CreateIssueDto;

const updateIssueDto = {
  description: 'Updated description',
  notes: 'Updated notes.',
} as Partial<UpdateIssueDto>;

describe('IssuesService', () => {
  let issuesService: IssuesService;

  const MockIssueRepository = {
    find: jest.fn(() => [{ ...oneIssue }]),
    findOne: jest.fn(() => ({ ...oneIssue })),
    create: jest.fn((issue: CreateIssueDto) => ({
      ...oneIssue,
      ...issue,
    })),
    save: jest.fn((issue: CreateIssueDto) => ({
      ...oneIssue,
      ...issue,
    })),
    update: jest.fn(() => Promise.resolve()),
    findOneBy: jest.fn((criteria) => {
      if (criteria.id_issue === 1) {
        return Promise.resolve({ ...oneIssue });
      }
      return Promise.resolve(null);
    }),
    delete: jest.fn(() => Promise.resolve({ affected: 1 })),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        IssuesService,
        UtilsService,
        {
          provide: getRepositoryToken(Issue),
          useValue: MockIssueRepository,
        },
      ],
    }).compile();

    issuesService = module.get<IssuesService>(IssuesService);
  });

  it('should be defined', () => {
    expect(issuesService).toBeDefined();
  });

  describe('createIssue', () => {
    it('should create a new issue item', async () => {
      const result = await issuesService.createIssue(createIssueDto);
      expect(result).toEqual(expect.objectContaining({ ...oneIssue }));
      expect(MockIssueRepository.create).toHaveBeenCalledWith({
        ...createIssueDto,
        user: { id_user: 1 },
        technician: { id_user: 3 },
        status: { id_status: 1 },
        fk_inventari: { id_inventory: 1 },
      });
      expect(MockIssueRepository.save).toHaveBeenCalled();
    });
  });

  describe('updateIssue', () => {
    it('should update an issue item', async () => {
      const result = await issuesService.updateIssue(1, updateIssueDto);
      expect(MockIssueRepository.update).toHaveBeenCalledWith(1, {
        ...updateIssueDto,
        user: { id_user: 1 },
        technician: { id_user: 3 },
        status: { id_status: 1 },
        fk_inventari: { id_inventory: 1 },
      });
      expect(MockIssueRepository.findOneBy).toHaveBeenCalledWith({
        id_issue: 1,
      });
      expect(result).toEqual(expect.objectContaining({ ...oneIssue }));
    });
  });

  describe('getAllIssues', () => {
    it('should return an array of issues', async () => {
      const result = await issuesService.getAllIssues('false');
      expect(result).toEqual([expect.objectContaining({ ...oneIssue })]);
    });
  });

  describe('getIssue', () => {
    it('should return a specific issue by ID', async () => {
      MockIssueRepository.findOneBy.mockResolvedValueOnce({ ...oneIssue });
      const result = await issuesService.getIssue(1, 'false');
      expect(result).toEqual(expect.objectContaining({ ...oneIssue }));
      expect(MockIssueRepository.findOneBy).toHaveBeenCalledWith({
        id_issue: 1,
      });
    });
  });

  describe('deleteIssue', () => {
    it('should delete an issue successfully', async () => {
      const result = await issuesService.deleteIssue(1);
      expect(MockIssueRepository.delete).toHaveBeenCalledWith(1);
      expect(result).toBeUndefined();
    });
  });
});
