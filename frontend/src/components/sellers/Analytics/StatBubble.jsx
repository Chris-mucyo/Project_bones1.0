export default function StatBubble({ title, value }) {
  return (
    <div className="bg-zinc-900 rounded-2xl p-4 shadow-lg hover:scale-105 transition">
      <p className="text-sm text-zinc-400">{title}</p>
      <h2 className="text-2xl font-bold mt-1">{value}</h2>
    </div>
  );
}
