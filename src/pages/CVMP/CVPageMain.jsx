import React, { useState, useRef } from "react";
import styled, { keyframes } from "styled-components";
import { useNavigate } from "react-router-dom";
import "./CVPageMain.css";

const Container = styled.div`
  position: fixed;
  top: 57%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 1250px;
  height: 600px;
  background-color: #fff;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0.2, 0, 0, 0.5);
  border-top-left-radius: 35px;
  border-top-right-radius: 35px;
  display: grid;
  grid-template-columns: repeat(5, 1fr); /* 4 columns */
  grid-auto-rows: minmax(
    80px,
    auto
  ); /* Auto rows with a minimum of 100px height */
  gap: 10px; /* Adjust the size of the gap between grid items */
  justify-content: space-around;
  align-items: center;
`;

const bounce = keyframes`
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-30px);
  }
  60% {
    transform: translateY(-15px);
  }
`;
const BouncingImage = styled.img`
  animation: ${bounce} 2s 1;
`;

const Input = styled.input`
  width: 170px;
  height: 50px;
  margin-bottom: 15px;
  padding: 10px;
  box-sizing: border-box;
  border: 1px solid #ccc;
  border-radius: 40px;
`;
const ImageUploadContainer = styled.div`
  width: 150px;
  height: 200px;
  margin-bottom: 15px;
  border-radius: 8px;
  overflow: hidden;
  position: relative;
  background-color: white;
  border: 1.4px solid #333;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ImagePreview = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 8px;
  display: block;
`;

const InputFile = styled.input`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
`;

const UploadText = styled.div`
  color: black;
  text-align: center;
  z-index: 1;
`;

const SubmitButton = styled.button`
  background-color: #2e7eed;
  color: white;
  border: none;
  padding: 12px;
  width: 240px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.6s ease;

  &:hover {
    background-color: #4fa3ff;
    color: #white;
  }
`;
const slideIn = keyframes`
from {
  transform: translateX(170%);
}
to {
  transform: translateX(0);
}
`;
const Button = styled.button`
  padding: 10px;
  background-color: transparent;
  border: none;
  border-bottom: 2px solid ${(props) => (props.active ? '#fff' : '#333')};
  cursor: pointer;
  font-size: 17px;
  margin-top: 55px;
  color: white;
  animation: ${slideIn} 0.5s ease;
  transition: border-bottom 0.3s ease, color 0.3s ease;
  &:hover {
    border-bottom: 2.5px solid white;
  }
  &:focus {
    outline: none; 
    color: #B3B3B3 ;
  }

  ${(props) => props.active && `color: #B3B3B3e;`}
