import { Test, TestingModule } from '@nestjs/testing';
import { IssuesService } from './issues.service';
import { Issue } from './issues.entity';
import { UtilsService } from '../utils/utils.service';
import { getRepositoryToken } from '@nestjs/typeorm';

const oneIssue: Issue = {
  id_issue: 1,
  created_at: '18/09/2024',
  description: 'Lorem ipsum dolor sit amet.',
  last_updated: '18/09/2024',
  notes: 'Lorem ipsum dolor sit amet.',
  user: { id_user: 1 } as any,
  technician: { id_user: 3 } as any,
  status: { id_status: 1 } as any,
  fk_inventari: { id_inventory: 1 } as any,
  conversations: [],
};

const mockIssueUpdate = {
  id_issue: 1,
  created_at: '18/09/2024',
  description: 'Lorem ipsum dolor sit amet.',
  last_updated: '20/09/2024',
  notes: 'Updated notes.',
  user: { id_user: 1 } as any,
  technician: { id_user: 3 } as any,
  status: { id_status: 1 } as any,
  fk_inventari: { id_inventory: 1 } as any,
  conversations: [],
};

describe('IssuesService', () => {
  let issuesService: IssuesService;

  const MockIssueRepository = {
    find: jest.fn(() => [oneIssue]),
    findOne: jest.fn(() => oneIssue),
    create: jest.fn((issue: Partial<Issue>) => ({
      ...oneIssue,
      ...issue,
    })),
    save: jest.fn((issue: Partial<Issue>) => ({
      ...oneIssue,
      ...issue,
    })),
    update: jest.fn(() => Promise.resolve()),
    findOneBy: jest.fn((criteria) => {
      if (criteria.id_issue === 1) {
        return Promise.resolve({ ...oneIssue, ...mockIssueUpdate });
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
      const result = await issuesService.createIssue(oneIssue);
      expect(result).toEqual(oneIssue); // Elimina la expectativa del mensaje
      expect(MockIssueRepository.create).toHaveBeenCalledWith(oneIssue);
      expect(MockIssueRepository.save).toHaveBeenCalled();
    });
  });

  describe('updateIssue', () => {
    it('should update an issue item', async () => {
      const result = await issuesService.updateIssue(1, mockIssueUpdate);
      expect(MockIssueRepository.update).toHaveBeenCalledWith(
        1,
        mockIssueUpdate,
      );
      expect(MockIssueRepository.findOneBy).toHaveBeenCalledWith({
        id_issue: 1,
      });
      expect(result).toEqual({ ...oneIssue, ...mockIssueUpdate });
    });
  });

  describe('getAllIssues', () => {
    it('should return an array of issues', async () => {
      const result = await issuesService.getAllIssues('false');
      expect(result).toEqual([oneIssue]);
    });
  });

  describe('getIssue', () => {
    it('should return a specific issue by ID', async () => {
      MockIssueRepository.findOneBy.mockResolvedValueOnce(oneIssue);
      const result = await issuesService.getIssue(1, 'false');
      expect(result).toEqual(oneIssue);
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
