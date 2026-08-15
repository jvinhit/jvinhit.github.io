import type { Issue, IssueStatus } from './issues';

interface IssueBadgeProps {
  status: IssueStatus;
}

const statusLabel = {
  open: 'Mở',
  'in-progress': 'Đang xử lý',
  closed: 'Đã đóng',
} as const satisfies Record<IssueStatus, string>;

export function IssueBadge({ status }: IssueBadgeProps) {
  return <span data-status={status}>{statusLabel[status]}</span>;
}

interface IssueListProps {
  issues: readonly Issue[];
  selectedId: string;
  onSelect: (id: string) => void;
}

export function IssueList({ issues, selectedId, onSelect }: IssueListProps) {
  return (
    <ul aria-label="Danh sách issue">
      {issues.map((issue) => (
        <li key={issue.id}>
          <button
            type="button"
            aria-pressed={issue.id === selectedId}
            onClick={() => onSelect(issue.id)}
          >
            <strong>{issue.id}</strong>
            <span>{issue.title}</span>
            <IssueBadge status={issue.status} />
          </button>
        </li>
      ))}
    </ul>
  );
}
