import { Typography } from "@mui/material";

interface StaticCardProps {
  icon: any;
  value: number;
  label: string;
}

function StaticCard({ icon, value, label }: StaticCardProps) {
  return (
    <div className="flex flex-col gap-2">
      {icon}
      <Typography variant="h6" fontWeight="bold" color="secondary">
        {value}
      </Typography>
      <Typography variant="body2" color="gray">
        {label}
      </Typography>
    </div>
  );
}

export default StaticCard;
