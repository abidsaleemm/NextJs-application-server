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
    patientName,
    patientBirthDate,
    studyName,
    location,
    studyDate,
    uploadDateTime,
    projectType = "All",
    priority
  } = {},
  setProjectsSettings = () => {}
}) => ({
  priorityRender: (
    <div className="rootPriority">
      <style jsx>
        {`
          .rootPriority {
            display: flex;
            justify-content: center;
            align-items: center;
          }

          input[type="checkbox"] {
            margin: 10px;
            transform: scale(2);
          }
        `}
      </style>
      <input
        type="checkbox"
        checked={priority}
        onChange={() => {
          setProjectsSettings({ filter: { priority: !priority } });
        }}
      />
    </div>
  ),
  projectTypeRender: (
    <UncontrolledDropdown>
      <DropdownToggle caret>{projectType}</DropdownToggle>
      <DropdownMenu>
        <DropdownItem
          onClick={() =>
            setProjectsSettings({ filter: { projectType: "All" } })
          }
        >
          All
        </DropdownItem>
        {role === "admin" ? (
          <DropdownItem
            onClick={() =>
              setProjectsSettings({ filter: { projectType: "Not Removed" } })
            }
          >
            Not Removed
          </DropdownItem>
        ) : null}
        <DropdownItem divider />
        <DropdownItem
          onClick={() =>
            setProjectsSettings({ filter: { projectType: "Live" } })
          }
        >
          Live
        </DropdownItem>
        <DropdownItem
          onClick={() =>
            setProjectsSettings({ filter: { projectType: "Sample" } })
          }
        >
          Sample
        </DropdownItem>
        <DropdownItem
          onClick={() =>
            setProjectsSettings({ filter: { projectType: "Training" } })
          }
        >
          Training
        </DropdownItem>

        {role === "admin" ? (
          <div>
            <DropdownItem
              onClick={() =>
                setProjectsSettings({ filter: { projectType: "Default" } })
              }
            >
              Default
            </DropdownItem>
            <DropdownItem
              onClick={() =>
                setProjectsSettings({ filter: { projectType: "Removed" } })
              }
            >
              Removed
            </DropdownItem>
          </div>
        ) : null}
      </DropdownMenu>
    </UncontrolledDropdown>
  ),
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
          style={{ background: "red" }}
          onClick={() =>
            setProjectsSettings({
              filter: { status: "Error" }
            })
          }
        >
          Error
        </DropdownItem>
        <DropdownItem
          style={{ background: "red" }}
          onClick={() =>
            setProjectsSettings({
              filter: { status: "Error - No Injury" }
            })
          }
        >
          Error - No Injury
        </DropdownItem>
        <DropdownItem
          style={{ background: "red" }}
          onClick={() =>
            setProjectsSettings({
              filter: { status: "Error - Alignment" }
            })
          }
        >
          Error - Alignment
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
