type Props = { text?: string };
export default function EmptyState({ text = "چیزی اینجا نیست." }: Props) {
  return <div className="empty">{text}</div>;
}
