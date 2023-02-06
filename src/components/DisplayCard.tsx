import { Card, CardContent, Typography } from "@mui/material";

interface DisplayCardProps {
  item: string;
  title?: string;
}

const DisplayCard = ({ item, title }: DisplayCardProps): JSX.Element => {
  return (
    <Card
      sx={{ minWidth: "50%", padding: 5, textAlign: "center", marginBottom: 5 }}
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
