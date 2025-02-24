import { Input, Modal, Button, Form, DatePicker } from "antd";
import { Controller, useForm } from "react-hook-form";
import dayjs from "dayjs";
import { useState } from "react";
import { useUsers } from "../store/usersStore";

interface FormData {
  rfc: string;
  nombre: string;
  apellidos: string;
  fechaNacimiento: string;
  fechaConstitucion: string;
  giro: string;
  nombreComercial: string;
}

export const ModalForm = () => {
  const [tipoPersona, setTipoPersona] = useState<"fisica" | "moral" | null>(
    null
  );

  const {
    handleSubmit,
    control,
    reset,
    setValue,
    formState: { errors, isValid },
  } = useForm<FormData>({
    mode: "onChange",
    defaultValues: {
      rfc: "",
      nombre: "",
      apellidos: "",
      fechaNacimiento: "",
      fechaConstitucion: "",
      giro: "",
      nombreComercial: "",
    },
  });

  const {
    savePersonaFisica,
    savePersonaMoral,
    setActiveTab,
    personasFisicas,
    personasMorales,
    setModalVisible,
    isModalVisible,
  } = useUsers();

  const rfcPersonaMoralRegex = /^[A-Z&Ñ]{3}\d{6}[A-Z\d]{3}$/i;
  const rfcPersonaFisicaRegex = /^[A-Z]{4}\d{6}[A-Z\d]{3}$/i;

  const validateRFC = (value: string): boolean | string => {
    if (!value.trim()) {
      setTipoPersona(null);
      return "El RFC es obligatorio";
    }

    if (
      personasFisicas.find((persona) => persona.rfc === value) ||
      personasMorales.find((persona) => persona.rfc === value)
    ) {
      return "El RFC ya existe";
    }

    if (rfcPersonaMoralRegex.test(value)) {
      setTipoPersona("moral");
      return true;
    }
    if (rfcPersonaFisicaRegex.test(value)) {
      setTipoPersona("fisica");
      return true;
    }

    setTipoPersona(null);
    return "RFC no válido";
  };

  const handleRFCChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rfc = e.target.value.toUpperCase();
    setValue("rfc", rfc, { shouldValidate: true });

    if (!rfc.trim()) {
      setTipoPersona(null);
    }
  };

  const handleClose = () => {
    setModalVisible(false);
    setTipoPersona(null);
    reset();
  };

  const onSubmit = (data: FormData) => {
    if (!tipoPersona) {
      return;
    }

    const cleanedData = cleanData(data);

    if (tipoPersona === "fisica") {
      savePersonaFisica({ ...cleanedData, tipoPersona });
    } else {
      savePersonaMoral({ ...cleanedData, tipoPersona });
    }

    setActiveTab(tipoPersona);
    handleClose();
  };

  const cleanData = (data: FormData) => {
    const cleanedData = Object.keys(data).reduce((acc, key) => {
      const value = data[key as keyof FormData];
      if (key === "rfc") {
        acc[key as keyof FormData] = value.trim();
      } else {
        acc[key as keyof FormData] =
          typeof value === "string"
            ? value.trim().charAt(0).toUpperCase() +
              value.slice(1).toLowerCase()
            : value;
      }

      return acc;
    }, {} as FormData);

    return cleanedData;
  };

  const InputsPersonaFisica = () => {
    return (
      <>
        <Controller
          name="nombre"
          control={control}
          rules={{ required: "El nombre es obligatorio" }}
          render={({ field }) => (
            <>
              <Input
                placeholder="Nombre"
                {...field}
                style={{ marginTop: 10 }}
              />
              {errors.nombre && (
                <p style={{ color: "red" }}>{errors.nombre.message}</p>
              )}
            </>
          )}
        />

        <Controller
          name="apellidos"
          control={control}
          rules={{ required: "Los apellidos son obligatorios" }}
          render={({ field }) => (
            <>
              <Input
                placeholder="Apellidos"
                {...field}
                style={{ marginTop: 10 }}
              />
              {errors.apellidos && (
                <p style={{ color: "red" }}>{errors.apellidos.message}</p>
              )}
            </>
          )}
        />

        <Controller
          name="fechaNacimiento"
          control={control}
          rules={{ required: "La fecha de nacimiento es obligatoria" }}
          render={({ field }) => (
            <>
              <DatePicker
                placeholder="Fecha de Nacimiento"
                style={{ marginTop: 10, width: "100%" }}
                format="DD/MM/YYYY"
                value={field.value ? dayjs(field.value) : null}
                onChange={(date) => {
                  field.onChange(date);
                }}
                disabledDate={(current) =>
                  current && current.isAfter(dayjs().subtract(18, "year"))
                }
                defaultPickerValue={dayjs().subtract(18, "year")}
              />
              {errors.fechaNacimiento && (
                <p style={{ color: "red" }}>{errors.fechaNacimiento.message}</p>
              )}
            </>
          )}
        />
      </>
    );
  };

  const InputsPersonaMoral = () => {
    return (
      <>
        <Controller
          name="nombreComercial"
          control={control}
          rules={{
            required: "El Nombre Comercial es obligatorio",
          }}
          render={({ field }) => (
            <>
              <Input
                placeholder="Nombre Comercial"
                {...field}
                style={{ marginTop: 10 }}
              />
              {errors.nombreComercial && (
                <p style={{ color: "red" }}>{errors.nombreComercial.message}</p>
              )}
            </>
          )}
        />

        <Controller
          name="giro"
          control={control}
          rules={{
            required: "El Giro es obligatorio",
          }}
          render={({ field }) => (
            <>
              <Input placeholder="Giro" {...field} style={{ marginTop: 10 }} />{" "}
              {errors.giro && (
                <p style={{ color: "red" }}>{errors.giro.message}</p>
              )}
            </>
          )}
        />
        <Controller
          name="fechaConstitucion"
          control={control}
          rules={{
            required: "La fecha de constitución es obligatoria",
          }}
          render={({ field }) => (
            <>
              <DatePicker
                placeholder="Fecha de Constitución"
                style={{ marginTop: 10, width: "100%" }}
                format="DD/MM/YYYY"
                value={field.value ? dayjs(field.value) : null}
                onChange={(date) => {
                  field.onChange(date);
                }}
                disabledDate={(current) =>
                  current && current > dayjs().endOf("day")
                }
              />
              {errors.fechaConstitucion && (
                <p style={{ color: "red" }}>
                  {errors.fechaConstitucion.message}
                </p>
              )}
            </>
          )}
        />
      </>
    );
  };

  return (
    <Modal
      title="Registro de Persona"
      open={isModalVisible}
      onCancel={handleClose}
      footer={null}
    >
      <Form onFinish={handleSubmit(onSubmit)}>
        <Controller
          name="rfc"
          control={control}
          rules={{
            required: "El RFC es obligatorio",
            validate: validateRFC,
          }}
          render={({ field }) => (
            <>
              <Input
                placeholder="RFC"
                {...field}
                onChange={(e) => {
                  field.onChange(e);
                  handleRFCChange(e);
                }}
                value={field.value}
              />
              {errors.rfc && (
                <p style={{ color: "red" }}>{errors.rfc.message}</p>
              )}
            </>
          )}
        />

        {tipoPersona === "fisica" && <InputsPersonaFisica />}
        {tipoPersona === "moral" && <InputsPersonaMoral />}

        <Button
          type="primary"
          htmlType="submit"
          style={{ marginTop: 20 }}
          disabled={!isValid}
        >
          Guardar
        </Button>
      </Form>
    </Modal>
  );
};
