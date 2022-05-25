type Props = {
  value: string;
  caracteres: string;
  borderLeft: string;
  borderRight: string;
  align: "Center" | "Left" | "Right";
  limit: number;
};

export default function build({
  value,
  caracteres,
  borderLeft,
  borderRight,
  align,
  limit,
}: Props) {
  const array: string[] = [];
  const arrayValue = value.split("");
  if (align !== "Center") return value;

  const limits ={
    limitLeft : (limit - value.length) / 2,
    limitRight: (limit - value.length) / 2
  }

if((value.length / 2) % 2 === 1){
  limits.limitRight = limits.limitRight + 1
}

if(limits.limitRight % 2 === 0 && limits.limitLeft % 2 === 0 && limits.limitLeft === limits.limitRight){
  limits.limitRight = limits.limitRight + 1
}


  array.push(borderLeft);
  for (let i = 0; i < limits.limitLeft - 1; i += 1) {
    array.push(caracteres);
  }

  for (let i = 0; i < arrayValue.length; i += 1) {
    array.push(arrayValue[i]);
  }

  for (let i = 0; i < limits.limitRight - 1; i += 1) {
    array.push(caracteres);
  }

  array.push(borderRight);
  return array.join("");
}
