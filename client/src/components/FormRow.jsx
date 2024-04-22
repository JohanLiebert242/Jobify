
function FormRow({name, label, type, defaultValue = "", onChange}) {
    return (
        <div className="form-row">
            <label className="form-label" htmlFor={name}>{label || name}</label>
            <input
                className="form-input"
                type= {type}
                name={name}
                id={name}
                defaultValue={defaultValue} 
                onChange={onChange}
                required
            />
        </div>
    );
}

export default FormRow;