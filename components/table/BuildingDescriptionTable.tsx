"use client";
import { Plus, Trash } from "lucide-react";
import { useState } from "react";
import { Button, Form, Table } from "react-bootstrap";

export default function BuildingDescriptionTable() {
  const [rows, setRows] = useState([
    {
      buildingType: "",
      taxRate: "",
      usageType: "",
      areaLength: "",
      areaWidth: "",
      floor: "",
      floor1: "",
      floor2: "",
      sqFt: "",
      sqM: "",
      year: "",
    },
  ]);

  const addRow = () => {
    setRows([
      ...rows,
      {
        buildingType: "",
        taxRate: "",
        usageType: "",
        areaLength: "",
        areaWidth: "",
        floor: "",
        floor1: "",
        floor2: "",
        sqFt: "",
        sqM: "",
        year: "",
      },
    ]);
  };

  const removeRow = (index) => {
    const updated = [...rows];
    updated.splice(index, 1);
    setRows(updated);
  };

  const handleChange = (index, field, value) => {
    const updated = [...rows];
    updated[index][field] = value;
    setRows(updated);
  };

  return (
    <div className="mt-4">
      <h6 className="fw-bold mb-3">बांधकाचे वर्णन</h6>

      <Table responsive hover className="align-middle table-sm compact-table">
        <thead className="table-light">
          <tr>
            <th>मालमत्तेचे वर्णन</th>
            <th>कराचा दर (पैसे)</th>
            <th>वापराचे प्रकार</th>
            <th>लांबी (ft)</th>
            <th>रुंदी (ft)</th>
            <th>तळ मजला</th>
            <th>मजला क. 1</th>
            <th>मजला क. 2</th>
            <th>चौ. फुट</th>
            <th>चौ. मिटर</th>
            <th>वर्ष</th>
            <th>क्रिया</th>
          </tr>
        </thead>

        <tbody>
          {rows.map((row, index) => (
            <tr key={index}>
              <td>
                <Form.Select
                  value={row.buildingType}
                  onChange={(e) =>
                    handleChange(index, "buildingType", e.target.value)
                  }
                >
                  <option value="">-- निवडा --</option>
                  <option value="rcc">आरसीसी पद्धतीची इमारत</option>
                  <option value="brick">
                    दगड, विटांची व चुना किंवा सिमेंट वापरून उभारलेली इमारत
                  </option>
                  <option value="mudbrick">
                    दगड, किंवा विटा वापरलेली मातीची इमारत
                  </option>
                  <option value="hut">झोपडी किंवा मातीची इमारत</option>
                </Form.Select>
              </td>

              <td>
                <Form.Control
                  type="number"
                  value={row.taxRate}
                  onChange={(e) =>
                    handleChange(index, "taxRate", e.target.value)
                  }
                  placeholder="उदा. 1.25"
                />
              </td>

              <td>
                <Form.Select
                  value={row.usageType}
                  onChange={(e) =>
                    handleChange(index, "usageType", e.target.value)
                  }
                >
                  <option value="">-- निवडा --</option>
                  <option value="residential">निवासी</option>
                  <option value="industrial">औद्योगिक</option>
                  <option value="commercial">वाणिज्यिक</option>
                </Form.Select>
              </td>

              <td>
                <Form.Control
                  type="number"
                  placeholder="लांबी"
                  value={row.areaLength}
                  onChange={(e) =>
                    handleChange(index, "areaLength", e.target.value)
                  }
                />
              </td>

              <td>
                <Form.Control
                  type="number"
                  placeholder="रुंदी"
                  value={row.areaWidth}
                  onChange={(e) =>
                    handleChange(index, "areaWidth", e.target.value)
                  }
                />
              </td>

              <td>
                <Form.Control
                  type="text"
                  placeholder="तळ मजला"
                  value={row.floor}
                  onChange={(e) => handleChange(index, "floor", e.target.value)}
                />
              </td>

              <td>
                <Form.Control
                  type="text"
                  placeholder="मजला क. 1"
                  value={row.floor1}
                  onChange={(e) => handleChange(index, "floor1", e.target.value)}
                />
              </td>

              <td>
                <Form.Control
                  type="text"
                  placeholder="मजला क. 2"
                  value={row.floor2}
                  onChange={(e) => handleChange(index, "floor2", e.target.value)}
                />
              </td>

              <td>
                <Form.Control
                  type="number"
                  placeholder="चौ. फुट"
                  value={row.sqFt}
                  onChange={(e) => handleChange(index, "sqFt", e.target.value)}
                />
              </td>

              <td>
                <Form.Control
                  type="number"
                  placeholder="चौ. मिटर"
                  value={row.sqM}
                  onChange={(e) => handleChange(index, "sqM", e.target.value)}
                />
              </td>

              <td>
                <Form.Control
                  type="number"
                  placeholder="वर्ष"
                  value={row.year}
                  onChange={(e) => handleChange(index, "year", e.target.value)}
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
