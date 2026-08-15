import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import { IssueBadge } from './IssueList';
import { IssueTriage } from './IssueTriage';

afterEach(cleanup);

describe('Part 01 — UI as value', () => {
  it('giữ IssueBadge pure với cùng input', () => {
    const first = render(<IssueBadge status="open" />);
    const firstMarkup = first.container.innerHTML;
    first.unmount();

    const second = render(<IssueBadge status="open" />);

    expect(second.container.innerHTML).toBe(firstMarkup);
  });

  it('đưa DOM về output thuộc React khi state đổi', () => {
    render(<IssueTriage />);

    fireEvent.click(screen.getByRole('button', { name: 'Phá DOM thủ công' }));
    expect(screen.getByText('DOM đã bị sửa bên ngoài React')).toBeTruthy();

    fireEvent.click(
      screen.getByRole('button', {
        name: /PAY-102 Payment callback bị xử lý hai lần/,
      })
    );

    const selectedTitle = document.querySelector<HTMLElement>(
      '[data-selected-issue-title]'
    );
    expect(selectedTitle?.textContent).toBe(
      'Payment callback bị xử lý hai lần'
    );
  });
});
