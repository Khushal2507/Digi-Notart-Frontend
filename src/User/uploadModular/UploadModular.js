import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../store/auth-context";
import "./UploadModular.css";
import { uploadFile } from "../../utils/uploadFile";

const UploadModular = () => {
  const ctx = useContext(AuthContext);
  const account = ctx.account;
  const upload = ctx.upload;
  const [file, setFiles] = useState(null);

  const handleChange = (e) => {
    // uploadFile(e.target.files[0], upload, account);
    setFiles(e.target.files[0]);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    console.log("Hi");
    console.log(file);
    console.log(ctx);
    uploadFile(file, upload, account);
    // ctx.upload(file, upload, account);
  };
  return (
    <div className="backdrop">
      <div className="uploadContainer">
        <h1>File Upload</h1>
        <form onSubmit={submitHandler}>
          <div className="description">
            <label>Description</label>
            <input
              id="fileDescription"
              type="text"
              className="form-control text-monospace"
              placeholder="description..."
              required
            />
          </div>

          <input type="file" onChange={handleChange}></input>
          <button type="submit">Upload</button>
        </form>

        <Link to="/admin">
          <button type="button">Okay</button>
        </Link>
      </div>
    </div>
  );
};

export default UploadModular;
