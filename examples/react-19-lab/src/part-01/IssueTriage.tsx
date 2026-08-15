import { useState } from 'react';
import { IssueList } from './IssueList';
import { initialIssues } from './issues';

export function IssueTriage() {
  const [selectedId, setSelectedId] = useState<string>(initialIssues[0].id);
  const selectedIssue =
    initialIssues.find((issue) => issue.id === selectedId) ?? initialIssues[0];

  function tamperWithOwnedDOM() {
    const title = document.querySelector<HTMLElement>(
      '[data-selected-issue-title]'
    );

    if (title) {
      title.textContent = 'DOM đã bị sửa bên ngoài React';
    }
  }

  return (
    <main>
      <p className="eyebrow">Issue Triage · Part 01</p>
      <h1>UI là kết quả của state hiện tại</h1>

      <section className="panel" aria-labelledby="selected-heading">
        <h2 id="selected-heading">Issue đang chọn</h2>
        <p data-selected-issue-title>{selectedIssue.title}</p>
        <p>
          Source of truth: <code>{selectedId}</code>
        </p>
        <button type="button" onClick={tamperWithOwnedDOM}>
          Phá DOM thủ công
        </button>
      </section>

      <IssueList
        issues={initialIssues}
        selectedId={selectedId}
        onSelect={setSelectedId}
      />
    </main>
  );
}
