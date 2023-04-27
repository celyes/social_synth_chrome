import * as React from "react";

import * as Styled from "./Selection.styled";

export type WritingStylesStructure = {
  id: number | undefined,
  name: string | undefined,
  description: string | undefined
};

interface Props {
  styles: WritingStylesStructure[];
  onChange: (value: string) => void;
  inline?: boolean;
  selectedStyle: string;
}

const Selection: React.FC<Props> = ({
  styles,
  onChange,
  inline,
  selectedStyle
}) => {
  const handleChange = (value: string) => {
    onChange(value)
  };

  return (
    <Styled.Wrapper isInline={inline}>
      <select onChange={(e) => handleChange(e.target.value)} defaultValue={selectedStyle}>
      {styles.map((style) => {
        return (
            <option
                value={style.id}
                key={style.id}
            >
              {style.name}
            </option>
        )
      })}
      </select>
    </Styled.Wrapper>
  );
};

export default Selection;
