export const instructions = (data: string) => {
  const instructions = data.split("\n");

  const executions: any = {
    market: instructions.find((line: string) => line.includes("market order")),
    limit: instructions.find((line: string) => line.includes("limit order")),
  };

  return executions;
};
