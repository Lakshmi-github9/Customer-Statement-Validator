import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Chip,
} from "@mui/material";
import { type ValidationError } from "../utils/validator";

interface Props {
  data: ValidationError[];
}

export default function ResultTable({ data }: Props) {
  if (data.length === 0) {
   return (
      <p style={{ color: "green", marginTop: "16px" }}>
        No errors found in transaction statements ✅
      </p>

    );
  }

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Reference</TableCell>
          <TableCell>Account Number</TableCell>
          <TableCell>Description</TableCell>
          <TableCell>Start Balance</TableCell>
          <TableCell>Mutation</TableCell>
          <TableCell>End Balance</TableCell>
          <TableCell>Errors</TableCell>
        </TableRow>
      </TableHead>

      <TableBody>
        {data.map(({ record, errors }) => (
          <TableRow key={record.reference}>
            <TableCell>{record.reference}</TableCell>
            <TableCell>{record.accountNumber}</TableCell>
            <TableCell>{record.description}</TableCell>
            <TableCell>{record.startBalance}</TableCell>
            <TableCell>{record.mutation}</TableCell>
            <TableCell>{record.endBalance}</TableCell>
            <TableCell>
              {errors.map((err) => (
                <Chip
                  key={err}
                  label={err}
                  color="error"
                  size="small"
                  sx={{ mr: 0.5 }}
                />
              ))}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
