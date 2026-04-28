type Item = { label: string; value: string };

export function MetadataRow({
  preparedFor,
  preparedBy,
  date,
  validUntil,
}: {
  preparedFor: string;
  preparedBy: string;
  date: string;
  validUntil?: string;
}) {
  const items: Item[] = [
    { label: "Prepared for", value: preparedFor },
    { label: "Prepared by", value: preparedBy },
    { label: "Date", value: date },
  ];
  if (validUntil) items.push({ label: "Valid until", value: validUntil });

  return (
    <div className="border-y border-rule py-8 md:py-10">
      <dl className="grid grid-cols-2 gap-x-8 gap-y-6 md:grid-cols-4">
        {items.map((item) => (
          <div key={item.label} className="flex flex-col gap-2">
            <dt className="text-xs font-semibold uppercase tracking-[0.12em] text-text-muted">
              {item.label}
            </dt>
            <dd className="text-base font-medium text-ink">{item.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
