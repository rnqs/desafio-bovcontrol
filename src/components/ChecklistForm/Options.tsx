import * as React from 'react'
import styled from 'styled-components/native'

interface OptionsProps {
  error: boolean
  value: string
  options: string[]
  onChange: (value: string) => void
}

export default function Options({
  error,
  value,
  options,
  onChange,
}: OptionsProps) {
  return (
    <OptionContainer error={error}>
      {options.map((option, index) => (
        <Option
          key={option}
          selected={value === option}
          last={index === options.length - 1}
          onPress={() => onChange(option)}
        >
          <OptionText selected={value === option}>{option}</OptionText>
        </Option>
      ))}
    </OptionContainer>
  )
}

const OptionContainer = styled.View<{ error: boolean }>`
  border-radius: 8px;
  background-color: ${(props) => (props.error ? '#ffbaba' : '#fff')};
  overflow: hidden;

  flex-direction: row;
`

const Option = styled.TouchableOpacity<{ selected: boolean; last?: boolean }>`
  background-color: ${(props) => (props.selected ? '#b7e0ff' : 'transparent')};
  padding: 8px 12px;
  border-right-width: ${(props) => (props.last ? '0' : '1px')};
  border-color: #ccc;

  flex: 1;
`

const OptionText = styled.Text<{ selected: boolean }>`
  color: ${(props) => (props.selected ? '#007dd6' : '#000')};
  font-weight: ${(props) => (props.selected ? 'bold' : 'normal')};
  line-height: 23px;
`
