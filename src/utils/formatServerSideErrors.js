const formatServerSideErrors = (errors, func) => {
    return Object.keys(errors).forEach(key => {
        func(key, errors[key])
    });
}

export default formatServerSideErrors
