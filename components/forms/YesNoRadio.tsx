"use client";
import { FormCheck } from "react-bootstrap";

export default function YesNoRadio({ label, name, value, onChange }: any) {
  return (
    <div className="mb-3">
      <label className="fw-semibold me-3">{label}</label>
      <FormCheck
        inline
        label="होय"
        type="radio"
        name={name}
        checked={value === true}
        onChange={() => onChange(true)}
      />
      <FormCheck
        inline
        label="नाही"
        type="radio"
        name={name}
        checked={value === false}
        onChange={() => onChange(false)}
      />
    </div>
  );
}
