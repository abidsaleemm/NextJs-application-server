import React from "react";
import SearchInput from "../../components/SearchInput";

export default ({
  filter: {
    sample = false,
    patientName,
    patientBirthDate,
    studyName,
    location
  } = {},
  toggleFilterSettings = () => {},
  setProjectsSettings = () => {}
}) => ({
  patientName: (
    <SearchInput
      type="text"
      name={`filter-patientName`}
      value={patientName}
      onClear={() =>
        setProjectsSettings({ filter: { patientName: "" } })
      }
      onChange={({ target: { value } = {} }) =>
        setProjectsSettings({ filter: { patientName: value } })
      }
    />
  ),
  patientBirthDate: (
    <SearchInput
      type="text"
      name={`filter-patientBirthDate`}
      value={patientBirthDate}
      onClear={() =>
        setProjectsSettings({ filter: { patientBirthDate: "" } })
      }
      onChange={({ target: { value } = {} }) =>
        setProjectsSettings({ filter: { patientBirthDate: value } })
      }
    />
  ),
  studyName: (
    <SearchInput
      type="text"
      name={`filter-studyName`}
      value={studyName}
      onClear={() =>
        setProjectsSettings({ filter: { studyName: "" } })
      }
      onChange={({ target: { value } = {} }) =>
        setProjectsSettings({ filter: { studyName: value } })
      }
    />
  ),
  location: (
    <SearchInput
      type="text"
      name={`filter-location`}
      value={location}
      onClear={() =>
        setProjectsSettings({ filter: { location: "" } })
      }
      onChange={({ target: { value } = {} }) =>
        setProjectsSettings({ filter: { location: value } })
      }
    />
  ),
  sampleRender: (
    <div
      style={{
        display: "flex",
        justifyContent: "center"
      }}
    >
      <input
        type="checkbox"
        onChange={({ target: { value } }) => {
          toggleFilterSettings("sample");
        }}
        checked={sample}
        style={{
          alignSelf: "center",
          width: "25px",
          height: "25px"
        }}
      />
    </div>
  )
});
