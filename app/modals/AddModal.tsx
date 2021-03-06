import React, { useState, useContext } from 'react';
import { DashboardContext } from '../context/DashboardContext';
import '../stylesheets/AddModal.css';

interface IFields {
  database: string;
  URI: string;
  name: string;
}

interface IDashboard {
  addApp: (fields: IFields) => void;
}

interface AddModalProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

type InputElement = React.ChangeEvent<HTMLSelectElement | HTMLInputElement>;
type FormElement = React.FormEvent<HTMLFormElement>;

const AddModal: React.FC<AddModalProps> = ({ setOpen }) => {
  const { addApp }: IDashboard = useContext(DashboardContext);
  const [fields, setFields] = useState<IFields>({
    database: 'SQL',
    URI: '',
    name: '',
  });

  // Submit form data and save to database
  const handleSubmit = (event: FormElement) => {
    event.preventDefault();
    addApp(fields); // Add new app
    setOpen(false); // Close modal on submit
  };

  // Handle form field changes
  const handleChange = (event: InputElement) => {
    const { name, value } = event.target;
    setFields({
      ...fields,
      [name]: value,
    });
  };

  const { database, URI, name } = fields;
  return (
    <div className="add-container">
      <h2>Enter Your Database Information</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-field">
          <label htmlFor="db-type">Type: </label>
          <select id="db-type" name="database" value={database} onChange={e => handleChange(e)}>
            <option value="SQL">SQL</option>
            <option value="MongoDB">MongoDB</option>
          </select>
        </div>
        <div className="input-field">
          <label htmlFor="db-uri">URI</label>
          <input
            id="db-uri"
            name="URI"
            value={URI}
            onChange={e => handleChange(e)}
            placeholder="Database URI"
            required
          />
        </div>
        <div className="input-field">
          <label htmlFor="db-name">Name</label>
          <input
            id="db-name"
            type="text"
            name="name"
            value={name}
            onChange={e => handleChange(e)}
            placeholder="Database Name"
            required
          />
        </div>
        <button className="submitBtn">Submit</button>
      </form>
    </div>
  );
};

export default AddModal;
