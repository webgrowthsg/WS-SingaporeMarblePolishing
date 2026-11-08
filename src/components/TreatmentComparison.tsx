interface TreatmentComparisonProps {
  rows: { treatment: string; purpose: string; limitation: string }[];
}

export function TreatmentComparison({ rows }: TreatmentComparisonProps) {
  return (
    <div className="overflow-x-auto rounded-lg border border-stone-200">
      <table className="w-full text-left text-sm">
        <thead className="bg-stone-100 text-stone-800">
          <tr>
            <th scope="col" className="px-4 py-3 font-semibold">Treatment</th>
            <th scope="col" className="px-4 py-3 font-semibold">Purpose</th>
            <th scope="col" className="px-4 py-3 font-semibold">Limitation</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-stone-200 bg-white">
          {rows.map((row, idx) => (
            <tr key={idx}>
              <td className="px-4 py-3 font-medium text-stone-800">{row.treatment}</td>
              <td className="px-4 py-3 text-stone-600">{row.purpose}</td>
              <td className="px-4 py-3 text-stone-600">{row.limitation}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
