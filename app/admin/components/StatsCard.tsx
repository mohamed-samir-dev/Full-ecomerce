import Link from 'next/link';

interface StatsCardProps {
  title: string;
  value: string | number;
  link: string;
  color: string;
}

export function StatsCard({ title, value, link, color }: StatsCardProps) {
  return (
    <Link href={link} className={`${color} rounded-lg shadow-lg p-6 text-white hover:opacity-90 transition`}>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-3xl font-bold">{value}</p>
    </Link>
  );
}
