export type IssueStatus = 'open' | 'in-progress' | 'closed';

export interface Issue {
  id: string;
  title: string;
  status: IssueStatus;
}

export const initialIssues = [
  {
    id: 'PAY-101',
    title: 'Checkout không giữ mã giảm giá',
    status: 'open',
  },
  {
    id: 'PAY-102',
    title: 'Payment callback bị xử lý hai lần',
    status: 'in-progress',
  },
  {
    id: 'PAY-103',
    title: 'Biên lai thiếu mã giao dịch',
    status: 'closed',
  },
] as const satisfies readonly Issue[];
