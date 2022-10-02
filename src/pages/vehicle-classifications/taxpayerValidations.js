export const validateItem = values => {
    const errors = {};

    if (!values.name) {
        errors.name = "Ingrese un nombre.";
    }
    if (!values.amount) {
        errors.amount = "Ingrese un monto.";
    }
    if (!values.vehicle_parameter_id) {
        errors.vehicle_parameter_id = "Seleccione un parámetro.";
    }
    if (!values.charging_method_id) {
        errors.charging_method_id = "Seleccione un método de cobro.";
    }

    return errors;
};
