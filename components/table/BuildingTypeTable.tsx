"use client";

import { IconPlus, IconTrash } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { Button, Form, Table } from "react-bootstrap";

// ------------------
// ✅ Type Definitions
// ------------------
interface BuildingRow {
  buildingType: string;
  fixedRate: number;
  usageType: string;
  floor: string;
  sqFt: number;
  sqM: number;
  year: number;
}

// ------------------
// ✅ Props
// ------------------
interface BuildingTypeTableProps {
  rows: BuildingRow[];
  setRows: React.Dispatch<React.SetStateAction<BuildingRow[]>>;
}

// ------------------
// ✅ Component
// ------------------
export default function BuildingTypeTable({ rows, setRows }: BuildingTypeTableProps) {
  const [buildingTypeList, setBuildingTypeList] = useState<{ buildingType: string; fixedRate: number }[]>([]);

  // ------------------
  // Fetch Building Types
  // ------------------
  useEffect(() => {
    const fetchBuildingType = async () => {
      try {
        const res = await fetch("/api/buildingType");
        const json = await res.json();
        if (Array.isArray(json.data)) {
          setBuildingTypeList(json.data);
        } else if (Array.isArray(json)) {
          setBuildingTypeList(json);
        }
      } catch (error) {
        console.error("Error fetching building type:", error);
      }
    };
    fetchBuildingType();
  }, []);

  // ------------------
  // Area Calculation Helper
  // ------------------
  const parseArea = (value: string): number => {
    const parts = value.toLowerCase().split("x");
    if (parts.length === 2) {
      const length = parseFloat(parts[0]);
      const width = parseFloat(parts[1]);
      if (!isNaN(length) && !isNaN(width)) {
        return parseFloat((length * width).toFixed(3));
      }
    }
    return 0;
  };

  // ------------------
  // Handle Field Change
  // ------------------
  const handleChange = <K extends keyof BuildingRow>(
    index: number,
    field: K,
    value: BuildingRow[K]
  ) => {
    const updated = [...rows];
    if (!updated[index]) return;

    updated[index] = { ...updated[index], [field]: value };

    // ✅ Auto-fill rate when buildingType selected
    if (field === "buildingType") {
      const selected = buildingTypeList.find((b) => b.buildingType === value);
      updated[index].fixedRate = selected?.fixedRate ?? 0;
    }

    // ✅ Auto-calc sqFt and sqM when floor (dimension) changes
    if (field === "floor") {
      const area = parseArea(String(value));
      updated[index].sqFt = parseFloat(area.toFixed(3));
      updated[index].sqM = parseFloat((area * 0.092903).toFixed(3));
    }

    setRows(updated);
  };

  // ------------------
  // Row Add/Remove
  // ------------------
  const addRow = () => {
    setRows([
      ...rows,
      {
        buildingType: "",
        fixedRate: 0,
        usageType: "",
        floor: "",
        sqFt: 0,
        sqM: 0,
        year: 0,
      },
    ]);
  };

  const removeRow = (index: number) => {
    const updated = [...rows];
    updated.splice(index, 1);
    setRows(updated);
  };

  // ------------------
  // JSX Layout
  // ------------------
  return (
    <div className="mt-4">
      {/* <h6 className="fw-bold mb-3">बांधकाचा प्रकार आणि तपशील</h6> */}

      <Table responsive hover className="align-middle text-center table-sm">
        <thead className="table-light">
          <tr>
            <th>इमारतीचा प्रकार</th>
            <th>दर (%)</th>
            <th>मजला</th>
            <th>चौ. फुट</th>
            <th>चौ. मीटर</th>
            <th>वर्ष</th>
            <th>क्रिया</th>
          </tr>
        </thead>

        <tbody>
          {rows.map((row, index) => (
            <tr key={index}>
              {/* Building Type */}
              <td>
                <Form.Select
                  value={row.buildingType}
                  onChange={(e) => handleChange(index, "buildingType", e.target.value)}
                >
                  <option value="">-- निवडा --</option>
                  {buildingTypeList.map((b, i) => (
                    <option key={i} value={b.buildingType}>
                      {b.buildingType}
                    </option>
                  ))}
                </Form.Select>
              </td>

              {/* Rate */}
              <td>
                <Form.Control
                  type="number"
                  step="0.01"
                  value={row.fixedRate.toFixed(2)}
                  readOnly
                />
              </td>

              {/* Floor Dimension */}
              <td>
                <Form.Control
                  type="text"
                  placeholder="उदा. 20x30"
                  value={row.floor}
                  onChange={(e) => handleChange(index, "floor", e.target.value)}
                />
              </td>

              {/* sqFt */}
              <td>
                <Form.Control
                  type="number"
                  value={row.sqFt || ""}
                  readOnly
                />
              </td>

              {/* sqM */}
              <td>
                <Form.Control
                  type="number"
                  value={row.sqM || ""}
                  readOnly
                />
              </td>

              {/* Year */}
              <td>
                <Form.Control
                  type="number"
                  value={row.year || ""}
                  onChange={(e) =>
                    handleChange(index, "year", parseInt(e.target.value) || 0)
                  }
                />
              </td>

              {/* Actions */}
              <td>
                <Button variant="danger" size="sm" onClick={() => removeRow(index)}>
                  <IconTrash size={16} />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <div className="text-end">
        <Button variant="success" size="sm" onClick={addRow}>
          <IconPlus size={16} />
        </Button>
      </div>
    </div>
  );
}
