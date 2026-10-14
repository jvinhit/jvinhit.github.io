/**
 * Helper DOM nhỏ cho trạng thái tải / đang lưu của khu /be-yeu-dotro/
 * (spec 009, phần "mạng chậm"). Chỉ thao tác class/thuộc tính trên phần tử
 * page đưa vào — style nằm ở PregnancyLayout (`.by-skel*`, `[aria-busy]`).
 */

/**
 * Khóa nút + đổi chữ trong lúc `run` chạy, trả nguyên trạng ở mọi nhánh.
 * `aria-busy` vừa cho screen reader biết, vừa là hook CSS vẽ spinner.
 */
export async function withBusy<T>(
  button: HTMLButtonElement,
  busyLabel: string,
  run: () => Promise<T>
): Promise<T> {
  const label = button.textContent ?? '';
  button.disabled = true;
  button.setAttribute('aria-busy', 'true');
  button.textContent = busyLabel;
  try {
    return await run();
  } finally {
    button.disabled = false;
    button.removeAttribute('aria-busy');
    button.textContent = label;
  }
}

function skel(className: string): HTMLSpanElement {
  const node = document.createElement('span');
  node.className = `by-skel ${className}`;
  node.setAttribute('aria-hidden', 'true');
  return node;
}

/** Thay nội dung bằng `count` dòng skeleton (dòng cuối ngắn hơn). */
export function showSkeletonLines(el: HTMLElement, count = 2): void {
  const lines = Array.from({ length: count }, (_, i) =>
    skel(i === count - 1 ? 'by-skel-line is-short' : 'by-skel-line')
  );
  el.replaceChildren(...lines);
  el.setAttribute('aria-busy', 'true');
}

/** Thay nội dung bằng `count` thẻ skeleton cao `heightRem`. */
export function showSkeletonCards(
  el: HTMLElement,
  count = 2,
  heightRem = 5.5
): void {
  const cards = Array.from({ length: count }, () => {
    const card = skel('by-skel-card');
    card.style.height = `${heightRem}rem`;
    return card;
  });
  el.replaceChildren(...cards);
  el.setAttribute('aria-busy', 'true');
}

/** Gỡ cờ đang tải sau khi đã render dữ liệu thật vào `el`. */
export function markLoaded(el: HTMLElement): void {
  el.removeAttribute('aria-busy');
}
