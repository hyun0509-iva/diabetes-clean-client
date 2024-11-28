import { useState } from "react";
import { FaPhoneAlt, FaMapMarkerAlt, FaGlobe } from "react-icons/fa";
import { palette } from "libs/palette";
import { HospList } from "./styles";

const HospitalList = ({ data }: any) => {
  console.log(data);
  const [selectedItem, setSelectedItem] = useState(null);
  return (
    <HospList style={{ flex: 3 }}>
      <h2>병원 정보 조회</h2>
      <div className="hosp_menu">
        {data &&
          data.map((d: any, idx: any) => (
            <div
              className={`hosp_menu_item ${
                selectedItem === idx ? "selected" : ""
              }`}
              key={idx}
              onClick={() => setSelectedItem(idx)}
            >
              <a>
                <div className="hosp_name">{d.yadmNm}</div>
                <div className="detail_info">
                  <div>
                    <span>
                      <FaPhoneAlt color={palette.gray[3]} size="11" />
                    </span>
                    <span style={{ marginLeft: "10px" }}>{d.telno}</span>
                  </div>
                  <div>
                    <span>
                      <FaMapMarkerAlt color={palette.gray[3]} size="11" />
                    </span>
                    <span style={{ marginLeft: "10px" }}>{d.addr}</span>
                  </div>
                  <div>
                    <span>
                      <FaGlobe color={palette.gray[3]} size="11" />
                    </span>
                    <span
                      style={{ marginLeft: "10px", cursor: "pointer" }}
                      onClick={() => window.open(d.hospUrl)}
                    >
                      {d.hospUrl}
                    </span>
                  </div>
                </div>
              </a>
            </div>
          ))}
      </div>
    </HospList>
  );
};

export default HospitalList;
