export function downloadSnapshot(url: string): void {
  const a = document.createElement('a');
  a.href = url;
  a.download = 'snapshot.png';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}