`;

const CVPageMain = () => {
  const navigate = useNavigate();
  const [image, setImage] = useState(null);
  const fileInputRef = useRef(null);
  //----------------
  const [activeButton, setActiveButton] = useState(null);

  const handleButtonClick = (index) => {
    setActiveButton(index);
  };
  //-----------------------
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);

      fileInputRef.current.value = "";
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
  };
  const [activeCategory, setActiveCategory] = useState(null);

  const handleCategoryClick = (category) => {
    setActiveCategory(category);
  };

  const renderInputs = () => {
    switch (activeCategory) {
      case "personalInfo":
        return (
          <>
            <ImageUploadContainer className="Image">
              {image ? (
                <ImagePreview src={image} alt="User" />
              ) : (
                <>
                  <UploadText>Upload Image</UploadText>
                </>
              )}
              <InputFile
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
              />
            </ImageUploadContainer>
            <Input className={"NameInput"} type="text" placeholder="Ad" />
            <Input className={"SurNameInput"} type="text" placeholder="Soyad" />
            <Input className={"EmailInput"} type="email" placeholder="Email" />
            <Input className={"TelInput"} type="tel" placeholder="Telefon" />
            <Input className={"AdressInput"} type="text" placeholder="Adres" />
            <Input className={"CitizenShip"} type="text" placeholder="Ölkə" />
            <Input
              className={"LinePhone"}
              type="text"
              placeholder="Şəhər telefonu"
            />
            <Input
              className={"Military"}
              type="text"
              placeholder="Əsgərlik statusu"
            />
            <Input
              className={"DriverLicense"}
              type="text"
              placeholder="Sürücülük vəsiqəsi"
            />
            <Input className={"City"} type="text" placeholder="Şəhər" />
            <Input
              className={"About Me"}
              type="text"
              placeholder="Mənim hakqımda"
            />
            <Input className={"Linkedin"} type="text" placeholder="Linkedin" />
            <select className={"Gender"} id="gender" name="gender">
              <option value="">Cins</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="non-binary">Non-Binary</option>
            </select>
            <select
              className={"mariageStatus"}
              id="mariageStatus"
              name="mariegeStatus"
            >
              <option value="">Ailə vəziyyəti</option>
              <option value="married">Evli</option>
              <option value="single">Subay</option>
              <option value="widow">Dul</option>
              <option value="divorced">Boşanmış</option>
            </select>
          </>
        );
      case "Education":
        return (
          <>
            <Input
              className="institutionName"
              type="text"
              placeholder="İnstitut adı"
            />
            <Input
              className="facultyName"
              type="text"
              placeholder="Fakültə adı"
            />
            <Input
              className="specialization"
              type="text"
              placeholder="İxtisas"
            />
            <Input
              className="educationLevel"
              type="text"
              placeholder="Təhsil səviyyəsi"
            />
            <Input
              className="educationForm"
              type="text"
              placeholder="Təhsil forması"
            />
            <Input
              className="educationStatus"
              type="text"
              placeholder="Təhsil vəziyyəti"
            />
            <Input
              className="educationStartDate"
              type="text"
              placeholder="Təhsilin başlama tarixi"
            />
            <Input
              className="educationEndDate"
              type="text"
              placeholder="Təhsilin bitmə tarixi"
            />
            <Input
              className="graduationWork"
              type="text"
              placeholder="Diplom işi"
            />
            <Input
              className="graduationWorkTheme"
              type="text"
              placeholder="Diplom işinin mövzusu"
            />
            <Input
              className="graduationWorkDescription"
              type="text"
              placeholder="Diplom işinin təsviri"
            />
            <Input
              className="additionalInformation"
              type="text"
              placeholder="Əlavə məlumat"
            />
          </>
        );
      case "Language":
        return (
          <>
            <Input className="languageName" type="text" placeholder="Dil adı" />
            <Input
              className="languageLevel"
              type="text"
              placeholder="Dil səviyyəti"
            />
            <Input
              className="languageCertificateId"
              type="text"
              placeholder="Dil sertifikatının ID-si"
            />
            <Input
              className="computerKnowledgeName"
              type="text"
              placeholder="Komputer bacarığı adı"
            />
            <Input
              className="computerKnowledgeLevel"
              type="text"
              placeholder="Komputer bacarığı səviyyəti"
            />
            <Input
              className="computerKnowledgeCertificateId"
              type="text"
              placeholder="Komputer bacarığı sertifikatının ID-si"
            />
          </>
        );
      case "workExperience":
        return (
          <>
            <Input
              className="companyName"
              type="text"
              placeholder="Şirkət adı"
            />
            <Input
              className="typeOfBusiness"
              type="text"
              placeholder="Biznesin növü"
            />
            <Input className="jobTitle" type="text" placeholder="Vəzifə adı" />
            <Input
              className="typeOfPosition"
              type="text"
              placeholder="Vəzifənin növü"
            />
            <Input
              className="courseOfAction"
              type="text"
              placeholder="Tədbirin növü"
            />
            <Input
              className="keyJobResponsibilities"
              type="text"
              placeholder="Əsas vəzifə və cavabdehliklər"
            />
            <Input
              className="startDate"
              type="text"
              placeholder="Başlama tarixi"
            />
            <Input className="endDate" type="text" placeholder="Bitmə tarixi" />
            <Input
              className="reasonForSeparation"
              type="text"
              placeholder="Ayrılma səbəbi"
            />
            <Input
              className="recommendationSurname"
              type="text"
              placeholder="Tövsiyə verənın soyadı"
            />
            <Input
              className="recommendationPosition"
              type="text"
              placeholder="Tövsiyə verənın vəzifəsi"
            />
            <Input
              className="recommendationPhone"
              type="text"
              placeholder="Tövsiyə verənın telefonu"
            />
            <Input
              className="recommendationEmail"
              type="text"
              placeholder="Tövsiyə verənın emaili"
            />
            <Input
              className="additionalInformation"
              type="text"
              placeholder="Əlavə məlumat"
            />
          </>
        );

      case "Finish":
        return (
          <>
            <SubmitButton className="SubmitButton" onClick={handleFormSubmit}>
              Yarat
            </SubmitButton>
          </>
        );
      default:
        return (
          <>
            <div className="typewriter">
              <h1>Avaz ilə CV yarat</h1>
            </div>
          </>
        );
    }
  };
  return (
    <>
      <div className="buttonDiv">
        <BouncingImage
          className="DefaultImage2"
          src={"./assets/img/Avaz-Logo.png"}
          alt="Default"
        />
        <Button
          onClick={() => {
            handleCategoryClick("personalInfo");
            handleButtonClick(0);
          }}
          active={activeButton === 0}
        >
          Şəxsi Məlumatlar
        </Button>
        <Button
          onClick={() => {
            handleCategoryClick("Education");
            handleButtonClick(1);
          }}
          active={activeButton === 1}
        >
          Təhsil
        </Button>
        <Button
          onClick={() => {
            handleCategoryClick("Language");
            handleButtonClick(2);
          }}
          active={activeButton === 2}
        >
          Komputer/Dil Bilikləri
        </Button>
        <Button
          onClick={() => {
            handleCategoryClick("workExperience");
            handleButtonClick(3);
          }}
          active={activeButton === 3}
        >
          İş Təcrübəsi
        </Button>
        <Button
          onClick={() => {
            handleCategoryClick("Finish");
            handleButtonClick(4);
          }}
          active={activeButton === 4}
        >
          Təstiqləmək
        </Button>
        <Container>{renderInputs()}</Container>
      </div>
    </>
  );
};

export default CVPageMain;
