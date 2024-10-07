export class CreateIssueConversationDto {
  readonly id_issue: number;
  readonly userId?: number;
  readonly tecnicId?: number;
  readonly notes: string;
  readonly created_at?: string;
}
