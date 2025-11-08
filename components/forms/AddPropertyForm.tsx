"use client";
import BuildingDescriptionTable from "components/table/BuildingDescriptionTable";
import BuildingTypeTable from "components/table/BuildingTypeTable";
import FamilyMember from "components/table/FamilyMembers";
import { ChangeEvent, useEffect, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";

interface Tax {
    _id: string;
    taxName: string;
    amount: number;
    amountType: string;
}

interface SelectedTax {
    _id: string;
    taxName: string;
    amount: number;
    amountType: string;
}

interface Scheme {
    id?: string;
    schemeName: string;
}

interface FormDataState {
    [key: string]: string | number | boolean | undefined;
    landArea?: string;
    landAreaFeet?: string | number;
    landAreaMeter?: string | number;
}

export default function AddPropertyForm() {
    const [taxItems, setTaxItems] = useState<{ id: number }[]>([{ id: 1 }]);
    const [formData, setFormData] = useState<FormDataState>({});
    const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
    const [govtSchemeList, setGovtSchemeList] = useState<Scheme[]>([]);
    const [taxList, setTaxList] = useState<Tax[]>([]);
    const [selectedTaxes, setSelectedTaxes] = useState<string[]>([]);
    const [selectAllTaxes, setSelectAllTaxes] = useState(false);
    const [buildingDescriptions, setBuildingDescriptions] = useState<any[]>([]);
    const [buildingTypes, setBuildingTypes] = useState<any[]>([]);

    const addTaxItem = () => {
        setTaxItems([...taxItems, { id: Date.now() }]);
    };

    const removeTaxItem = (id: number) => {
        setTaxItems(taxItems.filter((item) => item.id !== id));
    };

    const handleLandAreaChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => {
            const updated = { ...prev, [name]: value };

            // Handle inputs like "20x30" or "20X30"
            if (name === "landArea") {
                const regex = /(\d+)\s*[xX]\s*(\d+)/;
                const match = value.match(regex);

                if (match) {
                    const length = parseFloat(match[1]);
                    const width = parseFloat(match[2]);

                    if (!isNaN(length) && !isNaN(width)) {
                        const areaFeet = length * width;
                        const areaMeter = areaFeet * 0.092903;

                        updated.landAreaFeet = areaFeet.toFixed(3);
                        updated.landAreaMeter = areaMeter.toFixed(3);
                    }
                } else {
                    updated.landAreaFeet = "";
                    updated.landAreaMeter = "";
                }
            }

            return updated;
        });
    };

    const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSelectedTypes((prev) =>
            prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
        );
    };

    useEffect(() => {
        const fetchGovtScheme = async () => {
            try {
                const res = await fetch("/api/govtScheme");
                const json = await res.json();

                if (Array.isArray(json.data)) {
                    setGovtSchemeList(json.data);
                } else {
                    setGovtSchemeList([]);
                }
            } catch (error) {
                console.error("Error fetching govt scheme details:", error);
                setGovtSchemeList([]);
            }
        };
        fetchGovtScheme();
    }, []);

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

    // ✅ Toggle a single tax checkbox
    const handleTaxChange = (id: string) => {
        setSelectedTaxes((prev) =>
            prev.includes(id) ? prev.filter((taxId) => taxId !== id) : [...prev, id]
        );
    };

    // ✅ Select/Deselect all
    const handleSelectAllTaxes = () => {
        if (selectAllTaxes) {
            setSelectedTaxes([]);
        } else {
            const allIds = taxList.map((tax) => tax._id);
            setSelectedTaxes(allIds);
        }
        setSelectAllTaxes(!selectAllTaxes);
    };


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (selectedTaxes.length === 0) {
            alert("किमान एक कर निवडणे आवश्यक आहे.");
            return;
        }
        const form = e.currentTarget;
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        // Convert number & boolean fields
        const parsed = {
            ...data,
            mobile: Number(data.mobile || 0),
            phone: Number(data.phone || 0),
            mAnnualAmount: Number(data.mAnnualAmount || 0),
            fhAge: Number(data.fhAge || 0),
            memberCount: Number(data.memberCount || 0),
            boy: Number(data.boy || 0),
            girl: Number(data.girl || 0),
            vidhva: Number(data.vidhva || 0),
            isRental: data.isRental === "1",
            landArea: data.landArea,
            landAreaFeet: Number(data.landAreaFeet || 0),
            landAreaMeter: Number(data.landAreaMeter || 0),
            rentedMemberCount: Number(data.rentedMemberCount || 0),
            selectedTaxes,
            buildingTypes,
            buildingDescriptions,
        };

        const imageFile = formData.get("image") as File | null;
        if (imageFile && imageFile.size > 0) {
            console.log("Image file selected:", imageFile.name);
        }

        try {
            const res = await fetch("/api/property", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(parsed),
            });

            const json = await res.json();

            if (json.success) {
                alert("🏠 Property added successfully!");
                // ✅ Safely reset the form
                form.reset();
                setSelectedTaxes([]);
                setBuildingTypes([]);
                setBuildingDescriptions([]);
            } else {
                alert("❌ Error: " + json.error);
            }
        } catch (error) {
            console.error("Submit error:", error);
            alert("⚠️ Something went wrong!");
        }
    };


    return (
        <form className="container-fluid py-4" onSubmit={handleSubmit}>
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

                    {/* सर्व निवडा checkbox */}
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

                    {/* Individual taxes */}
                    <div className="gap-3">
                        {taxList.map((tax, index) => (
                            <div key={tax._id} className="form-check mb-1">
                                <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id={`tax${index}`}
                                    checked={selectedTaxes.includes(tax._id)}
                                    onChange={() => handleTaxChange(tax._id)}
                                />
                                <label htmlFor={`tax${index}`} className="form-check-label">
                                    {tax.taxName}{" "}
                                    <small className="text-muted">
                                        ({tax.amountType === "रकमेमध्ये"
                                            ? `₹${tax.amount}`
                                            : `${tax.amount}%`})
                                    </small>
                                </label>
                            </div>
                        ))}
                    </div>
                </Col>

            </Row>
            <hr />

            {/* मालमत्तेची माहिती */}
            <Row>
                <Col md={12} className="mt-5">
                    <h5>मालमत्तेची माहिती:</h5>
                    <Row className="g-3">
                        <Col md={3}>
                            <label className="form-label">मालमत्ता क्र *</label>
                            <input type="text" name="propertyNumber" className="form-control" />
                        </Col>
                        <Col md={3}>
                            <label className="form-label">मालमत्ता कोड</label>
                            <input type="text" name="propertyCode" className="form-control" />
                        </Col>
                        <Col md={3}>
                            <label className="form-label">व्याप्त</label>
                            <input type="text" name="kabjedar" className="form-control" />
                        </Col>
                        <Col md={3}>
                            <label className="form-label">मालमत्तेचे वर्णन</label>
                            <input type="text" name="propertyType" className="form-control" />
                        </Col>
                        <Col md={3}>
                            <label className="form-label">मालमत्ता पत्ता</label>
                            <select name="propertyWard" className="form-select">
                                <option value={""}>-- निवडा --</option>
                                <option value={"वार्ड क्र. -1"}> वार्ड क्र. -1 </option>
                                <option value={"वार्ड क्र. -2"}> वार्ड क्र. -2 </option>
                                <option value={"वार्ड क्र. -3"}> वार्ड क्र. -3 </option>
                                <option value={"वार्ड क्र. -4"}> वार्ड क्र. -4 </option>
                                <option value={"वार्ड क्र. -5"}> वार्ड क्र. -5 </option>
                                <option value={"वार्ड क्र. -6"}> वार्ड क्र. -6 </option>
                            </select>
                        </Col>
                        <Col md={3}>
                            <label className="form-label">आकारणी तारीख</label>
                            <input type="date" name="mDate" className="form-control" />
                        </Col>
                        <Col md={3}>
                            <label className="form-label">वार्षिक आकारणी रक्कम</label>
                            <input type="number" name="mAnnualAmount" className="form-control" />
                        </Col>
                        <Col md={3}>
                            <label className="form-label">शेरा</label>
                            <input type="text" name="remark" className="form-control" />
                        </Col>
                    </Row>
                </Col>

                {/* आकारणी जोडण्यासाठी? */}
                {/* <Col md={3} className="mt-5">
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
                </Col> */}
            </Row>
            <hr />

            {/* जमिनिचे व इमारतीचे तपशील */}
            <div className="mt-5">
                <h5>जमिनिचे आणि इमारतीचे तपशील</h5>

                <Row className="g-3">
                    <Col md={4}>
                        <label className="form-label">जमिनिचे क्षेत्रफळ</label>
                        <input
                            type="text"
                            name="landArea"
                            className="form-control"
                            value={formData.landArea || ""}
                            onChange={handleLandAreaChange}
                            placeholder="उदा. 20x30"
                        />
                    </Col>

                    <Col md={4}>
                        <label className="form-label">चौ. फुट</label>
                        <input
                            type="number"
                            name="landAreaFeet"
                            className="form-control"
                            value={formData.landAreaFeet || ""}
                            readOnly
                        />
                    </Col>

                    <Col md={4}>
                        <label className="form-label">चौ. मीटर</label>
                        <input
                            type="number"
                            name="landAreaMeter"
                            className="form-control"
                            value={formData.landAreaMeter || ""}
                            readOnly
                        />
                    </Col>


                    <Col md={4}>
                        <label className="form-label">इमारतीचे चर्तुसिमा</label>
                        <input type="text" name="squareFoot" className="form-control" />
                    </Col>
                    <Col md={2}>
                        <label className="form-label">पूर्व</label>
                        <input type="text" name="eastSide" className="form-control" />
                    </Col>
                    <Col md={2}>
                        <label className="form-label">पश्चिम</label>
                        <input type="text" name="westSide" className="form-control" />
                    </Col>
                    <Col md={2}>
                        <label className="form-label">उत्तर</label>
                        <input type="text" name="northSide" className="form-control" />
                    </Col>
                    <Col md={2}>
                        <label className="form-label">दक्षिण</label>
                        <input type="text" name="southSide" className="form-control" />
                    </Col>
                </Row>
            </div>
            <hr />

            {/* इमारत प्रकारानुसार दर */}
            <div className="mt-5">
                <h5>इमारत प्रकारानुसार दर</h5>
                <BuildingDescriptionTable
                    rows={buildingDescriptions}
                    setRows={setBuildingDescriptions}
                />

            </div>
            <hr />

            {/* इमारत वापर तपशील */}
            <div className="mt-5">
                <h5>इमारत वापर तपशील</h5>
                <BuildingTypeTable
                    rows={buildingTypes}
                    setRows={setBuildingTypes}
                />

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
                            <option value="0" defaultValue="selected">नाही</option>
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
                            <option value="">-- निवडा --</option>
                            {govtSchemeList.map((scheme, index) => (
                                <option key={scheme.id || index} value={scheme.schemeName}>
                                    {scheme.schemeName}
                                </option>
                            ))}
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
            <Button className="mt-3" type="submit">नवीन जोडा</Button>
        </form >

    );


}