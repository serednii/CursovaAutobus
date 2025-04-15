export function parseStringToObject(selectParam: string): Record<string, boolean> {
  const selectFields = selectParam ? selectParam.split(",") : [];
  const selectObject: Record<string, boolean> = selectFields.reduce((acc, field) => {
    acc[field] = true;
    return acc;
  }, {} as Record<string, boolean>);
  return selectObject;
}
