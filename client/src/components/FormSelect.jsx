function FormSelect({ name, label, list, defaultValue = "", onChange}) {
    return (
        <div className="form-row">
            <label htmlFor={name} className="form-label">
                {label || name}
            </label>
            <select
                id={name}
                name={name}
                className="form-select"
                defaultValue={defaultValue}
                onChange={onChange}
            >
                {list.map((value) => {
                    return (
                        <option value={value} key={value}>
                            {value}
                        </option>
                    );
                })}
            </select>
        </div>
    );
}

export default FormSelect;
