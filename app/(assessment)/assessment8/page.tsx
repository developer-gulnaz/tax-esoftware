"use client";
import { Button } from "node_modules/react-bootstrap/esm";
import { useEffect, useRef, useState } from "react";
import useAdmin from "hooks/useAdmin";

export default function Assessment8List() {

  useEffect(() => {
    document.title = "आकारणी नोंदवनोंही";
  }, []);

  const printRef = useRef<HTMLDivElement | null>(null);
  const admin = useAdmin();
  const [financialYear, setFinancialYear] = useState("");
  const [rows, setRows] = useState<any[]>([]);

  const handlePrint = () => window.print();
  const handleCancel = () => {
    if (window.opener) window.close();
    else window.history.back();
  };


  useEffect(() => {
    const fy = sessionStorage.getItem("financialYear");
    setFinancialYear(fy || "");
  }, []);

  useEffect(() => {
    const stored = sessionStorage.getItem("assessmentRecords");
    if (!stored) return;
    setRows(JSON.parse(stored));
  }, []);


  const getFYStartYear = () => {
    const fy = sessionStorage.getItem("financialYear");
    if (!fy) return null;

    // financialYear format expected: "2025-2026"
    const [startYear] = fy.split("-");
    return parseInt(startYear);
  };

  const getBuildingAge = (constructionYear: number) => {
    const fyStart = getFYStartYear();
    if (!fyStart || !constructionYear) return "-";

    return fyStart - constructionYear;
  };


  return (
    <div style={{ background: "#fff", padding: "10px", width: "fit-content" }}>
      {/* Buttons */}
      <div className="no-print mb-3 float-end">
        <Button className="btn-sm border-0 me-2" onClick={handlePrint}>Print</Button>
        <Button className="bg-danger btn-sm border-0" onClick={handleCancel}>Cancel</Button>
      </div>

      <div ref={printRef}>
        <table className="akarani-table tableAkarni table-responsive">

          <thead>
            {/* ====== Top Header (Title Section) ====== */}
            <tr>
              <th colSpan={5} className="top-left pb-2">
                ग्रामपंचायत : {admin?.gpName}<br />
                तालुका : {admin?.tehsil}<br />
                जिल्हा : {admin?.district}
              </th>

              <th colSpan={16} className="top-center pb-2">
                <div>नमुना ८</div>
                <div>नियम ३२ (१)</div>
                <div>सन {financialYear} या वर्षासाठी कर आकारणी नोंदवही</div>
              </th>

              <th colSpan={9} className="top-right">
                <p> पान क्र. : १</p>
              </th>
            </tr>

            {/* ====== Column Headers ====== */}
            <tr className="text-center">
              <th rowSpan={3}>अ. क्र.</th>
              <th rowSpan={3}>रस्त्याचे नाव</th>
              <th rowSpan={3}>मालमत्ता क्रमांक</th>
              <th rowSpan={3} className="col-width">मालकाचे नाव<br />भोगवटादाराचे नाव</th>
              <th rowSpan={3} className="col-width">मालमत्तेचे वर्णन</th>
              <th rowSpan={3}>इमारतीचे वयोमान<br />बांधकाम वर्ष</th>
              <th rowSpan={3} className="col-width">मालमत्तेचे क्षेत्रफळ <br />चौ.फू/चौ.मी</th>
              <th colSpan={3}>रेडीरेकनर दर प्रति चौ. मी.</th>
              <th rowSpan={3}>घसारा दर</th>
              <th rowSpan={3}>भारांक</th>
              <th rowSpan={3}>भांडवली मुल्य (रुपये)</th>
              <th rowSpan={3}>कराचा दर (पैसे)</th>

              <th colSpan={7}>आकारणी केलेल्या करांची रक्कम</th>
              <th colSpan={7}>अपीलाचे निकाल आणि त्यानंतर केलेले फेरफार (रुपये)</th>

              <th rowSpan={4}>
                नंतर वाढ किंवा घट झालेल्या<br />
                बाबतीत आदेशाच्या<br />
                संदर्भात शेरा
              </th>
              <th rowSpan={3}>फोटो</th>
            </tr>

            {/* ====== Subheaders for grouped columns ====== */}
            <tr className="text-center">
              <th>एकून जागा</th>
              <th>इमारत</th>
              <th>बांधकाम</th>

              <th>इमारत कर</th>
              <th>विजकर</th>
              <th className="px-0">सा.पानीपट्टी</th>
              <th>विशेष पानीपट्टी</th>
              <th>सामान्य सफाई कर</th>
              <th>आरोग्य रक्षण कर</th>
              <th>धंदा कर</th>

              <th>इमारत कर</th>
              <th>विजकर</th>
              <th className="px-0">सा.पानीपट्टी</th>
              <th>विशेष पानीपट्टी</th>
              <th>सामान्य सफाई कर</th>
              <th>आरोग्य रक्षण कर</th>
              <th>धंदा कर</th>
            </tr>
          </thead>

          <tbody>
            {/* Number Row */}
            <tr className="number-row">
              {[
                "1", "2,3", "4", "5", "6", "7", "8", "9", "10",
                "11", "12", "13,14", "15", "16", "17", "18",
                "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31", "32"
              ].map((num, i) => (
                <td key={i} className="num-cell">{num}</td>
              ))}
            </tr>

            <tr className="empty-row">
              {/* 25 empty tds to match colgroup */}
              {Array.from({ length: 30 }).map((_, colIndex) => (
                <td key={colIndex}>&nbsp;</td>
              ))}
            </tr>
          </tbody>

          {/* Data Rows */}
          {rows.map((item, index) => {
            const area = item?.area || "";
            const rrLand = item?.landRate || "";
            const rrBuilding = item?.buildingRate || "";
            const rrConstruction = item?.constructionRate || "";
            const capitalValue = rrBuilding && area ? (rrBuilding * area).toFixed(2) : "";
            const dep = item?.depreciationRate || "";
            const weight = item?.weightage || "";
            const taxRate = item?.taxRate || "";

            return (
              <tbody key={index} className="print-block">
                <tr >
                  <td>{index + 1}</td>
                  <td>{item?.propertyCode || ""}</td>
                  <td>{item?.propertyNumber || ""}</td>

                  <td>
                    {item?.ownerName || ""}<br />
                    {item?.occupantName || ""}<br />
                    {item?.propertyWard || ""}
                    <div style={{ marginTop: "4px", gap: "10px" }}>
                      स्वत :<br /><br />
                      पूर्व : {item?.eastSide || "-"}<br />
                      पश्चिम : {item?.westSide || "-"}<br />
                      दक्षिण : {item?.southSide || "-"}<br />
                      उत्तर : {item?.northSide || "-"}<br />
                      दरवाजा : {item?.doorSide || "-"}
                    </div>
                  </td>

                  <td>
                    {item?.landArea && <>एकूण जागा<br /><br /></>}
                    {item?.buildingDescriptions?.length > 0
                      ? item.buildingDescriptions.map((b: any, i: number) => (
                        <div key={i} className="mb-5 mt-10">{b.buildingType}{i !== item.buildingDescriptions.length - 1 && <br />}</div>
                      ))
                      : "-"}
                  </td>

                  <td>
                    {item?.landArea && <><br /><br /></>}
                    {item?.buildingDescriptions?.length > 0
                      ? item.buildingDescriptions.map((b: any, i: number) => {
                        const age = getBuildingAge(b.year);
                        return (
                          <div key={i} className="mb-5 mt-10">
                            {b.year} <br />
                            ({age} वर्षे)
                            {i !== item.buildingDescriptions.length - 1 && <br />}
                          </div>
                        );
                      })
                      : "-"}
                  </td>

                  <td>
                    {item?.landArea && (
                      <div className="mb-5">
                        {item.landArea}<br />
                        {item.landAreaFeet} चौ.फु<br />
                        {item.landAreaMeter} चौ.मी
                      </div>
                    )}

                    {item?.buildingDescriptions?.length > 0
                      ? item.buildingDescriptions.map((b: any, i: number) => (
                        <div key={i} className="mb-5">
                          {b.floorName + ":"}<br />
                          {b.dimension}<br />
                          {b.sqFt + " चौ.फु"} <br />
                          {b.sqM + " चौ.मी"}
                        </div>
                      ))
                      : null}
                  </td>

                  {/* RR Rates */}
                  <td>{rrLand}</td>
                  <td>{rrBuilding}</td>
                  <td>{rrConstruction}</td>

                  {/* Depreciation */}
                  <td>{dep}</td>
                  <td>{weight}</td>

                  {/* Capital Value */}
                  <td>{capitalValue}</td>
                  <td>{taxRate}</td>

                  {/* Assessed Taxes */}
                  <td>{item?.buildingTax || ""}</td>
                  <td>{item?.lightTax || ""}</td>
                  <td>{item?.waterTax || ""}</td>
                  <td>{item?.specialWaterTax || ""}</td>

                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
              </tbody>
            );
          })}
          <tfoot>
            <tr>
              <th className="text-end" colSpan={13}>एकुण</th>
              <th></th>
              <th></th>
              <th></th>
              <th></th>
              <th></th>
              <th></th>
              <th></th>
              <th></th>
              <th className="text-center" style={{ color: "#800080 !important" }} colSpan={8}>Total</th>
              <th rowSpan={2}></th>
            </tr>

            <tr className="table-footer">
              <th colSpan={5}>टीप:-</th>
              <th colSpan={24}>वरील आकारणी सरकार कर आणि फीसंदर्भात गाव आणि नगरपंचायतीचे नियम 12 च्या उद्देशाने आहेत. या मालमत्तेच्या ताब्यात देण्यास, त्या मालकांच्या मालमत्तेचा स्ताव आहे. आणि शीर्षके र केली जात नाहीत. कर संकलन तसेच काश व पाण्याची सुविधा पुरेशी
                मर्यादित आहे.भांडवल मू हे मूमापन करण्यासाठी आधारभूत किंमत असते. ते बाजारभाव किंवा विक्री किंमत नाही. कोणत्याही मालमत्तेचे मूल्यांकन केवळ कर वसुलीच्या उद्देशाने केले जाते. भविष्यातील मूमापन केलेली मालमत्ता अनधिकृत णून काढावी लागल्यास
                मूल्यांकन फॉर्म किंवा कराची पावती अडथळा ठरणार नाही.
              </th>

            </tr>
          </tfoot>

        </table>
      </div>

      <div className="text-end px-5 page-footer">
        <p>
          ग्रामसेवक / ग्रामविकास अधिकारी<br />
          {admin?.gpName}
        </p>

      </div>

    </div>
  );
}
