type ChemicalTextProps = {
  text: string;
};

const chemicalPattern = /(PM(?:2\.5|₂\.5|₂\.₅)|O(?:3|₃))/g;

export function ChemicalText({ text }: ChemicalTextProps) {
  const parts = text.split(chemicalPattern);

  return (
    <>
      {parts.map((part, index) => {
        if (!part) {
          return null;
        }

        if (part.startsWith("PM")) {
          return (
            <span key={`${part}-${index}`} className="chemical-formula">
              PM<sub>2.5</sub>
            </span>
          );
        }

        if (part.startsWith("O")) {
          return (
            <span key={`${part}-${index}`} className="chemical-formula">
              O<sub>3</sub>
            </span>
          );
        }

        return part;
      })}
    </>
  );
}
