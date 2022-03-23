import {
  Button,
  CardContent,
  CardHeader,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import Card from "@mui/material/Card";
import React, { useState } from "react";

const DiceFormats = [4, 6, 10, 20] as const;
type DiceType = typeof DiceFormats[number];

const DiceSimulator: React.FC = () => {
  const [dice, setDice] = useState<DiceType>(6);
  const [throwsAmmount, setThrowsAmmount] = useState<number>(1);
  const [throwResults, setThrowResults] = useState<number[]>([]);

  const handleRollClick = () => {
    let results = [...Array(throwsAmmount)].map((diceThrow) =>
      Math.ceil(Math.random() * dice)
    );

    setThrowResults(results);
  };
  console.log({ throwResults });
  return (
    <Card>
      <CardHeader title="Dice Simulator"></CardHeader>
      <CardContent sx={{ display: "flex", alignContent: "center" }}>
        <FormControl fullWidth>
          <InputLabel id="dice-label">Dice</InputLabel>
          <Select labelId="dice-label" label="Dice" value={dice}>
            {DiceFormats.map((dice) => (
              <MenuItem key={dice} value={dice} onClick={() => setDice(dice)}>
                k{dice}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel id="throws-label">Throws</InputLabel>
          <Select labelId="throws-label" label="Throws" value={throwsAmmount}>
            {[...Array(10)].map((_, index) => {
              return (
                <MenuItem
                  key={index + 1}
                  value={index + 1}
                  onClick={() => setThrowsAmmount(index + 1)}
                >
                  {index + 1}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
        <Button variant="contained" onClick={() => handleRollClick()}>
          ROLL
        </Button>
      </CardContent>
      <CardContent>
        Results:
        {throwResults.map((result, index) => (
          <Typography key={index}>{result}</Typography>
        ))}
        SortedResults:
        {throwResults.length > 0 &&
          [...throwResults]
            .sort((a, b) => a - b)
            .map((result, index) => (
              <Typography key={index}>{result}</Typography>
            ))}
        Throw Summ:
        {throwResults.length > 0 &&
          throwResults.reduce((sum, result) => sum + result, 0)}
      </CardContent>
    </Card>
  );
};

export default DiceSimulator;
