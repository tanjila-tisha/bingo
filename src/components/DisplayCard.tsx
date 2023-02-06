import { Card, CardContent, Typography } from "@mui/material";

interface HistoryPanelProps {
  item: string;
  title?: string;
}

const DisplayCard = ({ item, title }: HistoryPanelProps) => {
  return (
    <Card
      sx={{ minWidth: "50%", padding: 5, textAlign: "center" }}
      key={`${title}`}
    >
      <CardContent>
        {title && <Typography variant="h4">{title}:</Typography>}
        <Typography variant="body1" sx={{ wordBreak: "break-all" }}>
          {item}
        </Typography>
      </CardContent>
    </Card>
  );
};
export default DisplayCard;
