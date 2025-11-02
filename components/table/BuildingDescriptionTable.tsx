"use client";

import { IconPlus, IconTrash } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { Button, Form, Table } from "react-bootstrap";

interface BuildingRow {
  buildingType: string;
  taxRate: string | number;
  usageType: string;
  floorName: string; // 👈 one dropdown instead of 3 separate fields
  dimension: string; // 👈 to enter "20x30"
  sqFt: string | number;
  sqM: string | number;
  year: string | number;
}

interface BuildingDescriptionTableProps {
  rows: BuildingRow[];
  setRows: React.Dispatch<React.SetStateAction<BuildingRow[]>>;
}

export default function BuildingDescriptionTable({
  rows,
  setRows,
}: BuildingDescriptionTableProps) {
  const [buildingTaxList, setBuildingTaxList] = useState<
    { buildingType: string; taxRate?: number }[]
  >([]);

  // ------------------
  // Fetch Building Tax Options
  // ------------------
  useEffect(() => {
    const fetchBuildingTax = async () => {
      try {
        const res = await fetch("/api/buildingTaxRate");
        const json = await res.json();
        if (Array.isArray(json.data)) setBuildingTaxList(json.data);
        else if (Array.isArray(json)) setBuildingTaxList(json);
        else setBuildingTaxList([]);
      } catch (error) {
        console.error("Error fetching building tax details:", error);
        setBuildingTaxList([]);
      }
    };
    fetchBuildingTax();
  }, []);

  // ------------------
  // Helpers
  // ------------------
  const parseArea = (value: string): number => {
    const parts = value.toLowerCase().split("x");
    if (parts.length === 2) {
      const length = parseFloat(parts[0]);
      const width = parseFloat(parts[1]);
      if (!isNaN(length) && !isNaN(width)) {
        const area = length * width;
        return parseFloat(area.toFixed(3));
      }
    }
    return 0;
  };

  // ------------------
  // Row Handlers
  // ------------------
  const addRow = () => {
    setRows([
      ...rows,
      {
        buildingType: "",
        taxRate: "",
        usageType: "",
        floorName: "",
        dimension: "",
        sqFt: "",
        sqM: "",
        year: "",
      },
    ]);
  };

  const removeRow = (index: number) => {
    const updated = [...rows];
    updated.splice(index, 1);
    setRows(updated);
  };

  const handleChange = (index: number, field: keyof BuildingRow, value: any) => {
    const updated = [...rows];
    updated[index][field] = value;

    // ✅ Auto-fill taxRate when buildingType changes
    if (field === "buildingType") {
      const selectedTax = buildingTaxList.find(
        (tax) => tax.buildingType === value
      );
      updated[index].taxRate = selectedTax?.taxRate ?? "";
    }

    // ✅ Auto-calculate area when dimension changes
    if (field === "dimension") {
      const area = parseArea(value);
      updated[index].sqFt = area ? area.toFixed(3) : "";
      updated[index].sqM = area ? (area * 0.092903).toFixed(3) : "";
    }

    setRows(updated);
  };

  // ------------------
  // JSX Layout
  // ------------------
  return (
    <div className="mt-4">
      {/* <h6 className="fw-bold mb-3">बांधकाचे वर्णन</h6> */}

      <Table
        responsive
        hover
        className="align-middle text-center table-sm compact-table"
      >
        <thead className="table-light">
          <tr>
            <th>मालमत्तेचे वर्णन</th>
            <th>कराचा दर (पैसे)</th>
            <th>वापराचे प्रकार</th>
            <th>मजला निवडा</th>
            <th>क्षेत्रफळ</th>
            <th>चौ. फुट</th>
            <th>चौ. मिटर</th>
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
                  onChange={(e) =>
                    handleChange(index, "buildingType", e.target.value)
                  }
                >
                  <option value="">-- निवडा --</option>
                  {buildingTaxList.map((tax, i) => (
                    <option key={i} value={tax.buildingType}>
                      {tax.buildingType}
                    </option>
                  ))}
                </Form.Select>
              </td>

              {/* Tax Rate */}
              <td>
                <Form.Control
                  type="number"
                  value={row.taxRate}
                  readOnly
                  placeholder="दर"
                />
              </td>

              {/* Usage Type */}
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

              {/* Floor Name Dropdown */}
              <td>
                <Form.Select
                  value={row.floorName}
                  onChange={(e) =>
                    handleChange(index, "floorName", e.target.value)
                  }
                >
                  <option value="">-- मजला निवडा --</option>
                  <option value="तळ मजला">तळ मजला</option>
                  <option value="मजला क. 1">मजला क. 1</option>
                  <option value="मजला क. 2">मजला क. 2</option>
                  <option value="मजला क. 3">मजला क. 2</option>
                  <option value="इतर">इतर</option>
                </Form.Select>
              </td>

              {/* Dimension Input */}
              <td>
                <Form.Control
                  type="text"
                  placeholder="उदा. 20x30"
                  value={row.dimension}
                  onChange={(e) =>
                    handleChange(index, "dimension", e.target.value)
                  }
                />
              </td>

              {/* Area fields */}
              <td>
                <Form.Control
                  type="number"
                  value={row.sqFt}
                  placeholder="sq.ft"
                  readOnly
                />
              </td>

              <td>
                <Form.Control
                  type="number"
                  value={row.sqM}
                  placeholder="sq.m"
                  readOnly
                />
              </td>

              {/* Year */}
              <td>
                <Form.Control
                  type="number"
                  placeholder="वर्ष"
                  value={row.year}
                  onChange={(e) => handleChange(index, "year", e.target.value)}
                />
              </td>

              {/* Actions */}
              <td>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => removeRow(index)}
                >
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
