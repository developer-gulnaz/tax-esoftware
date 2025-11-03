"use client";
import { Button } from "node_modules/react-bootstrap/esm";
import { useRef } from "react";
import useAdmin from "hooks/useAdmin";

export default function Assessment8List() {
  const printRef = useRef<HTMLDivElement | null>(null);
  const admin = useAdmin();
  const handlePrint = () => window.print();
  const handleCancel = () => {
    if (window.opener) window.close();
    else window.history.back();
  };

  return (
    <div style={{ background: "#fff", padding: "10px" }}>
      {/* Buttons */}
      <div className="no-print mb-3 float-end">
        <Button className="btn-sm border-0 me-2" onClick={handlePrint}>Print</Button>
        <Button className="bg-danger btn-sm border-0" onClick={handleCancel}>Cancel</Button>
      </div>

      <div ref={printRef}>
        <table className="akarani-table tableAkarni">
          <thead>
            {/* ====== Top Header (Title Section) ====== */}
            <tr>
              <th colSpan={5} className="top-left pb-2">
                ग्रामपंचायत : {admin?.gpName}<br />
                तालुका : रामटेक<br />
                जिल्हा : नागपूर
              </th>

              <th colSpan={15} className="top-center pb-2">
                <div>नमुना ८</div>
                <div>नियम ३२ (१)</div>
                <div>सन २०२२-२३ या वर्षासाठी कर आकारणी नोंदवही</div>
              </th>

              <th colSpan={5} className="top-right">
                <p> पान क्र. : १</p>
              </th>
            </tr>


            {/* ====== Column Headers ====== */}
            <tr>
              <th rowSpan={3}>अ. क्र.</th>
              <th rowSpan={3}>रस्त्याचे नाव</th>
              <th rowSpan={3}>मालमत्ता क्रमांक</th>
              <th rowSpan={3}>मालकाचे नाव<br />भोगवटादाराचे नाव</th>
              <th rowSpan={3}>मालमत्तेचे वर्णन</th>
              <th rowSpan={3}>इमारतीचे वयोमान<br />बांधकाम वर्ष</th>
              <th rowSpan={3}>मालमत्तेचे क्षेत्रफळ<br />चौ. फू / ह / चौ. मी</th>
              <th colSpan={3}>रेडीरेकनर दर<br />प्रति चौ. मी.</th>
              <th rowSpan={3}>घसारा दर</th>
              <th rowSpan={3}>भारांक</th>
              <th rowSpan={3}>भांडवली मुल्य<br />(रुपये)</th>
              <th rowSpan={3}>कराचा दर<br />(पैसे)</th>

              {/* Grouped headers */}
              <th colSpan={4}>आकारणी केलेल्या करांची रक्कम</th>
              <th colSpan={4}>अपीलाचे निकाल आणि त्यानंतर केलेले फेरफार (रुपये)</th>
              <th rowSpan={3}>
                नंतर वाढ किंवा घट झालेल्या<br />
                बाबतीत आदेशाच्या<br />
                संदर्भात शेरा
              </th>
            </tr>

            {/* ====== Subheaders for grouped columns ====== */}
            <tr>
              <th>एकून जागा</th>
              <th>इमारत</th>
              <th>बांधकाम</th>

              <th>इमारत कर</th>
              <th>विजकर</th>
              <th>सा.पानीपट्टी</th>
              <th>विशेष पानीपट्टी</th>

              <th>इमारत कर</th>
              <th>विजकर</th>
              <th>सा.पानीपट्टी</th>
              <th>विशेष पानीपट्टी</th>
            </tr>
          </thead>

          <tbody>
            {/* ===== Number Row styled like header ===== */}
            <tr className="number-row">
              {[
                "1", "2,3", "4", "5", "6", "7", "8", "9", "10",
                "11", "12", "13,14", "15", "16", "17", "18",
                "19", "20", "21", "22", "23", "24", "25"
              ].map((num, i) => (
                <td key={i} className="num-cell">
                  {num}
                </td>
              ))}
            </tr>

            {/* ===== Empty Rows ===== */}
            {Array.from({ length: 5 }).map((_, rowIndex) => (
              <tr key={rowIndex}>
                {Array.from({ length: 23 }).map((__, colIndex) => (
                  <td key={colIndex}>&nbsp;</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>


    </div>
  );
}
