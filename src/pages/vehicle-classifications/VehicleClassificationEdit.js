import * as React from 'react'
import BaseForm from '../../components/BaseForm'
import InputContainer from '../../components/InputContainer'
import TextInput from '../../components/TextInput'
import axios from '../../api'
import { useNavigate } from 'react-router-dom'
import { useSnackbar } from 'notistack';
import formatServerSideErrors from '../../utils/formatServerSideErrors';
import { useForm } from 'react-hook-form';
import SelectInput from '../../components/SelectInput'
import { useParams } from 'react-router-dom'

const TaxpayerEdit = () => {
    const navigate = useNavigate()
    const { enqueueSnackbar } = useSnackbar();
    const { setError } = useForm();
    const [parameters, setParameters] = React.useState([])
    const [methods, setMethods] = React.useState([])
    const [record, setRecord] = React.useState([])
    const { id } = useParams();

    const save = React.useCallback(async (values) => {
        try {
            const { data } = await axios.post('/vehicle-classifications', values)

            if (data) {
                navigate(`/vehicle-classifications`)
                enqueueSnackbar(
                    `¡Ha registrado la clasificación "${data.name}"!`,
                    { variant: 'success' }
                );
            }
        } catch (error) {
            if (error.response.data.errors) {
                const { errors } = error.response.data;

                return formatServerSideErrors(errors, setError);
            }
        }
    }, [])

    const fetchRecord = React.useCallback(async () => {
        const { data } = await axios.get(`/vehicle-classifications/${id}`);

        setRecord(data);
    }, []);

    const fetchParameters = async () => {
        const { data } = await axios.get('/vehicle-parameters');

        setParameters(data.data);
    };

    const fetchMethods = async () => {
        const { data } = await axios.get('/charging-methods');

        setMethods(data.data);
    };

    React.useEffect(() => {
        fetchRecord()
        fetchParameters();
        fetchMethods()
    }, [])

    if (!record) return null;

    return (
        <BaseForm
            save={save}
            record={record}
            saveButtonLabel='Actualizar'
            title={`Editando contribuyente #${record.id}`}
        >
            <InputContainer label='Nombre'>
                <TextInput
                    name="name"
                    placeholder="Nombre"
                    fullWidth
                    rules={{
                        required: 'Ingrese un nombre.'
                    }}
                />
            </InputContainer>
            <InputContainer label='Monto'>
                <TextInput
                    type='number'
                    name="amount"
                    placeholder="Monto"
                    fullWidth
                    rules={{
                        required: 'Ingrese un monto.'
                    }}
                />
            </InputContainer>
            <InputContainer label='Parámetro'>
                <SelectInput
                    name="vehicle_parameter_id"
                    placeholder="Seleccione"
                    fullWidth
                    rules={{
                        required: 'Seleccione un parámetro.'
                    }}
                    options={parameters}
                />
            </InputContainer>
            <InputContainer label='Forma de cálculo'>
                <SelectInput
                    name="charging_method_id"
                    placeholder="Seleccione"
                    fullWidth
                    rules={{
                        required: 'Seleccione una forma de cálculo.'
                    }}
                    options={methods}
                />
            </InputContainer>
        </BaseForm>
    )
}

export default TaxpayerEdit
