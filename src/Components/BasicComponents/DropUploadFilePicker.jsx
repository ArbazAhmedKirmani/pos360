import { PlusOutlined } from "@ant-design/icons";
import { Col } from "antd";
import { useState } from "react";
import useBase64 from "../../Hooks/useBase64";

const DropUploadFilePicker = (props) => {
  let { span } = props;

  const [base64, setBase64] = useBase64();
  const [data, setData] = useState({
    previewVisible: false,
    previewTitle: "",
    fileList: [],
  });

  const handleCancel = () => setData({ ...data, previewVisible: false });

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await setBase64(file.originFileObj);
    }

    setData({
      ...data,
      previewImage: file.url || file.preview,
      previewVisible: true,
      previewTitle:
        file.name || file.url.substring(file.url.lastIndexOf("/") + 1),
    });
  };

  const handleChange = async (file) => {
    console.log(file);
    setData({ ...data, fileList: file.target.files });
    await setBase64(file.target.files[0]);
  };

  const { fileList } = data;
  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Company Logo</div>
    </div>
  );

  // opening file picker on button click
  const openDialog = () => {
    document.querySelector("#fileInput").click();
  };

  return (
    <Col
      xl={span}
      md={span + span * 0.75}
      sm={span * 2}
      xs={span * 2}
      className="input"
    >
      <input
        id="fileInput"
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        onChange={handleChange}
      />
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          flexDirection: "column",
          justifyContent: "center",
          width: 90,
          height: 90,
          margin: "0 5px",
          padding: 5,
          background: "#dee4e9",
        }}
      >
        {fileList.length >= 1 ? (
          <img
            src={base64}
            style={{
              height: "100%",
              width: "100%",
              objectFit: "contain",
              overflow: "hidden",
            }}
          />
        ) : (
          // </div>
          <button
            onClick={openDialog}
            type="button"
            style={{
              border: "1px dashed gray",
              padding: 6,
              cursor: "pointer",
            }}
          >
            <PlusOutlined />
            Company Logo
          </button>
        )}
      </div>
    </Col>
  );
};

export default DropUploadFilePicker;
