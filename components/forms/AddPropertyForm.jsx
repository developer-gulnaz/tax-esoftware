"use client";
import BuildingDescriptionTable from "components/table/BuildingDescriptionTable";
import FamilyMember from "components/table/FamilyMembers";
import { Button, Col, Row, Table } from "node_modules/react-bootstrap/esm";
import { useState, useEffect } from "react";


export default function AddPropertyForm() {
    const [taxItems, setTaxItems] = useState([{ id: 1 }]);

    const addTaxItem = () => {
        setTaxItems([...taxItems, { id: Date.now() }]);
    };

    const removeTaxItem = (id) => {
        setTaxItems(taxItems.filter((item) => item.id !== id));
    };

    const [selectedTypes, setSelectedTypes] = useState([]);

    const handleCheckboxChange = (e) => {
        const value = e.target.value;
        setSelectedTypes((prev) =>
            prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
        );
    };


    const [taxList, setTaxList] = useState([]);
    useEffect(() => {
        const fetchTaxes = async () => {
            try {
                const res = await fetch("/api/taxDetails");
                const json = await res.json();

                if (Array.isArray(json.data)) {
                    setTaxList(json.data);
                } else {
                    setTaxList([]);
                }

            } catch (error) {
                console.error("Error fetching tax details:", error);
                setTaxList([]);
            }
        };

        fetchTaxes();
    }, []);


    // for tax list selection
    const [selectedTaxes, setSelectedTaxes] = useState([]);
    const [selectAllTaxes, setSelectAllTaxes] = useState(false);

    const handleSelectAllTaxes = () => {
        if (selectAllTaxes) {
            setSelectedTaxes([]);
        } else {
            setSelectedTaxes(taxList.map(t => t._id));
        }
        setSelectAllTaxes(!selectAllTaxes);
    };

    const handleTaxChange = (id) => {
        setSelectedTaxes(prev =>
            prev.includes(id) ? prev.filter(t => t !== id) : [...prev, id]
        );
    };


    // for Akarani selection
    const [selectedAkarani, setSelectedAkarani] = useState([]);
    const [selectAllAkarani, setSelectAllAkarani] = useState(false);

    const handleSelectAllAkarani = () => {
        if (selectAllAkarani) {
            setSelectedAkarani([]);
        } else {
            setSelectedAkarani(taxList.map(t => t._id));
        }
        setSelectAllAkarani(!selectAllAkarani);
    };

    const handleAkaraniChange = (id) => {
        setSelectedAkarani(prev =>
            prev.includes(id) ? prev.filter(t => t !== id) : [...prev, id]
        );
    };


    return (
        <form className="container-fluid py-4">
            {/* मालकाची माहिती */}
            <Row>
                <Col md={9}>
                    <h5>मालकाची माहिती:</h5>
                    <Row className="g-3">
                        <Col md={4}>
                            <label className="form-label">मालकाचे नाव *</label>
                            <input type="text" name="ownerName" className="form-control" required />
                        </Col>
                        <Col md={4}>
                            <label className="form-label">मालकाचा पत्ता</label>
                            <input type="text" name="ownerAddress" className="form-control" />
                        </Col>
                        <Col md={4}>
                            <label className="form-label">मोबाइल नंबर *</label>
                            <input type="number" name="mobile" className="form-control" required />
                        </Col>
                        <Col md={4}>
                            <label className="form-label">फोन नंबर</label>
                            <input type="nunmber" name="phone" className="form-control" />
                        </Col>
                        <Col md={4}>
                            <label className="form-label">ई-मेल</label>
                            <input type="email" name="email" className="form-control" />
                        </Col>
                        <Col md={4}>
                            <label className="form-label">जन्मदिनांक</label>
                            <input type="date" name="dateOfBirth" className="form-control" />
                        </Col>
                        <Col md={4}>
                            <label className="form-label">फोटो</label>
                            <input type="file" name="image" className="form-control" />
                        </Col>
                    </Row>
                </Col>

                {/* कर तपशील */}
                <Col md={3}>
                    <small className="text-danger float-end">* आवश्यक तपशील</small>
                    <h5>कर तपशील *</h5>
                    <div className="form-check mb-2">
                        <input
                            type="checkbox"
                            className="form-check-input"
                            id="selectAllTaxes"
                            checked={selectAllTaxes}
                            onChange={handleSelectAllTaxes}
                        />
                        <label htmlFor="selectAllTaxes" className="form-check-label fw-bold">
                            सर्व निवडा
                        </label>
                    </div>
                    <div className="gap-3">
                        {taxList.map((tax, index) => (
                            <div key={tax._id} className="form-check">
                                <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id={`tax${index}`}
                                    checked={selectedTaxes.includes(tax._id)}
                                    onChange={() => handleTaxChange(tax._id)}
                                />
                                <label htmlFor={`tax${index}`} className="form-check-label">
                                    {tax.taxName}
                                </label>
                            </div>
                        ))}

                    </div>
                </Col>
            </Row>
            <hr />

            {/* मालमत्तेची माहिती */}
            <Row>
                <Col md={9} className="mt-5">
                    <h5>मालमत्तेची माहिती:</h5>
                    <Row className="g-3">
                        <Col md={4}>
                            <label className="form-label">मालमत्ता क्र *</label>
                            <input type="text" name="propertyNumber" className="form-control" />
                        </Col>
                        <Col md={4}>
                            <label className="form-label">मालमत्ता कोड</label>
                            <input type="text" name="propertyCode" className="form-control" />
                        </Col>
                        <Col md={4}>
                            <label className="form-label">व्याप्त</label>
                            <input type="text" name="kabjedar" className="form-control" />
                        </Col>
                        <Col md={4}>
                            <label className="form-label">मालमत्तेचे वर्णन</label>
                            <input type="text" name="propertyType" className="form-control" />
                        </Col>
                        <Col md={4}>
                            <label className="form-label">मालमत्ता पत्ता</label>
                            <select className="form-select">
                                <option>-- निवडा --</option>
                                <option value={"वार्ड क्र. -1"}> वार्ड क्र. -1 </option>
                                <option value={"वार्ड क्र. -2"}> वार्ड क्र. -2 </option>
                                <option value={"वार्ड क्र. -3"}> वार्ड क्र. -3 </option>
                                <option value={"वार्ड क्र. -4"}> वार्ड क्र. -4 </option>
                                <option value={"वार्ड क्र. -5"}> वार्ड क्र. -5 </option>
                                <option value={"वार्ड क्र. -6"}> वार्ड क्र. -6 </option>
                            </select>
                        </Col>
                        <Col md={4}>
                            <label className="form-label">आकारणी तारीख</label>
                            <input type="date" name="mDate" className="form-control" />
                        </Col>
                        <Col md={4}>
                            <label className="form-label">वार्षिक आकारणी रक्कम</label>
                            <input type="number" name="mAnnualAmount" className="form-control" />
                        </Col>
                        {/* <Col md={4}>
                            <label className="form-label">कुटुंबांची संख्या</label>
                            <input type="number" name="familyMemberCount" className="form-control" min="0" />
                        </Col> */}
                        <Col md={4}>
                            <label className="form-label">शेरा</label>
                            <textarea className="form-control" name="remarks" rows="2"></textarea>
                        </Col>
                    </Row>
                </Col>

                {/* आकारणी जोडण्यासाठी? */}
                <Col md={3} className="mt-5">
                    <h5>आकारणी जोडण्यासाठी?</h5>
                    <div className="form-check mb-2">
                        <input
                            type="checkbox"
                            className="form-check-input"
                            id="selectAllAkarani"
                            checked={selectAllAkarani}
                            onChange={handleSelectAllAkarani}
                        />
                        <label htmlFor="selectAllAkarani" className="form-check-label fw-bold">
                            सर्व निवडा
                        </label>
                    </div>
                    <div className="gap-3">
                        {taxList.map((tax, index) => (
                            <div key={tax._id} className="form-check">
                                <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id={`akarani${index}`}
                                    checked={selectedAkarani.includes(tax._id)}
                                    onChange={() => handleAkaraniChange(tax._id)}
                                />
                                <label htmlFor={`akarani${index}`} className="form-check-label">
                                    {tax.taxName}
                                </label>
                            </div>
                        ))}

                    </div>
                </Col>
            </Row>
            <hr />

            {/* जमिनिचे व इमारतीचे तपशील */}
            <div className="mt-5">
                <h5>जमिनिचे आणि इमारतीचे तपशील</h5>
                <Row className="mb-3 align-items-center">
                    <Col xs="12">
                        <label className="form-label me-3 mb-0">वापराचे प्रकार</label>
                        <div className="d-inline-flex align-items-center flex-wrap">
                            <div className="form-check me-4 mb-0">
                                <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="usageType1"
                                    value="निवासी"
                                />
                                <label className="form-check-label ms-1" htmlFor="usageType1">
                                    निवासी
                                </label>
                            </div>

                            <div className="form-check me-4 mb-0">
                                <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="usageType2"
                                    value="अनिवासी"
                                />
                                <label className="form-check-label ms-1" htmlFor="usageType2">
                                    अनिवासी
                                </label>
                            </div>

                            <div className="form-check mb-0">
                                <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="usageType3"
                                    value="खुला भुखंड"
                                />
                                <label className="form-check-label ms-1" htmlFor="usageType3">
                                    खुला भुखंड
                                </label>
                            </div>
                        </div>
                    </Col>
                </Row>


                <Row className="g-3">
                    <Col md={4}>
                        <label className="form-label">जमिनिचे क्षेत्रफळ</label>
                        <input type="number" name="landArea" className="form-control" />
                    </Col>
                    <Col md={4}>
                        <label className="form-label">चौ. फुट</label>
                        <input type="number" name="landAreaFeet" className="form-control" />
                    </Col>
                    <Col md={4}>
                        <label className="form-label">चौ. मीटर</label>
                        <input type="number" name="landAreaMeter" className="form-control" />
                    </Col>

                    <Col md={4}>
                        <label className="form-label">इमारतीचे चर्तुसिमा</label>
                        <input type="text" name="squareFoot" className="form-control" />
                    </Col>
                    <Col md={2}>
                        <label className="form-label">पूर्व</label>
                        <input type="text" name="sqrftEast" className="form-control" />
                    </Col>
                    <Col md={2}>
                        <label className="form-label">पश्चिम</label>
                        <input type="text" name="sqrftWest" className="form-control" />
                    </Col>
                    <Col md={2}>
                        <label className="form-label">उत्तर</label>
                        <input type="text" name="sqrftNorth" className="form-control" />
                    </Col>
                    <Col md={2}>
                        <label className="form-label">दक्षिण</label>
                        <input type="text" name="sqrftSouth" className="form-control" />
                    </Col>
                </Row>
            </div>
            <hr />

            {/* इमारत प्रकारानुसार दर */}
            <div className="mt-5">
                <h5>इमारत प्रकारानुसार दर</h5>
                <Row className="g-3">
                    <BuildingDescriptionTable />
                </Row>
            </div>
            <hr />

            {/* इमारत वापर तपशील */}
            <div className="mt-5">
                <h5>इमारत वापर तपशील</h5>

                <Row className="align-items-center mb-3">
                    <Col xs="12">
                        <label className="form-label me-3 mb-0">इमारत वापर प्रयोजन</label>
                        <div className="d-inline-flex align-items-center flex-wrap">
                            <div className="form-check me-4 mb-0">
                                <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="usageCommercial"
                                    name="buildingUsage"
                                    value="वाणिज्यीक"
                                    checked={selectedTypes.includes("वाणिज्यीक")}
                                    onChange={handleCheckboxChange}
                                />
                                <label className="form-check-label ms-1" htmlFor="usageCommercial">
                                    वाणिज्यीक
                                </label>
                            </div>

                            <div className="form-check me-4 mb-0">
                                <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="usageIndustrial"
                                    name="buildingUsage"
                                    value="औद्योगिक"
                                    checked={selectedTypes.includes("औद्योगिक")}
                                    onChange={handleCheckboxChange}
                                />
                                <label className="form-check-label ms-1" htmlFor="usageIndustrial">
                                    औद्योगिक
                                </label>
                            </div>
                        </div>
                    </Col>
                </Row>

                <Table responsive size="sm" className="align-middle">
                    <thead>
                        <tr>
                            <th>बांधकाचे वर्णन</th>
                            <th>क्षेत्रफळ लांबी x रुंदी</th>
                            <th>चौ. फुट</th>
                            <th>चौ. मिटर</th>
                            <th>वर्ष</th>
                            <th>तळ मजला</th>
                            <th>मजला क. 1</th>
                            <th>मजला क. 2</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>वाणिज्यीक</td>
                            {[...Array(7)].map((_, i) => (
                                <td key={i}>
                                    <input
                                        type="text"
                                        className="form-control form-control-sm"
                                        disabled={!selectedTypes.includes("वाणिज्यीक")}
                                    />
                                </td>
                            ))}
                        </tr>

                        <tr>
                            <td>औद्योगिक</td>
                            {[...Array(7)].map((_, i) => (
                                <td key={i}>
                                    <input
                                        type="text"
                                        className="form-control form-control-sm"
                                        disabled={!selectedTypes.includes("औद्योगिक")}
                                    />
                                </td>
                            ))}
                        </tr>
                    </tbody>
                </Table>
            </div>
            <hr />


            {/* वैयक्तिक व कौटुंबिक माहिती */}
            <div className="mt-5">
                <h5>वैयक्तिक व कौटुंबिक माहिती</h5>
                <Row className="g-3">
                    <Col md={3}>
                        <label className="form-label">कुंटूब प्रमुखाचे नांव</label>
                        <input type="text" name="familyHead" className="form-control" />
                    </Col>
                    <Col md={3}>
                        <label className="form-label">वय</label>
                        <input type="number" name="fhAge" className="form-control" />
                    </Col>
                    <Col md={3}>
                        <label className="form-label">आधार कार्ड क्र.</label>
                        <input type="text" name="fhAdhar" className="form-control" />
                    </Col>
                    <Col md={3}>
                        <label className="form-label">आधार कार्ड नाव</label>
                        <input type="text" name="fhAdharName" className="form-control" />
                    </Col>
                    <Col md={3}>
                        <label className="form-label">रेशन कार्ड</label>
                        <select className="form-select">
                            <option value={"APL"}> APL </option>
                            <option value={"BPL"}> BPL </option>
                        </select>
                    </Col>
                    <Col md={3}>
                        <label className="form-label">रेशन कार्ड क्र</label>
                        <input type="text" name="rashionCardNo" className="form-control" />
                    </Col>
                    <Col md={3}>
                        <label className="form-label">जात</label>
                        <input type="text" name="caste" className="form-control" />
                    </Col>
                    <Col md={3}>
                        <label className="form-label">पोटजात</label>
                        <input type="text" name="subCaste" className="form-control" />
                    </Col>

                    <Col md={3}>
                        <label className="form-label">घराचा प्रकार</label>
                        <input type="text" name="houseType" className="form-control" />
                    </Col>
                    <Col md={3}>
                        <label className="form-label">प्रभाग क्रमांक</label>
                        <input type="text" name="wardNum" className="form-control" />
                    </Col>
                    <Col md={3}>
                        <label className="form-label">घर क्रमांक</label>
                        <input type="text" name="houseNum" className="form-control" />
                    </Col>
                    <Col md={3}>
                        <label className="form-label">खसरा नं.</label>
                        <input type="text" name="khasraNum" className="form-control" />
                    </Col>

                    <Col md={3}>
                        <label className="form-label">रोड क्रमांक</label>
                        <input type="text" name="roadNum" className="form-control" />
                    </Col>

                    <Col md={3}>
                        <label className="form-label">उत्पन्नाचा स्रोत</label>
                        <select name="incomesource" className="form-select">
                            <option value={"agriculture"}> शेती </option>
                            <option value={"business"}> उद्योग </option>
                            <option value={"labour"}> श्रम </option>
                        </select>
                    </Col>

                    <Col md={3}>
                        <label className="form-label">तेथे जमीन आहे?</label>
                        <select name="jamin" className="form-select valid">
                            <option value="0" selected="selected">नाही</option>
                            <option value="1">होय</option>
                        </select>
                    </Col>
                    <Col md={3}>
                        <label className="form-label">किती जमीन (विघा)</label>
                        <input type="text" name="landSize" className="form-control" />
                    </Col>
                </Row>
            </div>
            <hr />

            {/* घरातील सदस्य */}
            <div className="mt-5">
                <h5>घरातील सदस्य</h5>
                <Row className="g-3">
                    <Col md={3}>
                        <label className="form-label">घरातील एकूण सदस्य</label>
                        <input type="number" name="memberCount" className="form-control" />
                    </Col>
                    <Col md={3}>
                        <label className="form-label">मुलगा</label>
                        <input type="number" name="boy" className="form-control" />
                    </Col>
                    <Col md={3}>
                        <label className="form-label">मुलगी</label>
                        <input type="number" name="girl" className="form-control" />
                    </Col>
                    <Col md={3}>
                        <label className="form-label">विधवा</label>
                        <input type="number" name="vidhva" className="form-control" />
                    </Col>
                </Row>
                <Row className="g-3">
                    <FamilyMember />
                </Row>
                <Row className="g-3">
                    <Col md={3}>
                        <label className="form-label">किरायदार</label>
                        <select name="isRental" className="form-select">
                            <option value={0}>नाही </option>
                            <option value={1}> होय </option>
                        </select>
                    </Col>
                    <Col md={3}>
                        <label className="form-label">किरायादाराचे नाव</label>
                        <input type="text" name="rentalName" className="form-control" readOnly />
                    </Col>
                    <Col md={3}>
                        <label className="form-label">संख्या</label>
                        <input type="text" name="rentedMemberCount" className="form-control" readOnly />
                    </Col>
                </Row>
            </div>
            <hr />

            {/* योजना आणि प्राणी तपशील */}
            <div className="mt-5">
                <h5>योजना आणि प्राणी तपशील</h5>
                <Row className="g-3">
                    <Col md={6}>
                        <label className="form-label">योजनेचे नाव</label>
                        <select className="form-select">
                            <option>-- निवडा --</option>
                            <option>-- 1 --</option>
                            <option>-- 2 --</option>
                        </select>
                    </Col>
                    <Col md={3}>
                        <label className="form-label">तारीख</label>
                        <input type="date" className="form-control" />
                    </Col>
                    <Col md={3}>
                        <label className="form-label">टीका</label>
                        <input type="text" className="form-control" />
                    </Col>

                    <Col md={4}>
                        <label className="form-label">गुरांचे नाव</label>
                        <input type="text" className="form-control" />
                    </Col>
                    <Col md={2}>
                        <label className="form-label">किती गुरे</label>
                        <input type="number" className="form-control" />
                    </Col>
                </Row>
            </div>
            <Button className="mt-3">नवीन जोडा</Button>
        </form >
    );
}