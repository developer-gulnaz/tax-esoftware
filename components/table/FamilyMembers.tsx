"use client";
import { Plus, Trash } from "lucide-react";
import { useState } from "react";
import { Button, Form, Table } from "react-bootstrap";

type MemberRow = {
  memberName: string;
  relation: string;
  age: string;
  gender: string;
  identityNo: string;
  dob: string;
};

export default function BuildingDescriptionTable() {
  const [rows, setRows] = useState<MemberRow[]>([
    {
      memberName: "",
      relation: "",
      age: "",
      gender: "",
      identityNo: "",
      dob: "",
    },
  ]);

  const addRow = () => {
    setRows([
      ...rows,
      {
        memberName: "",
        relation: "",
        age: "",
        gender: "",
        identityNo: "",
        dob: "",
      },
    ]);
  };

  const removeRow = (index: number) => {
    const updated = [...rows];
    updated.splice(index, 1);
    setRows(updated);
  };

  const handleChange = (
    index: number,
    field: keyof MemberRow,
    value: string
  ) => {
    const updated = [...rows];
    updated[index] = { ...updated[index], [field]: value };
    setRows(updated);
  };

  return (
    <div className="mt-4">
      <Table responsive hover className="align-middle table-sm compact-table">
        <thead className="table-light">
          <tr>
            <th>सदस्याचे नाव</th>
            <th>नाते</th>
            <th>वय</th>
            <th>लिंग</th>
            <th>निवडणूक कार्ड क्र.</th>
            <th>जन्मदिनांक</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {rows.map((row, index) => (
            <tr key={index}>
              <td>
                <Form.Control
                  type="text"
                  value={row.memberName}
                  onChange={(e) =>
                    handleChange(index, "memberName", e.target.value)
                  }
                />
              </td>
              <td>
                <Form.Control
                  type="text"
                  value={row.relation}
                  onChange={(e) =>
                    handleChange(index, "relation", e.target.value)
                  }
                />
              </td>
              <td>
                <Form.Control
                  type="number"
                  value={row.age}
                  onChange={(e) =>
                    handleChange(index, "age", e.target.value)
                  }
                />
              </td>
              <td>
                <Form.Select
                  value={row.gender}
                  onChange={(e) =>
                    handleChange(index, "gender", e.target.value)
                  }
                >
                  <option value="">लिंग निवडा</option>
                  <option value="male">पुरुष</option>
                  <option value="female">स्त्री</option>
                </Form.Select>
              </td>
              <td>
                <Form.Control
                  type="number"
                  value={row.identityNo}
                  onChange={(e) =>
                    handleChange(index, "identityNo", e.target.value)
                  }
                />
              </td>
              <td>
                <Form.Control
                  type="date"
                  value={row.dob}
                  onChange={(e) =>
                    handleChange(index, "dob", e.target.value)
                  }
                />
              </td>
              <td className="text-center">
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => removeRow(index)}
                >
                  <Trash size={16} />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <div className="text-end">
        <Button variant="success" size="sm" onClick={addRow}>
          <Plus size={16} />
        </Button>
      </div>
    </div>
  );
}
