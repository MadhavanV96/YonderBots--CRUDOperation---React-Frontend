import { useEffect, useState } from "react";
import axios from "axios";

const ViewDataComponent = () => {
  const [data, setData] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editedData, setEditedData] = useState({ name: "", age: "", email: "", address: "", image: null, document: null, subjects: [] });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios.get("http://localhost:5000/data")
      .then(response => setData(response.data))
      .catch(error => console.error("Error fetching data:", error));
  };

  const handleEdit = (item) => {
    setEditingId(item._id);
    setEditedData({ name: item.name, age: item.age, email: item.email, address: item.address, image: item.image, document: item.document, subjects: item.subjects });
  };

  const handleSave = (id) => {
    const formData = new FormData();
    formData.append("name", editedData.name);
    formData.append("age", editedData.age);
    formData.append("email", editedData.email);
    formData.append("address", editedData.address);
    if (editedData.image) formData.append("image", editedData.image);
    if (editedData.document) formData.append("document", editedData.document);
    formData.append("subjects", JSON.stringify(editedData.subjects));

    axios.put(`http://localhost:5000/data/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then(() => {
        setEditingId(null);
        fetchData();
      })
      .catch(error => console.error("Error updating data:", error));
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:5000/data/${id}`)
      .then(() => fetchData())
      .catch(error => console.error("Error deleting data:", error));
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Stored Data</h2>
      {data.length > 0 ? (
        <div className="space-y-4">
          {data.map((item) => (
            <div key={item._id} className="p-4 border rounded-md">
              {editingId === item._id ? (
                <div>
                  <input type="text" value={editedData.name} onChange={(e) => setEditedData({ ...editedData, name: e.target.value })} className="w-full p-2 border rounded-md" />
                  <input type="number" value={editedData.age} onChange={(e) => setEditedData({ ...editedData, age: e.target.value })} className="w-full p-2 border rounded-md" />
                  <input type="email" value={editedData.email} onChange={(e) => setEditedData({ ...editedData, email: e.target.value })} className="w-full p-2 border rounded-md" />
                  <input type="text" value={editedData.address} onChange={(e) => setEditedData({ ...editedData, address: e.target.value })} className="w-full p-2 border rounded-md" />
                  <input type="file" accept="image/*" onChange={(e) => setEditedData({ ...editedData, image: e.target.files[0] })} className="w-full p-2 border rounded-md" />
                  <input type="file" accept="application/pdf" onChange={(e) => setEditedData({ ...editedData, document: e.target.files[0] })} className="w-full p-2 border rounded-md" />
                  {editedData.subjects.map((subject, index) => (
                    <div key={index} className="flex space-x-2">
                      <input type="text" value={subject.subjectName} onChange={(e) => {
                        const newSubjects = [...editedData.subjects];
                        newSubjects[index].subjectName = e.target.value;
                        setEditedData({ ...editedData, subjects: newSubjects });
                      }} className="w-1/2 p-2 border rounded-md" />
                      <input type="number" value={subject.mark} onChange={(e) => {
                        const newSubjects = [...editedData.subjects];
                        newSubjects[index].mark = e.target.value;
                        setEditedData({ ...editedData, subjects: newSubjects });
                      }} className="w-1/2 p-2 border rounded-md" />
                    </div>
                  ))}
                  <button onClick={() => handleSave(item._id)} className="mt-2  mx-2 p-2 bg-green-600 text-white">Save</button>
                  <button onClick={() => setEditingId()} className="mt-2 p-2 bg-green-600 text-white">Cancel</button>
                </div>
              ) : (
                <div>
                  <p><strong>Name:</strong> {item.name}</p>
                  <p><strong>Age:</strong> {item.age}</p>
                  <p><strong>Email:</strong> {item.email}</p>
                  <p><strong>Address:</strong> {item.address}</p>
                  <p><strong>Subjects:</strong></p>
                  <ul className="list-disc list-inside">
                    {item.subjects.map((subject, index) => (
                      <li key={index}>{subject.subjectName} - {subject.mark}</li>
                    ))}
                  </ul>
                  <p><strong>Image:</strong></p>
                  <img src={`http://localhost:5000/${item.image}`} alt="Uploaded" className="w-32 h-32 object-cover rounded-md mt-2" />
                  <p><strong>Document:</strong> <a href={`http://localhost:5000/${item.document}`} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">Download</a></p>
                  <button onClick={() => handleEdit(item)} className="mx-2 p-2 bg-blue-600 text-white">Edit</button>
                  <button onClick={() => handleDelete(item._id)} className="mx-2 p-2 bg-red-600 text-white">Delete</button>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p>No data found.</p>
      )}
    </div>
  );
};

export default ViewDataComponent;
