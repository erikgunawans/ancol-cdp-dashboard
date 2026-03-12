export interface KPI {
  label: string;
  value: string;
  delta: string;
  deltaPositive: boolean;
  unit?: string;
}

export const headlineKPIs: KPI[] = [
  {
    label: "Total Visitors YTD",
    value: "4.2M",
    delta: "+12.4%",
    deltaPositive: true,
    unit: "guests",
  },
  {
    label: "Revenue YTD",
    value: "Rp 892B",
    delta: "+8.7%",
    deltaPositive: true,
  },
  {
    label: "Avg. Spend per Visit",
    value: "Rp 212K",
    delta: "+3.1%",
    deltaPositive: true,
  },
  {
    label: "NPS Score",
    value: "72",
    delta: "+5pts",
    deltaPositive: true,
  },
  {
    label: "Loyalty Members",
    value: "1.8M",
    delta: "+22%",
    deltaPositive: true,
  },
  {
    label: "Churn Rate",
    value: "6.3%",
    delta: "-1.2%",
    deltaPositive: true,
  },
];
