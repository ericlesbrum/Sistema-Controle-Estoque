import { useState } from 'react';
import { useForm, UseFormProps, FieldValues, SubmitHandler } from 'react-hook-form';

interface UseFormModalProps<TFieldValues extends FieldValues> extends UseFormProps<TFieldValues> {
  onSubmit: (data: TFieldValues) => Promise<void>;
  onSuccess?: () => void;
}

export const useFormModal = <TFieldValues extends FieldValues>({
  onSubmit,
  onSuccess,
  ...useFormProps
}: UseFormModalProps<TFieldValues>) => {
  const [submitError, setSubmitError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
  } = useForm<TFieldValues>({
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
    ...useFormProps,
  });

  const handleFormSubmit: SubmitHandler<TFieldValues> = async (data) => {
    try {
      setSubmitError(null);
      await onSubmit(data);
      reset();
      onSuccess?.();
    } catch (err: any) {
      setSubmitError(err.response?.data?.message || err.message || 'Erro ao salvar. Tente novamente.');
    }
  };

  return {
    register,
    handleSubmit: handleSubmit(handleFormSubmit),
    errors,
    isSubmitting,
    submitError,
    reset,
    setValue,
    clearSubmitError: () => setSubmitError(null),
  };
};