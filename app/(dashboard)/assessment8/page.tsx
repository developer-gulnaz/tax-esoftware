"use client";

import {
  IconBuildingWarehouse,
  IconEdit,
  IconPrinter,
  IconTrash,
} from "@tabler/icons-react";
import TablePagination from "components/table/TablePagination";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button, Col, FormCheck, Row, Spinner, Table } from "react-bootstrap";

interface Tax {
  _id: string;
  taxName: string;
  amount: number;
  amountType: string;
}

interface PropertyData {
  _id: string;
  serialNo?: number;
  propertyCode?: string;
  propertyNumber?: string;
  address?: string;
  ownerName?: string;
  occupantName?: string;
  description?: string;
  isSelected?: boolean;
  selectedTaxes?: Tax[]; // <-- fetched as array of tax objects
}

export default function PropertyDetailsPage() {
  const router = useRouter();
  const [data, setData] = useState<PropertyData[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [total, setTotal] = useState<number>(0);

  // Protect route
  useEffect(() => {
    const admin = sessionStorage.getItem("admin");
    if (!admin) router.push("/sign-in");
  }, [router]);

  useEffect(() => {
    document.title = "मालमत्ता यादी";
  }, []);

  // ✅ Fetch property + tax data
  useEffect(() => {
    let aborted = false;

    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/property?page=${page}&limit=${pageSize}`, {
          cache: "no-store",
        });

        if (!res.ok) throw new Error(`Failed to fetch: ${res.status}`);

        const json = await res.json();
        const items: PropertyData[] = json?.data ?? [];
        const totalCount = json?.total ?? items.length;

        // ✅ Populate taxes for each property
        const updatedItems = await Promise.all(
          items.map(async (prop) => {
            if (!prop.selectedTaxes || prop.selectedTaxes.length === 0) return prop;

            // Convert IDs to full tax objects
            const taxIds = prop.selectedTaxes.map((t: any) => t._id || t);
            const taxRes = await fetch("/api/taxDetails");
            const taxJson = await taxRes.json();

            // Ensure we always have an array
            const allTaxes: Tax[] = Array.isArray(taxJson) ? taxJson : taxJson.data || [];

            const matchedTaxes = allTaxes.filter((t) => taxIds.includes(t._id));

            return { ...prop, selectedTaxes: matchedTaxes };
          })
        );

        if (!aborted) {
          setData(updatedItems);
          setTotal(totalCount);
        }
      } catch (err) {
        console.error("Error fetching property list:", err);
        if (!aborted) {
          setData([]);
          setTotal(0);
        }
      } finally {
        if (!aborted) setLoading(false);
      }
    };

    fetchData();
    return () => {
      aborted = true;
    };
  }, [page, pageSize]);

  const handleDelete = async (id: string) => {
    if (!confirm("तुम्हाला खात्री आहे का?")) return;
    const res = await fetch(`/api/property?id=${id}`, { method: "DELETE" });
    if (res.ok) {
      alert("Deleted!");
      setData((prev) => prev.filter((item) => item._id !== id));
    }
  };

  const getTaxAmount = (taxes: Tax[] | undefined, taxName: string) => {
    const tax = taxes?.find((t) => t.taxName.trim() === taxName.trim());
    return tax ? tax.amount.toFixed(2) : "-";
  };

  // Calculate Imarat Kar (Building Tax)
  const calculateBuildingTax = (taxes: Tax[] | undefined) => {
    if (!taxes) return "-";

    const buildingTax = taxes.find((t) => t.taxName.trim() === "इमारत कर");
    if (!buildingTax) return "-";

    // Example: Apply 80% depreciation rate temporarily
    const depreciationRate = 80; // You’ll make this dynamic later
    const taxableAmount = (buildingTax.amount * (100 - depreciationRate)) / 100;

    return taxableAmount.toFixed(2);
  };


  return (
    <div className="custom-container">
      <div className="d-flex align-content-center mb-4">
        <IconBuildingWarehouse size={30} strokeWidth={1.5} />
        <h3 className="fw-bold px-2 mt-1">मालमत्ता यादी</h3>
      </div>

      <div className="mb-5">
        {/* सर्व (All Records) */}
        <Button
          className="border-0"
          variant="success"
          onClick={() => {
            if (data.length === 0) {
              alert("कोणतेही रेकॉर्ड उपलब्ध नाहीत!");
              return;
            }

            // get all records visible on the current page
            const ids = data.map((r) => r._id).join(",");
            window.open(`/assessment8List?ids=${ids}&mode=all`, "_blank");
          }}
        >
          सर्व
        </Button>

        {/* निवडलेले (Selected Records) */}
        <Button
          className="bg-danger border-0 mx-2"
          onClick={() => {
            const selected = data.filter((r) => r.isSelected);
            if (selected.length === 0) {
              alert("कृपया किमान एक रेकॉर्ड निवडा!");
              return;
            }

            const ids = selected.map((r) => r._id).join(",");
            window.open(`/assessment8List?ids=${ids}&mode=selected`, "_blank");
          }}
        >
          निवडलेले
        </Button>
      </div>


      <Row>
        <Col md={12}>
          <div className="p-4 bg-light shadow-sm rounded-3">
            {loading ? (
              <div className="text-center py-5">
                <Spinner animation="border" variant="secondary" />
                <p className="mt-2 text-muted">Loading data...</p>
              </div>
            ) : (
              <>
                <Table
                  hover
                  responsive
                  className="borderless compact-table align-middle mb-0"
                >
                  <thead className="bg-light fw-semibold border-btm">
                    <tr>
                      <th></th>
                      <th>अनु नं.</th>
                      <th>मालमत्ता कोड</th>
                      <th>मालमत्ता क्रमांक</th>
                      <th>मालकाचे नाव</th>
                      <th>भोगवटा करणान्याचे नाव</th>
                      <th>पत्ता</th>
                      <th>इमारत कर</th>
                      <th>विजकर</th>
                      <th>सा.पानीपट्टी</th>
                      <th>विशेष पानीपट्टी</th>
                      <th>व्यवस्थापन</th>
                    </tr>
                  </thead>

                  <tbody>
                    {data.length > 0 ? (
                      data.map((item, idx) => (
                        <tr key={item._id ?? idx}>
                          <td>
                            <FormCheck
                              checked={!!item.isSelected}
                              onChange={(e) => {
                                const checked = e.target.checked;
                                setData((prev) =>
                                  prev.map((row) =>
                                    row._id === item._id
                                      ? { ...row, isSelected: checked }
                                      : row
                                  )
                                );
                              }}
                            />
                          </td>
                          <td>{(page - 1) * pageSize + idx + 1}</td>
                          <td>{item.propertyCode}</td>
                          <td>{item.propertyNumber}</td>
                          <td>{item.ownerName}</td>
                          <td>{item.occupantName || "-"}</td>
                          <td>{item.address || "-"}</td>

                          {/* ✅ Tax values */}
                          <td>{calculateBuildingTax(item.selectedTaxes)}</td>
                          <td>{getTaxAmount(item.selectedTaxes, "विजकर")}</td>
                          <td>{getTaxAmount(item.selectedTaxes, "सा.पानीपट्टी")}</td>
                          <td>{getTaxAmount(item.selectedTaxes, "विशेष पानीपट्टी")}</td>

                          <td>
                            <Button size="sm" variant="warning" className="me-2">
                              <IconEdit size={15} />
                            </Button>
                            <Button
                              size="sm"
                              variant="danger"
                              className="me-2"
                              onClick={() => handleDelete(item._id)}
                            >
                              <IconTrash size={15} />
                            </Button>
                            <Button size="sm" variant="info">
                              <IconPrinter size={15} />
                            </Button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={12} className="text-center py-4 text-muted">
                          कोणतेही रेकॉर्ड आढळले नाहीत
                        </td>
                      </tr>
                    )}
                  </tbody>
                </Table>

                <div className="mt-3">
                  <TablePagination
                    currentPage={page}
                    pageSize={pageSize}
                    totalRows={total}
                    onPageChange={(p) => setPage(p)}
                    onPageSizeChange={(size) => {
                      setPageSize(size);
                      setPage(1);
                    }}
                    hasIcon
                  />
                </div>
              </>
            )}
          </div>
        </Col>
      </Row>
    </div>
  );
}
