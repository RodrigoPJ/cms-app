import type { InformationGrid } from "../../utils/types/components-interface";

export function InformationGrid({ stats }: InformationGrid) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      {stats.map((el, index) => {
        return (
          <div key={index} className="stat bg-base-100 shadow">
            <div className="stat-title">{el.title}</div>
            <div className="stat-value">{el.value}</div>
          </div>
        );
      })}
    </div>
  );
}
