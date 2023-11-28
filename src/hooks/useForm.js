import { useForm as useCustomForm } from 'react-hook-form';

const useForm = (onSubmit, initialValues = {}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useCustomForm({
    defaultValues: initialValues,
  });

  return {
    register,
    handleSubmit: handleSubmit(onSubmit),
    errors,
    reset,
  };
};

export default useForm;
