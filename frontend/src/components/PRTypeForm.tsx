import { useState } from "react";

interface PRTypeFormProps {
  onSubmit: (formData: string) => void;
}

const PRTypeForm = ({ onSubmit }: PRTypeFormProps) => {
  const [prType, setPrType] = useState("");
  const [documentType, setDocumentType] = useState("");
  const [assignmentType, setAssignmentType] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (prType && documentType && assignmentType && !isSubmitted) {
      const formData = `PR Type: ${prType}\nDocument Type: ${documentType}\nAssignment Type: ${assignmentType}`;
      setIsSubmitted(true);
      onSubmit(formData);
    }
  };

  const isFormValid = prType && documentType && assignmentType && !isSubmitted;

  return (
    <div className="card w-full max-w-md mx-auto bg-base-200 shadow-lg">
      <div className="card-body">
        <h2 className="card-title text-center mb-4">Purchase Requisition Details</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">PR Type</span>
            </label>
            <select
              className="select select-bordered w-full focus:select-primary"
              value={prType}
              onChange={(e) => setPrType(e.target.value)}
            >
              <option value="">Select PR Type</option>
              <option value="Service">Service</option>
              <option value="Item">Item</option>
            </select>
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">Document Type</span>
            </label>
            <select
              className="select select-bordered w-full focus:select-primary"
              value={documentType}
              onChange={(e) => setDocumentType(e.target.value)}
            >
              <option value="">Select Document Type</option>
              <option value="Capex">Capex</option>
              <option value="Manual">Manual</option>
            </select>
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">Assignment Type</span>
            </label>
            <select
              className="select select-bordered w-full focus:select-primary"
              value={assignmentType}
              onChange={(e) => setAssignmentType(e.target.value)}
            >
              <option value="">Select Assignment Type</option>
              <option value="Cost Center">Cost Center</option>
              <option value="WBS">WBS</option>
            </select>
          </div>

          <div className="form-control mt-6">
            <button
              type="submit"
              className={`btn btn-primary ${!isFormValid ? 'btn-disabled' : ''}`}
              disabled={!isFormValid}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PRTypeForm;