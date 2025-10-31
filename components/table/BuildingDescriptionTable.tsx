"use client";

import { IconPlus, IconTrash } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { Button, Form, Table } from "react-bootstrap";

// ------------------
// ✅ Type Definitions
// ------------------
interface BuildingRow {
  buildingType: string;
  taxRate: string | number;
  usageType: string;
  floor: string;
  floor1: string;
  floor2: string;
  sqFt: string | number;
  sqM: string | number;
  year: string | number;
}

interface BuildingDescriptionTableProps {
  rows: BuildingRow[];
  setRows: React.Dispatch<React.SetStateAction<BuildingRow[]>>;
}

// ------------------
// ✅ Component
// ------------------
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
        const res = await fetch("/api/buildingTax");
        const json = await res.json();
        console.log("Building Tax Response:", json);

        if (Array.isArray(json.data)) {
          setBuildingTaxList(json.data);
        } else if (Array.isArray(json)) {
          setBuildingTaxList(json);
        } else {
          setBuildingTaxList([]);
        }
      } catch (error) {
        console.error("Error fetching building tax details:", error);
        setBuildingTaxList([]);
      }
    };

    fetchBuildingTax();
  }, []);

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
        floor: "",
        floor1: "",
        floor2: "",
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

  const handleChange = (index: number, field: keyof BuildingRow, value: any) => {
    const updated = [...rows];

    updated[index][field] = value;

    // ✅ If buildingType changes → auto taxRate
    if (field === "buildingType") {
      const selectedTax = buildingTaxList.find(
        (tax) => tax.buildingType === value
      );
      updated[index].taxRate = selectedTax?.taxRate ?? "";
    }

    // ✅ Auto calculate sqFt and sqM if any floor value changes
    if (["floor", "floor1", "floor2"].includes(field)) {
      const floorArea =
        parseArea(updated[index].floor) +
        parseArea(updated[index].floor1) +
        parseArea(updated[index].floor2);

      updated[index].sqFt = floorArea ? floorArea.toFixed(0) : "";
      updated[index].sqM = floorArea
        ? (floorArea * 0.092903).toFixed(3)
        : "";
    }

    setRows(updated);
  };

  // ------------------
  // JSX Layout
  // ------------------
  return (
    <div className="mt-4">
      <h6 className="fw-bold mb-3">बांधकाचे वर्णन</h6>

      <Table responsive hover className="align-middle text-center table-sm compact-table">
        <thead className="table-light">
          <tr>
            <th>मालमत्तेचे वर्णन</th>
            <th>कराचा दर (पैसे)</th>
            <th>वापराचे प्रकार</th>
            {/* <th>लांबी (ft)</th>
            <th>रुंदी (ft)</th> */}
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
                  {buildingTaxList.map((tax, i) => (
                    <option key={tax.buildingType + i} value={tax.buildingType}>
                      {tax.buildingType}
                    </option>
                  ))}
                </Form.Select>
              </td>

              {/* कराचा दर */}
              <td>
                <Form.Control
                  type="number"
                  value={row.taxRate}
                  onChange={(e) =>
                    handleChange(index, "taxRate", e.target.value)
                  }
                  // placeholder="उदा. 1.25"
                  readOnly // ✅ optional, since auto-filled
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
              {/* 
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
              </td> */}

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
                  value={row.sqFt
                    // row.areaLength && row.areaWidth
                    //   ? Number(row.areaLength) * Number(row.areaWidth)
                    //   : ""
                  }
                  readOnly
                />
              </td>

              <td>
                <Form.Control
                  type="number"
                  placeholder="चौ. मिटर"
                  value={row.sqM
                    // row.areaLength && row.areaWidth
                    //   ? (Number(row.areaLength) * Number(row.areaWidth) * 0.092903).toFixed(2)
                    //   : ""
                  }
                  readOnly
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
    </div >
  );
}
