import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import axios from "axios";

const FormComponent = () => {
  const { register, control, handleSubmit } = useForm({
    defaultValues: {
      subjects: [{ subjectName: "", mark: "" }],
    },
  });

  const { fields, append } = useFieldArray({ control, name: "subjects" });
  const [image, setImage] = useState(null);
  const [document, setDocument] = useState(null);

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("age", data.age);
    formData.append("email", data.email);
    formData.append("address", data.address);
    formData.append("image", image);
    formData.append("document", document);
    formData.append("subjects", JSON.stringify(data.subjects));
    console.log(image);
    console.log(document);
    

    try {
      await axios.post("https://yonder-crud-operations-backend.onrender.com/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Form submitted successfully!");
    } catch (error) {
      console.error(error);
      alert("Error submitting form");
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg">
        <h1 className="text-center">
            <strong>
            Student Information Form
            </strong>
        </h1>
      <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data" className="space-y-4">
        <input {...register("name")} placeholder="Name" required className="w-full p-2 border rounded-md" />
        <input type="number" {...register("age")} placeholder="Age" required className="w-full p-2 border rounded-md" />
        <input type="email" {...register("email")} placeholder="Email" required className="w-full p-2 border rounded-md" />
        <input {...register("address")} placeholder="Address" required className="w-full p-2 border rounded-md" />
        
        <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} required className="w-full p-2 border rounded-md" />
        <input type="file" accept="application/pdf" onChange={(e) => setDocument(e.target.files[0])} required className="w-full p-2 border rounded-md" />
        
        {fields.map((field, index) => (
          <div key={field.id} className="flex space-x-2">
            <input {...register(`subjects.${index}.subjectName`)} placeholder="Subject Name" required className="w-1/2 p-2 border rounded-md" />
            <input type="number" {...register(`subjects.${index}.mark`)} placeholder="Mark" required className="w-1/2 p-2 border rounded-md" />
          </div>
        ))}
        
        <button type="button" onClick={() => append({ subjectName: "", mark: "" })} className="w-full p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
          Add Subject
        </button>
        <button type="submit" className="w-full p-2 bg-green-500 text-white rounded-md hover:bg-green-600">
          Submit
        </button>
      </form>
    </div>
  );
};

export default FormComponent;