import React from "react";
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";

import SearchInput from "../../components/SearchInput";

export default ({
  user: { role = "" } = {},
  filter: {
    status = "All",
    sample = false,
    patientName,
    patientBirthDate,
    studyName,
    location,
    studyDate,
    uploadDateTime
  } = {},
  toggleFilterSettings = () => {},
  setProjectsSettings = () => {}
}) => ({
  statusRender: (
    <UncontrolledDropdown>
      <DropdownToggle caret>{status}</DropdownToggle>
      <DropdownMenu>
        <DropdownItem
          onClick={() => setProjectsSettings({ filter: { status: "All" } })}
        >
          All
        </DropdownItem>
        {role === "admin" ? (
          <DropdownItem
            onClick={() =>
              setProjectsSettings({
                filter: { status: "Not Delivered" }
              })
            }
          >
            Not Delivered/Archived
          </DropdownItem>
        ) : null}
        <DropdownItem divider />

        {role === "admin" ? (
          <DropdownItem
            onClick={() => setProjectsSettings({ filter: { status: "None" } })}
          >
            None
          </DropdownItem>
        ) : null}
        <DropdownItem
          onClick={() => setProjectsSettings({ filter: { status: "Start" } })}
        >
          Start
        </DropdownItem>
        <DropdownItem
          onClick={() =>
            setProjectsSettings({
              filter: { status: "Segmentation" }
            })
          }
        >
          Segmentation
        </DropdownItem>
        <DropdownItem
          onClick={() => setProjectsSettings({ filter: { status: "QC" } })}
        >
          QC
        </DropdownItem>
        <DropdownItem
          onClick={() => setProjectsSettings({ filter: { status: "Review" } })}
        >
          Review
        </DropdownItem>
        <DropdownItem
          onClick={() => setProjectsSettings({ filter: { status: "Done" } })}
        >
          Done
        </DropdownItem>
        {role === "admin" ? (
          <div>
            <DropdownItem
              onClick={() =>
                setProjectsSettings({ filter: { status: "Rendered" } })
              }
            >
              Rendered
            </DropdownItem>
            <DropdownItem
              onClick={() =>
                setProjectsSettings({ filter: { status: "Delivered" } })
              }
            >
              Delivered
            </DropdownItem>
            <DropdownItem
              onClick={() =>
                setProjectsSettings({ filter: { status: "Archived" } })
              }
            >
              Archived
            </DropdownItem>
          </div>
        ) : null}
      </DropdownMenu>
    </UncontrolledDropdown>
  ),
  patientName: (
    <SearchInput
      type="text"
      name={`filter-patientName`}
      value={patientName}
      onClear={() => setProjectsSettings({ filter: { patientName: "" } })}
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
      onClear={() => setProjectsSettings({ filter: { patientBirthDate: "" } })}
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
      onClear={() => setProjectsSettings({ filter: { studyName: "" } })}
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
      onClear={() => setProjectsSettings({ filter: { location: "" } })}
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
  ),
  uploadDateTime: (
    <SearchInput
      type="text"
      name={`filter-uploadDateTime`}
      value={uploadDateTime}
      onClear={() => setProjectsSettings({ filter: { uploadDateTime: "" } })}
      onChange={({ target: { value } = {} }) =>
        setProjectsSettings({ filter: { uploadDateTime: value } })
      }
    />
  ),
  studyDate: (
    <SearchInput
      type="text"
      name={`filter-studyDate`}
      value={studyDate}
      onClear={() => setProjectsSettings({ filter: { studyDate: "" } })}
      onChange={({ target: { value } = {} }) =>
        setProjectsSettings({ filter: { studyDate: value } })
      }
    />
  )
});
