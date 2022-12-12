import React from 'react'
import {
  Keyboard,
  Platform,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
} from 'react-native'
import styled from 'styled-components/native'
import Toast from 'react-native-toast-message'
import { useHeaderHeight } from '@react-navigation/elements'
import { useForm, Controller } from 'react-hook-form'

import Options from './Options'

export interface ChecklistFormData {
  type: string
  milkProduced: string
  cowsHead: string
  hadSupervision: string
  farmerName: string
  farmerCity: string
  from: string
  to: string
}

interface ChecklistFormProps {
  defaultValues?: ChecklistFormData
  onSubmit: (data: ChecklistFormData) => void
}

export default function ChecklistForm({
  defaultValues,
  onSubmit,
}: ChecklistFormProps) {
  const headerHeight = useHeaderHeight()
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<ChecklistFormData>({ defaultValues })

  const onInvalid = () => {
    Toast.show({
      type: 'error',
      text1: 'Ops... Erro de validação.',
      text2: 'Preencha todos os campos corretamente e tente novamente.',
    })
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      keyboardVerticalOffset={headerHeight - 5}
      enabled={Platform.OS === 'ios'}
      behavior="padding"
    >
      <TouchableWithoutFeedback style={{ flex: 1 }} onPress={Keyboard.dismiss}>
        <FormWrapper>
          <InputTitle>Nome da fazenda:</InputTitle>
          <Controller
            name="farmerName"
            control={control}
            rules={{ required: true, minLength: 3 }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                error={errors.farmerName ? true : false}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
          />
          <InputTitle>Cidade da fazenda:</InputTitle>
          <Controller
            name="farmerCity"
            control={control}
            rules={{ required: true, minLength: 3 }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                error={errors.farmerCity ? true : false}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
          />
          <InputTitle>Tipo de checklist:</InputTitle>
          <Controller
            name="type"
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, value } }) => (
              <Options
                error={errors.type ? true : false}
                value={value}
                options={['Antibiótico', 'BPA', 'BPF']}
                onChange={onChange}
              />
            )}
          />
          <Spacer />
          <InputTitle>Nome do fazendeiro:</InputTitle>
          <Controller
            name="from"
            control={control}
            rules={{ required: true, minLength: 3 }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                error={errors.from ? true : false}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
          />
          <InputTitle>Nome do supervisor:</InputTitle>
          <Controller
            name="to"
            control={control}
            rules={{ required: true, minLength: 3 }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                error={errors.to ? true : false}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
          />
          <InputTitle>Supervisão já realizada esse mês:</InputTitle>
          <Controller
            name="hadSupervision"
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, value } }) => (
              <Options
                error={errors.hadSupervision ? true : false}
                value={value}
                options={['Sim', 'Não']}
                onChange={onChange}
              />
            )}
          />
          <Spacer />
          <InputTitle>Nº de vacas:</InputTitle>
          <Controller
            name="cowsHead"
            control={control}
            rules={{ required: true, validate: (value) => Number(value) >= 1 }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                error={errors.cowsHead ? true : false}
                onBlur={onBlur}
                keyboardType="numeric"
                onChangeText={onChange}
                value={value}
              />
            )}
          />
          <InputTitle>Total de leite produzido:</InputTitle>
          <Controller
            name="milkProduced"
            control={control}
            rules={{ required: true, validate: (value) => Number(value) >= 1 }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                error={errors.milkProduced ? true : false}
                onBlur={onBlur}
                keyboardType="numeric"
                onChangeText={onChange}
                value={value}
              />
            )}
          />
          <Spacer />
          <Submit onPress={handleSubmit(onSubmit, onInvalid)} {...{ isValid }}>
            <SubmitText {...{ isValid }}>Salvar</SubmitText>
          </Submit>
        </FormWrapper>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}

const FormWrapper = styled.ScrollView`
  flex: 1;
  padding: 0 16px;
  background-color: #eee;
`

const Spacer = styled.View`
  margin: 10px;
`

const TextInput = styled.TextInput<{ error: boolean }>`
  font-size: 17px;
  line-height: 23px;
  padding: 8px 12px;
  border-radius: 8px;
  background-color: ${(props) => (props.error ? '#ffbaba' : '#fff')};
`

const Submit = styled.TouchableOpacity<{ isValid: boolean }>`
  background-color: ${(props) => (props.isValid ? '#b7e0ff' : '#dddddd')};
  padding: 8px 12px;
  border-radius: 8px;
  margin-top: 16px;
  margin-bottom: 38px;
`

const SubmitText = styled.Text<{ isValid: boolean }>`
  color: ${(props) => (props.isValid ? '#007dd6' : '#808080')};
  font-size: 16px;
  line-height: 23px;
  font-weight: bold;
`

const InputTitle = styled.Text`
  font-size: 14px;
  margin: 12px 0 4px 2px;
`
