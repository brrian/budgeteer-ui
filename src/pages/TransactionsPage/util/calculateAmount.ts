export default function calculateAmount(input: string): number {
  return input.split('+').reduce((total, amount) => {
    const [, addTax, formattedAmount] =
      amount.replace(/[$,]/g, '').match(/^(?:\s+)?([*])?([\S]+)/) ?? [];

    let increment = Number(formattedAmount ?? 0);

    if (addTax) {
      increment *= 1.0825;
    }

    increment = Number(increment.toFixed(2));

    return total + increment;
  }, 0);
}
