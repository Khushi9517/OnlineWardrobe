interface Props {
  title: string;
  count: number;
}

export default function AnalyticsCard({
  title,
  count,
}: Props) {
  return (
    <div className="rounded-xl border p-4 shadow-sm">
      <p className="text-sm text-gray-500">
        {title}
      </p>

      <p className="mt-2 text-3xl font-bold">
        {count}
      </p>
    </div>
  );
}